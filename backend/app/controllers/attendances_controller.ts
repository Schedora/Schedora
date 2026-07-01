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
   * GET /businesses/:businessId/attendance
   * Returns the full team attendance grid for a business
   * Shows which staff are present or absent for each day of the week
   * Used on the Staff Attendance Grid page in the owner dashboard
   */
  async index({ params, request, response, auth }: HttpContext) {
    // Get the logged in owner
    const owner = await auth.authenticate()

    // Find the business or return 404
    const business = await Business.findOrFail(params.businessId)

    // Make sure this business belongs to the logged in owner
    if (business.ownerId !== owner.id) {
      return response.forbidden({
        message: 'You do not have permission to view attendance for this business',
      })
    }

    // Get the week filter from query string if provided
    // e.g. /businesses/1/attendance?week=2024-10-28
    const week = request.qs().week

    // Get all staff that belong to this business
    const staff = await Staff.query().where('business_id', business.id)

    // Get attendance records for all staff in this business
    // If a week filter was provided only return that week
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
   * GET /businesses/:businessId/attendance/score
   * Returns the team presence score for a business
   * Calculated as the percentage of available days submitted
   * vs the total possible working days across all staff
   * Shown as the Team Presence Score card on the dashboard
   */
  async score({ params, request, response, auth }: HttpContext) {
    // Get the logged in owner
    const owner = await auth.authenticate()

    // Find the business or return 404
    const business = await Business.findOrFail(params.businessId)

    // Check ownership
    if (business.ownerId !== owner.id) {
      return response.forbidden({
        message: 'You do not have permission to view this business attendance score',
      })
    }

    // Get the week to calculate score for
    // Defaults to current week if not provided
    const week = request.qs().week || new Date().toISOString().split('T')[0]

    // Get all staff for this business
    const staff = await Staff.query().where('business_id', business.id)
    const staffIds = staff.map((s) => s.id)
    const totalStaff = staff.length

    if (totalStaff === 0) {
      return response.ok({
        message: 'No staff found for this business',
        data: {
          score: 0,
          totalStaff: 0,
          staffSubmitted: 0,
          week,
        },
      })
    }

    // Count how many staff submitted attendance for this week
    const submitted = await Attendance.query()
      .whereIn('staff_id', staffIds)
      .where('week_start', '<=', week)
      .where('week_end', '>=', week)
      .count('* as total')

    const staffSubmitted = Number((submitted[0] as any).$extras.total)

    // Calculate the presence score as a percentage
    // e.g. if 9 out of 10 staff submitted = 90%
    const score = Math.round((staffSubmitted / totalStaff) * 100)

    return response.ok({
      message: 'Team presence score fetched successfully',
      data: {
        score,
        totalStaff,
        staffSubmitted,
        week,
        // Compare to previous week
        previousWeek: null, // can be implemented later
      },
    })
  }

  /**
   * GET /businesses/:businessId/attendance/summary
   * Returns a summary of attendance by department or staff member
   * Used on the weekly/monthly attendance view toggle
   * Owner can switch between Weekly and Monthly views
   */
  async summary({ params, request, response, auth }: HttpContext) {
    // Get the logged in owner
    const owner = await auth.authenticate()

    // Find the business or return 404
    const business = await Business.findOrFail(params.businessId)

    // Check ownership
    if (business.ownerId !== owner.id) {
      return response.forbidden({
        message: 'You do not have permission to view this attendance summary',
      })
    }

    // Get view type — weekly or monthly
    // e.g. /businesses/1/attendance/summary?view=weekly
    const view = request.qs().view || 'weekly'
    const week = request.qs().week

    // Get all staff for this business
    const staff = await Staff.query().where('business_id', business.id)
    const staffIds = staff.map((s) => s.id)

    // Get attendance records
    const query = Attendance.query()
      .whereIn('staff_id', staffIds)
      .preload('staff')
      .orderBy('week_start', 'asc')

    // Filter by week if provided
    if (week) {
      query.where('week_start', week)
    }

    const records = await query

    // Build the summary grid
    // Each entry shows staff name, days available, and working hours
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
