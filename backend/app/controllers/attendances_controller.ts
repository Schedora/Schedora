import type { HttpContext } from '@adonisjs/core/http'
import Attendance from '#models/attendance'
import Staff from '#models/staff'

/**
 * AttendancesController
 * Handles all API endpoints related to staff availability
 * Staff submit their weekly availability here
 * The booking engine uses this data to show customers only available slots
 */
export default class AttendancesController {
  /**
   * GET /staff/:staffId/availability
   * Returns the availability plan for a specific staff member
   * for a given week
   * Used by the booking engine to filter available slots
   */
  async index({ params, request, response }: HttpContext) {
    // Find the staff member or return 404
    const staff = await Staff.findOrFail(params.staffId)

    // Get the week_start date from the query string if provided
    // e.g. /staff/1/availability?week=2024-10-28
    const week = request.qs().week

    // Build the query
    const query = Attendance.query().where('staff_id', staff.id)

    // If a specific week was requested filter by it
    // Otherwise return all availability records for this staff member
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
   * POST /staff/:staffId/availability
   * Staff member submits their availability for an upcoming week
   * Must be submitted at least 7 days before the week starts
   * Only available slots will show to customers in the booking form
   */
  async store({ params, request, response, auth }: HttpContext) {
    // Get the currently logged in user
    const user = await auth.authenticate()

    // Find the staff record for this staff member
    const staff = await Staff.findOrFail(params.staffId)

    // Make sure the logged in user is the same person as the staff member
    // A staff member can only submit their own availability
    if (staff.userId !== user.id) {
      return response.forbidden({
        message: 'You can only submit availability for yourself',
      })
    }

    // Get the availability data from the request body
    const data = request.only([
      'week_start',
      'week_end',
      'available_days',
      'start_time',
      'end_time',
    ])

    // Check the 7-day rule — staff must submit at least 7 days in advance
    const weekStart = new Date(data.week_start)
    const today = new Date()
    const daysUntilWeek = Math.ceil((weekStart.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

    if (daysUntilWeek < 7) {
      return response.badRequest({
        message: 'Availability must be submitted at least 7 days before the week starts',
      })
    }

    // Check if availability already exists for this week
    // If it does we update it instead of creating a duplicate
    const existing = await Attendance.query()
      .where('staff_id', staff.id)
      .where('week_start', data.week_start)
      .first()

    if (existing) {
      // Update the existing record
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

    // Create a new availability record
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
   * PUT /staff/:staffId/availability/:id
   * Updates an existing availability record
   * Staff can update their availability any time before a slot is booked
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

    // Make sure this attendance record belongs to this staff member
    if (attendance.staffId !== staff.id) {
      return response.forbidden({
        message: 'This availability record does not belong to you',
      })
    }

    // Get the updated data
    const data = request.only(['available_days', 'start_time', 'end_time'])

    // Apply the updates
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
   * GET /businesses/:businessId/available-slots
   * Returns available booking slots for a business on a specific date
   * Used by the customer booking form to show available dates and times
   * Filters by service duration and staff availability
   */
  async availableSlots({ params, request, response }: HttpContext) {
    // Get the date and service duration from query string
    // e.g. /businesses/1/available-slots?date=2024-10-28&duration=60
    const date = request.qs().date
    const duration = parseInt(request.qs().duration || '30')

    if (!date) {
      return response.badRequest({
        message: 'Please provide a date to check available slots',
      })
    }

    // Get the day name from the date e.g. 'Monday'
    const dayName = new Date(date).toLocaleDateString('en-US', { weekday: 'long' })

    // Find all staff for this business who are available on this date
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
    // Each slot is start_time + duration minutes
    const slots: { time: string; staffId: number; staffName: string }[] = []

    for (const attendance of availableStaff) {
      // Parse start and end times
      const [startHour, startMin] = attendance.startTime.split(':').map(Number)
      const [endHour, endMin] = attendance.endTime.split(':').map(Number)

      const startMinutes = startHour * 60 + startMin
      const endMinutes = endHour * 60 + endMin

      // Generate slots every duration minutes
      for (let time = startMinutes; time + duration <= endMinutes; time += duration) {
        const hour = Math.floor(time / 60)
          .toString()
          .padStart(2, '0')
        const min = (time % 60).toString().padStart(2, '0')

        slots.push({
          time: `${hour}:${min}`,
          staffId: attendance.staff.id,
          staffName: attendance.staff.role,
        })
      }
    }

    return response.ok({
      message: 'Available slots fetched successfully',
      data: slots,
    })
  }
}
