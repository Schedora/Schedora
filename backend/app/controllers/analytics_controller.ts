import type { HttpContext } from '@adonisjs/core/http'
import Business from '#models/business'
import db from '@adonisjs/lucid/services/db'

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
    // We join bookings with services to get the price of each booking
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

    const totalRevenue = parseFloat(revenueResult.rows[0].total_revenue)

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

    const bookingsToday = parseInt(bookingsTodayResult.rows[0].total)

    // Total bookings all time — used to calculate capacity percentage
    const totalBookingsResult = await db.rawQuery(
      `
      SELECT COUNT(*) as total
      FROM bookings b
      JOIN branches br ON b.branch_id = br.id
      WHERE br.business_id = ?
    `,
      [params.businessId]
    )

    const totalBookings = parseInt(totalBookingsResult.rows[0].total)

    // Pending reviews — reviews that have not been responded to yet
    // For now we count all reviews as pending response
    const pendingReviewsResult = await db.rawQuery(
      `
      SELECT COUNT(*) as total
      FROM reviews
      WHERE business_id = ?
    `,
      [params.businessId]
    )

    const pendingReviews = parseInt(pendingReviewsResult.rows[0].total)

    // Average rating — average of all staff and business ratings combined
    const avgRatingResult = await db.rawQuery(
      `
      SELECT
        COALESCE(AVG((staff_rating + business_rating) / 2.0), 0) as avg_rating
      FROM reviews
      WHERE business_id = ?
    `,
      [params.businessId]
    )

    const avgRating = parseFloat(avgRatingResult.rows[0].avg_rating).toFixed(1)

    return response.ok({
      message: 'Overview analytics fetched successfully',
      data: {
        totalRevenue,
        bookingsToday,
        totalBookings,
        pendingReviews,
        avgRating: parseFloat(avgRating),
      },
    })
  }

  /**
   * GET /api/analytics/:businessId/revenue
   * Returns weekly or monthly revenue broken down by day
   * Shows Completed vs Pending split
   * Used for the Revenue Trends chart on the dashboard
   */
  async revenue({ params, request, response, auth }: HttpContext) {
    const owner = await auth.authenticate()
    const business = await this.verifyOwnership(params.businessId, owner.id)

    if (!business) {
      return response.forbidden({
        message: 'You do not have permission to view revenue for this business',
      })
    }

    // Get the view type — 7 days or 30 days
    const days = parseInt(request.qs().days || '7')

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
        AND b.date >= CURRENT_DATE - INTERVAL '${days} days'
      GROUP BY b.date
      ORDER BY b.date ASC
    `,
      [params.businessId]
    )

    // Total completed and pending for the period
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
        AND b.date >= CURRENT_DATE - INTERVAL '${days} days'
    `,
      [params.businessId]
    )

    return response.ok({
      message: 'Revenue analytics fetched successfully',
      data: {
        chart: revenueResult.rows,
        totals: {
          completed: parseFloat(totalsResult.rows[0].total_completed),
          pending: parseFloat(totalsResult.rows[0].total_pending),
          transactions: parseInt(totalsResult.rows[0].total_transactions),
        },
        days,
      },
    })
  }

  /**
   * GET /api/analytics/:businessId/revenue/transactions
   * Returns a paginated list of all transactions
   * Owner can filter by status — completed, pending, cancelled
   * Used on the Revenue page Recent Transactions table
   */
  async transactions({ params, request, response, auth }: HttpContext) {
    const owner = await auth.authenticate()
    const business = await this.verifyOwnership(params.businessId, owner.id)

    if (!business) {
      return response.forbidden({
        message: 'You do not have permission to view transactions for this business',
      })
    }

    // Get pagination and filter params
    const page = parseInt(request.qs().page || '1')
    const limit = parseInt(request.qs().limit || '10')
    const status = request.qs().status
    const offset = (page - 1) * limit

    // Build the where clause
    let whereClause = 'WHERE br.business_id = ?'
    const queryParams: any[] = [params.businessId]

    if (status) {
      whereClause += ' AND b.status = ?'
      queryParams.push(status)
    }

    // Get transactions with customer name and service details
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
      [...queryParams, limit, offset]
    )

    // Get total count for pagination
    const countResult = await db.rawQuery(
      `
      SELECT COUNT(*) as total
      FROM bookings b
      JOIN branches br ON b.branch_id = br.id
      ${whereClause}
    `,
      queryParams
    )

    const total = parseInt(countResult.rows[0].total)
    const totalPages = Math.ceil(total / limit)

    return response.ok({
      message: 'Transactions fetched successfully',
      data: {
        transactions: transactions.rows,
        pagination: {
          page,
          limit,
          total,
          totalPages,
        },
      },
    })
  }

  /**
   * GET /api/analytics/:businessId/revenue/trends
   * Returns daily revenue with trend direction (up or down)
   * Used in the Recent Performance Data table on the Trends page
   */
  async trends({ params, request, response, auth }: HttpContext) {
    const owner = await auth.authenticate()
    const business = await this.verifyOwnership(params.businessId, owner.id)

    if (!business) {
      return response.forbidden({
        message: 'You do not have permission to view trends for this business',
      })
    }

    const days = parseInt(request.qs().days || '30')

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
        AND b.date >= CURRENT_DATE - INTERVAL '${days} days'
      GROUP BY b.date
      ORDER BY b.date DESC
    `,
      [params.businessId]
    )

    // Calculate trend direction for each day
    // Compare each day's revenue to the previous day
    const rows = trendsResult.rows
    const trendsWithDirection = rows.map((row: any, index: number) => {
      const prevRow = rows[index + 1]
      let trendPercent = 0
      let trendDirection = 'neutral'

      if (prevRow) {
        const current = parseFloat(row.completed_revenue)
        const previous = parseFloat(prevRow.completed_revenue)

        if (previous > 0) {
          trendPercent = ((current - previous) / previous) * 100
          trendDirection = trendPercent >= 0 ? 'up' : 'down'
        }
      }

      return {
        date: row.date,
        completedRevenue: parseFloat(row.completed_revenue),
        pendingRevenue: parseFloat(row.pending_revenue),
        bookingCount: parseInt(row.booking_count),
        trendPercent: parseFloat(trendPercent.toFixed(1)),
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
   * Used in the Revenue by Service panel on the Trends page
   */
  async revenueByService({ params, request, response, auth }: HttpContext) {
    const owner = await auth.authenticate()
    const business = await this.verifyOwnership(params.businessId, owner.id)

    if (!business) {
      return response.forbidden({
        message: 'You do not have permission to view this data',
      })
    }

    const days = parseInt(request.qs().days || '30')

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
        AND b.date >= CURRENT_DATE - INTERVAL '${days} days'
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
   * Used in the Staff Performance panel on the owner dashboard
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
        completedCount: parseInt(row.completed_count),
        pendingCount: parseInt(row.pending_count),
        totalBookings: parseInt(row.total_bookings),
        avgRating: parseFloat(parseFloat(row.avg_rating).toFixed(1)),
        reviewCount: parseInt(row.review_count),
      })),
    })
  }

  /**
   * Used in the Revenue Distribution panel on the owner dashboard
   * e.g. Direct Consultations $12,240 · Subscription Packs $8,400
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
        totalRevenue: parseFloat(row.total_revenue),
        bookingCount: parseInt(row.booking_count),
      })),
    })
  }
}
