import type { HttpContext } from '@adonisjs/core/http'
import Attendance from '#models/attendance'
import Staff from '#models/staff'
import { createAvailabilityValidator, updateAvailabilityValidator } from '#validators/availability'

/**
 * AvailabilityController
 * Handles all staff availability endpoints
 * Staff members use this to submit and manage their weekly availability
 * The booking engine uses this data to show customers only real available slots
 */
export default class AvailabilityController {
  /**
   * GET /api/staff/:staffId/availability
   * Returns the availability plan for a specific staff member
   * Can be filtered by week using query string
   * e.g. /api/staff/1/availability?week=2024-10-28
   */
  async index({ params, request, response }: HttpContext) {
    // Find the staff member or return 404
    const staff = await Staff.findOrFail(params.staffId)

    // Get the week filter from query string if provided
    const week = request.qs().week

    // Build the query
    const query = Attendance.query().where('staff_id', staff.id)

    // Filter by week if provided
    if (week) {
      query.where('week_start', week)
    }

    const availability = await query.orderBy('week_start', 'desc')

    return response.ok({
      message: 'Availability fetched successfully',
      data: availability,
    })
  }

  /**
   * POST /api/staff/:staffId/availability
   * Staff member submits their availability for an upcoming week
   * Must be submitted at least 7 days before the week starts
   */
  async store({ params, request, response, auth }: HttpContext) {
    // Get the currently logged in user
    const user = await auth.authenticate()

    // Find the staff record
    const staff = await Staff.findOrFail(params.staffId)

    // Make sure the logged in user is submitting their own availability
    if (staff.userId !== user.id) {
      return response.forbidden({
        message: 'You can only submit availability for yourself',
      })
    }

    // Validate the request data before saving
    // Ensures week dates, available days and working hours are present and valid
    const data = await createAvailabilityValidator.validate(request.all())

    // Enforce the 7-day rule
    const weekStart = new Date(data.week_start)
    const today = new Date()
    const daysUntilWeek = Math.ceil((weekStart.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

    if (daysUntilWeek < 7) {
      return response.badRequest({
        message: 'Availability must be submitted at least 7 days before the week starts',
      })
    }

    // Check if availability already exists for this week
    const existing = await Attendance.query()
      .where('staff_id', staff.id)
      .where('week_start', data.week_start)
      .first()

    if (existing) {
      // Update existing record
      existing.merge({
        weekEnd: data.week_end,
        availableDays: data.available_days,
        startTime: data.start_time,
        endTime: data.end_time,
      })
      await existing.save()

      return response.ok({
        message: 'Availability updated successfully',
        data: existing,
      })
    }

    // Create new availability record
    const attendance = await Attendance.create({
      staffId: staff.id,
      weekStart: data.week_start,
      weekEnd: data.week_end,
      availableDays: data.available_days,
      startTime: data.start_time,
      endTime: data.end_time,
    })

    return response.created({
      message: 'Availability submitted successfully',
      data: attendance,
    })
  }

  /**
   * PUT /api/staff/:staffId/availability/:id
   * Updates an existing availability record
   * Staff can update before a slot is booked
   */
  async update({ params, request, response, auth }: HttpContext) {
    // Get the logged in user
    const user = await auth.authenticate()

    // Find the staff member
    const staff = await Staff.findOrFail(params.staffId)

    // Make sure it is their own availability
    if (staff.userId !== user.id) {
      return response.forbidden({
        message: 'You can only update your own availability',
      })
    }

    // Find the specific attendance record
    const attendance = await Attendance.findOrFail(params.id)

    // Make sure this record belongs to this staff member
    if (attendance.staffId !== staff.id) {
      return response.forbidden({
        message: 'This availability record does not belong to you',
      })
    }

    // Validate the update data — all fields are optional
    const data = await updateAvailabilityValidator.validate(request.all())

    // Apply updates
    attendance.merge({
      availableDays: data.available_days,
      startTime: data.start_time,
      endTime: data.end_time,
    })

    await attendance.save()

    return response.ok({
      message: 'Availability updated successfully',
      data: attendance,
    })
  }

  /**
   * GET /api/businesses/:businessId/available-slots
   * Returns available booking slots for a business on a specific date
   * Used by the customer booking form to show available dates and times
   */
  async availableSlots({ params, request, response }: HttpContext) {
    // Get date and duration from query string
    const date = request.qs().date
    const duration = parseInt(request.qs().duration || '30')

    if (!date) {
      return response.badRequest({
        message: 'Please provide a date to check available slots',
      })
    }

    // Get the day name from the date e.g. 'Monday'
    const dayName = new Date(date).toLocaleDateString('en-US', { weekday: 'long' })

    // Find all staff available on this date
    const availableStaff = await Attendance.query()
      .where('week_start', '<=', date)
      .where('week_end', '>=', date)
      .whereRaw(`? = ANY(available_days)`, [dayName])
      .preload('staff')

    if (availableStaff.length === 0) {
      return response.ok({
        message: 'No available slots for this date',
        data: [],
      })
    }

    // Build time slots based on staff availability
    const slots: { time: string; staffId: number; staffRole: string }[] = []

    for (const attendance of availableStaff) {
      const [startHour, startMin] = attendance.startTime.split(':').map(Number)
      const [endHour, endMin] = attendance.endTime.split(':').map(Number)

      const startMinutes = startHour * 60 + startMin
      const endMinutes = endHour * 60 + endMin

      for (let time = startMinutes; time + duration <= endMinutes; time += duration) {
        const hour = Math.floor(time / 60)
          .toString()
          .padStart(2, '0')
        const min = (time % 60).toString().padStart(2, '0')

        slots.push({
          time: `${hour}:${min}`,
          staffId: attendance.staff.id,
          staffRole: attendance.staff.role,
        })
      }
    }

    return response.ok({
      message: 'Available slots fetched successfully',
      data: slots,
    })
  }
}
