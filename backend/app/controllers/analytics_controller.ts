import type { HttpContext } from '@adonisjs/core/http'
import Business from '#models/business'
import db from '@adonisjs/lucid/services/db'
import {
  revenueValidator,
  transactionsValidator,
  trendsValidator,
  revenueByServiceValidator,
} from '#validators/analytics'

/**
 * AnalyticsController
 * Handles all analytics and reporting endpoints for the owner dashboard
 * Every endpoint requires the owner to be logged in and own the business
 * Data is pulled from bookings, reviews, staff and services tables
 */
export default class AnalyticsController {
  /**
   * Helper method to verify the owner owns the business
   * Used by every endpoint to avoid repeating the same check
   */
  private async verifyOwnership(businessId: number, userId: number) {
    const business = await Business.findOrFail(businessId)
    if (business.ownerId !== userId) {
      return null
    }
    return business
  }

  /**
   * GET /api/analytics/:businessId/overview
   * Returns the 4 summary cards shown at the top of the owner dashboard
   * Total Revenue, Bookings count with capacity, Pending Reviews, Avg Rating
   */
  async overview({ params, response, auth }: HttpContext) {
    const owner = await auth.authenticate()
    const business = await this.verifyOwnership(params.businessId, owner.id)

    if (!business) {
      return response.forbidden({
        message: 'You do not have permission to view analytics for this business',
      })
    }

    // Total revenue — sum of all completed bookings
    const revenueResult = await db.rawQuery(
      `
      SELECT COALESCE(SUM(s.price), 0) as total_revenue
      FROM bookings b
      JOIN services s ON b.service_id = s.id
      JOIN branches br ON b.branch_id = br.id
      WHERE br.business_id = ? AND b.status = 'completed'
    `,
      [params.businessId]
    )

    const totalRevenue = Number.parseFloat(revenueResult.rows[0].total_revenue)

    // Total bookings today
    const today = new Date().toISOString().split('T')[0]
    const bookingsTodayResult = await db.rawQuery(
      `
      SELECT COUNT(*) as total
      FROM bookings b
      JOIN branches br ON b.branch_id = br.id
      WHERE br.business_id = ? AND b.date = ?
    `,
      [params.businessId, today]
    )

    const bookingsToday = Number.parseInt(bookingsTodayResult.rows[0].total)

    // Total bookings all time
    const totalBookingsResult = await db.rawQuery(
      `
      SELECT COUNT(*) as total
      FROM bookings b
      JOIN branches br ON b.branch_id = br.id
      WHERE br.business_id = ?
    `,
      [params.businessId]
    )

    const totalBookings = Number.parseInt(totalBookingsResult.rows[0].total)

    // Pending reviews count
    const pendingReviewsResult = await db.rawQuery(
      `
      SELECT COUNT(*) as total
      FROM reviews
      WHERE business_id = ?
    `,
      [params.businessId]
    )

    const pendingReviews = Number.parseInt(pendingReviewsResult.rows[0].total)

    // Average rating
    const avgRatingResult = await db.rawQuery(
      `
      SELECT
        COALESCE(AVG((staff_rating + business_rating) / 2.0), 0) as avg_rating
      FROM reviews
      WHERE business_id = ?
    `,
      [params.businessId]
    )

    const avgRating = Number.parseFloat(avgRatingResult.rows[0].avg_rating).toFixed(1)

    return response.ok({
      message: 'Overview analytics fetched successfully',
      data: {
        totalRevenue,
        bookingsToday,
        totalBookings,
        pendingReviews,
        avgRating: Number.parseFloat(avgRating),
      },
    })
  }

  /**
   * GET /api/analytics/:businessId/revenue
   * Returns weekly or monthly revenue broken down by day
   * Shows Completed vs Pending split
   */
  async revenue({ params, request, response, auth }: HttpContext) {
    const owner = await auth.authenticate()
    const business = await this.verifyOwnership(params.businessId, owner.id)

    if (!business) {
      return response.forbidden({
        message: 'You do not have permission to view revenue for this business',
      })
    }

    // Validate query string parameters
    const { days } = await revenueValidator.validate(request.qs())
    const daysCount = days || 7

    const revenueResult = await db.rawQuery(
      `
      SELECT
        b.date,
        SUM(CASE WHEN b.status = 'completed' THEN s.price ELSE 0 END) as completed_revenue,
        SUM(CASE WHEN b.status IN ('pending', 'confirmed') THEN s.price ELSE 0 END) as pending_revenue,
        COUNT(*) as booking_count
      FROM bookings b
      JOIN services s ON b.service_id = s.id
      JOIN branches br ON b.branch_id = br.id
      WHERE br.business_id = ?
        AND b.date >= CURRENT_DATE - INTERVAL '${daysCount} days'
      GROUP BY b.date
      ORDER BY b.date ASC
    `,
      [params.businessId]
    )

    const totalsResult = await db.rawQuery(
      `
      SELECT
        COALESCE(SUM(CASE WHEN b.status = 'completed' THEN s.price ELSE 0 END), 0) as total_completed,
        COALESCE(SUM(CASE WHEN b.status IN ('pending', 'confirmed') THEN s.price ELSE 0 END), 0) as total_pending,
        COUNT(*) as total_transactions
      FROM bookings b
      JOIN services s ON b.service_id = s.id
      JOIN branches br ON b.branch_id = br.id
      WHERE br.business_id = ?
        AND b.date >= CURRENT_DATE - INTERVAL '${daysCount} days'
    `,
      [params.businessId]
    )

    return response.ok({
      message: 'Revenue analytics fetched successfully',
      data: {
        chart: revenueResult.rows,
        totals: {
          completed: Number.parseFloat(totalsResult.rows[0].total_completed),
          pending: Number.parseFloat(totalsResult.rows[0].total_pending),
          transactions: Number.parseInt(totalsResult.rows[0].total_transactions),
        },
        days: daysCount,
      },
    })
  }

  /**
   * GET /api/analytics/:businessId/revenue/transactions
   * Returns a paginated list of all transactions
   */
  async transactions({ params, request, response, auth }: HttpContext) {
    const owner = await auth.authenticate()
    const business = await this.verifyOwnership(params.businessId, owner.id)

    if (!business) {
      return response.forbidden({
        message: 'You do not have permission to view transactions for this business',
      })
    }

    // Validate query string parameters
    const { page, limit, status } = await transactionsValidator.validate(request.qs())
    const pageNum = page || 1
    const limitNum = limit || 10
    const offset = (pageNum - 1) * limitNum

    // Build the where clause
    let whereClause = 'WHERE br.business_id = ?'
    const queryParams: any[] = [params.businessId]

    if (status) {
      whereClause += ' AND b.status = ?'
      queryParams.push(status)
    }

    const transactions = await db.rawQuery(
      `
      SELECT
        b.id,
        b.reference_number,
        b.date,
        b.time,
        b.status,
        s.name as service_name,
        s.price as amount,
        u.full_name as customer_name
      FROM bookings b
      JOIN services s ON b.service_id = s.id
      JOIN branches br ON b.branch_id = br.id
      JOIN users u ON b.customer_id = u.id
      ${whereClause}
      ORDER BY b.date DESC, b.time DESC
      LIMIT ? OFFSET ?
    `,
      [...queryParams, limitNum, offset]
    )

    const countResult = await db.rawQuery(
      `
      SELECT COUNT(*) as total
      FROM bookings b
      JOIN branches br ON b.branch_id = br.id
      ${whereClause}
    `,
      queryParams
    )

    const total = Number.parseInt(countResult.rows[0].total)
    const totalPages = Math.ceil(total / limitNum)

    return response.ok({
      message: 'Transactions fetched successfully',
      data: {
        transactions: transactions.rows,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
          totalPages,
        },
      },
    })
  }

  /**
   * GET /api/analytics/:businessId/revenue/trends
   * Returns daily revenue with trend direction
   */
  async trends({ params, request, response, auth }: HttpContext) {
    const owner = await auth.authenticate()
    const business = await this.verifyOwnership(params.businessId, owner.id)

    if (!business) {
      return response.forbidden({
        message: 'You do not have permission to view trends for this business',
      })
    }

    // Validate query string parameters
    const { days } = await trendsValidator.validate(request.qs())
    const daysCount = days || 30

    const trendsResult = await db.rawQuery(
      `
      SELECT
        b.date,
        COALESCE(SUM(CASE WHEN b.status = 'completed' THEN s.price ELSE 0 END), 0) as completed_revenue,
        COALESCE(SUM(CASE WHEN b.status IN ('pending', 'confirmed') THEN s.price ELSE 0 END), 0) as pending_revenue,
        COUNT(*) as booking_count
      FROM bookings b
      JOIN services s ON b.service_id = s.id
      JOIN branches br ON b.branch_id = br.id
      WHERE br.business_id = ?
        AND b.date >= CURRENT_DATE - INTERVAL '${daysCount} days'
      GROUP BY b.date
      ORDER BY b.date DESC
    `,
      [params.businessId]
    )

    const rows = trendsResult.rows
    const trendsWithDirection = rows.map((row: any, index: number) => {
      const prevRow = rows[index + 1]
      let trendPercent = 0
      let trendDirection = 'neutral'

      if (prevRow) {
        const current = Number.parseFloat(row.completed_revenue)
        const previous = Number.parseFloat(prevRow.completed_revenue)

        if (previous > 0) {
          trendPercent = ((current - previous) / previous) * 100
          trendDirection = trendPercent >= 0 ? 'up' : 'down'
        }
      }

      return {
        date: row.date,
        completedRevenue: Number.parseFloat(row.completed_revenue),
        pendingRevenue: Number.parseFloat(row.pending_revenue),
        bookingCount: Number.parseInt(row.booking_count),
        trendPercent: Number.parseFloat(trendPercent.toFixed(1)),
        trendDirection,
      }
    })

    return response.ok({
      message: 'Revenue trends fetched successfully',
      data: trendsWithDirection,
    })
  }

  /**
   * GET /api/analytics/:businessId/revenue/by-service
   * Returns revenue broken down by service type
   */
  async revenueByService({ params, request, response, auth }: HttpContext) {
    const owner = await auth.authenticate()
    const business = await this.verifyOwnership(params.businessId, owner.id)

    if (!business) {
      return response.forbidden({
        message: 'You do not have permission to view this data',
      })
    }

    // Validate query string parameters
    const { days } = await revenueByServiceValidator.validate(request.qs())
    const daysCount = days || 30

    const result = await db.rawQuery(
      `
      SELECT
        s.name as service_name,
        s.category,
        COALESCE(SUM(s.price), 0) as total_revenue,
        COUNT(*) as booking_count
      FROM bookings b
      JOIN services s ON b.service_id = s.id
      JOIN branches br ON b.branch_id = br.id
      WHERE br.business_id = ?
        AND b.status = 'completed'
        AND b.date >= CURRENT_DATE - INTERVAL '${daysCount} days'
      GROUP BY s.id, s.name, s.category
      ORDER BY total_revenue DESC
    `,
      [params.businessId]
    )

    return response.ok({
      message: 'Revenue by service fetched successfully',
      data: result.rows,
    })
  }

  /**
   * GET /api/analytics/:businessId/staff/performance
   * Returns each staff member's ratings, completed and pending booking counts
   */
  async staffPerformance({ params, response, auth }: HttpContext) {
    const owner = await auth.authenticate()
    const business = await this.verifyOwnership(params.businessId, owner.id)

    if (!business) {
      return response.forbidden({
        message: 'You do not have permission to view staff performance for this business',
      })
    }

    const result = await db.rawQuery(
      `
      SELECT
        st.id as staff_id,
        st.role,
        u.full_name,
        COUNT(CASE WHEN b.status = 'completed' THEN 1 END) as completed_count,
        COUNT(CASE WHEN b.status IN ('pending', 'confirmed') THEN 1 END) as pending_count,
        COUNT(b.id) as total_bookings,
        COALESCE(AVG((r.staff_rating + r.business_rating) / 2.0), 0) as avg_rating,
        COUNT(r.id) as review_count
      FROM staff st
      JOIN users u ON st.user_id = u.id
      LEFT JOIN bookings b ON b.staff_id = st.id
      LEFT JOIN reviews r ON r.staff_id = st.id
      WHERE st.business_id = ?
      GROUP BY st.id, st.role, u.full_name
      ORDER BY completed_count DESC
    `,
      [params.businessId]
    )

    return response.ok({
      message: 'Staff performance fetched successfully',
      data: result.rows.map((row: any) => ({
        staffId: row.staff_id,
        name: row.full_name,
        role: row.role,
        completedCount: Number.parseInt(row.completed_count),
        pendingCount: Number.parseInt(row.pending_count),
        totalBookings: Number.parseInt(row.total_bookings),
        avgRating: Number.parseFloat(Number.parseFloat(row.avg_rating).toFixed(1)),
        reviewCount: Number.parseInt(row.review_count),
      })),
    })
  }

  /**
   * GET /api/analytics/:businessId/staff/distribution
   * Returns revenue distribution broken down by service category
   */
  async revenueDistribution({ params, response, auth }: HttpContext) {
    const owner = await auth.authenticate()
    const business = await this.verifyOwnership(params.businessId, owner.id)

    if (!business) {
      return response.forbidden({
        message: 'You do not have permission to view revenue distribution for this business',
      })
    }

    const result = await db.rawQuery(
      `
      SELECT
        s.category,
        COALESCE(SUM(s.price), 0) as total_revenue,
        COUNT(*) as booking_count
      FROM bookings b
      JOIN services s ON b.service_id = s.id
      JOIN branches br ON b.branch_id = br.id
      WHERE br.business_id = ?
        AND b.status = 'completed'
      GROUP BY s.category
      ORDER BY total_revenue DESC
    `,
      [params.businessId]
    )

    return response.ok({
      message: 'Revenue distribution fetched successfully',
      data: result.rows.map((row: any) => ({
        category: row.category,
        totalRevenue: Number.parseFloat(row.total_revenue),
        bookingCount: Number.parseInt(row.booking_count),
      })),
    })
  }
}
