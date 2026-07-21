import type { HttpContext } from '@adonisjs/core/http'
import Attendance from '#models/attendance'
import Staff from '#models/staff'
import Business from '#models/business'

/**
 * AttendancesController
 * Handles the owner-facing side of attendance management
 * Owners use this to monitor their full team's weekly presence
 * and track overall team attendance performance
 */
export default class AttendancesController {
  /**
   * Helper method to verify the owner owns the business
   */
  private async verifyOwnership(businessId: number, userId: number) {
    const business = await Business.findOrFail(businessId)
    if (business.ownerId !== userId) {
      return null
    }
    return business
  }

  /**
   * GET /api/businesses/:businessId/attendance
   * Returns the full team attendance grid for a business
   * Used on the Staff Attendance Grid page in the owner dashboard
   */
  async index({ params, request, response, auth }: HttpContext) {
    const owner = await auth.authenticate()
    const business = await this.verifyOwnership(params.businessId, owner.id)

    if (!business) {
      return response.forbidden({
        message: 'You do not have permission to view attendance for this business',
      })
    }

    const week = request.qs().week
    const staff = await Staff.query().where('business_id', business.id)
    const staffIds = staff.map((s) => s.id)

    const query = Attendance.query().whereIn('staff_id', staffIds)

    if (week) {
      query.where('week_start', week)
    }

    const attendance = await query.preload('staff').orderBy('week_start', 'desc')

    return response.ok({
      message: 'Team attendance fetched successfully',
      data: attendance,
    })
  }

  /**
   * GET /api/businesses/:businessId/attendance/score
   * Returns the team presence score for a business
   */
  async score({ params, request, response, auth }: HttpContext) {
    const owner = await auth.authenticate()
    const business = await this.verifyOwnership(params.businessId, owner.id)

    if (!business) {
      return response.forbidden({
        message: 'You do not have permission to view this business attendance score',
      })
    }

    const week = request.qs().week || new Date().toISOString().split('T')[0]
    const staff = await Staff.query().where('business_id', business.id)
    const staffIds = staff.map((s) => s.id)
    const totalStaff = staff.length

    if (totalStaff === 0) {
      return response.ok({
        message: 'No staff found for this business',
        data: { score: 0, totalStaff: 0, staffSubmitted: 0, week },
      })
    }

    const submitted = await Attendance.query()
      .whereIn('staff_id', staffIds)
      .where('week_start', '<=', week)
      .where('week_end', '>=', week)
      .count('* as total')

    const staffSubmitted = Number((submitted[0] as any).$extras.total)
    const score = Math.round((staffSubmitted / totalStaff) * 100)

    return response.ok({
      message: 'Team presence score fetched successfully',
      data: { score, totalStaff, staffSubmitted, week },
    })
  }

  /**
   * GET /api/businesses/:businessId/attendance/summary
   * Returns attendance summary — weekly or monthly view
   */
  async summary({ params, request, response, auth }: HttpContext) {
    const owner = await auth.authenticate()
    const business = await this.verifyOwnership(params.businessId, owner.id)

    if (!business) {
      return response.forbidden({
        message: 'You do not have permission to view this attendance summary',
      })
    }

    const view = request.qs().view || 'weekly'
    const week = request.qs().week

    const staff = await Staff.query().where('business_id', business.id)
    const staffIds = staff.map((s) => s.id)

    const query = Attendance.query()
      .whereIn('staff_id', staffIds)
      .preload('staff')
      .orderBy('week_start', 'asc')

    if (week) {
      query.where('week_start', week)
    }

    const records = await query

    const summary = records.map((record) => ({
      staffId: record.staffId,
      staffRole: record.staff.role,
      weekStart: record.weekStart,
      weekEnd: record.weekEnd,
      availableDays: record.availableDays,
      startTime: record.startTime,
      endTime: record.endTime,
      daysAvailable: record.availableDays.length,
      view,
    }))

    return response.ok({
      message: 'Attendance summary fetched successfully',
      data: summary,
    })
  }
}
