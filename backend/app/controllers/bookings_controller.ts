import { HttpContext } from '@adonisjs/core/http'
import Booking from '#models/booking'
import vine from '@vinejs/vine'
import string from '@adonisjs/core/helpers/string'
import { DateTime } from 'luxon'
import NotificationService from '#services/notification_services'
import Staff from '#models/staff'

/*
|--------------------------------------------------------------------------
| Validators
|--------------------------------------------------------------------------
*/
const createBookingValidator = vine.compile(
  vine.object({
    service_id: vine.number(),
    branch_id: vine.number(),
    staff_id: vine.number(),
    date: vine.string(),
    time: vine.string(),
    notes: vine.string().optional(),
  })
)

const updateBookingValidator = vine.compile(
  vine.object({
    service_id: vine.number().optional(),
    branch_id: vine.number().optional(),
    staff_id: vine.number().optional(),
    date: vine.string().optional(),
    time: vine.string().optional(),
    notes: vine.string().optional(),
  })
)

const walkInValidator = vine.compile(
  vine.object({
    staff_id: vine.number(),
    service_id: vine.number(),
    business_id: vine.number(),
    customer_name: vine.string().minLength(2),
    customer_phone: vine.string().optional(),
    date: vine.string(),
    time: vine.string(),
  })
)

export default class BookingController {
  /**
   * Create a new booking
   * POST /api/bookings
   */
  async store({ request, response, auth }: HttpContext) {
    const customer = auth.user!
    const data = await request.validateUsing(createBookingValidator)

    // Check if the slot is already taken
    const existingBooking = await Booking.query()
      .where('staff_id', data.staff_id)
      .where('date', data.date)
      .where('time', data.time)
      .whereNotIn('status', ['cancelled'])
      .first()

    if (existingBooking) {
      return response.conflict({
        message: 'This time slot is already booked. Please choose a different time.'
      })
    }

    // Generate unique reference number e.g. SCH-8821
    const referenceNumber = `SCH-${string.generateRandom(4).toUpperCase()}`

    const booking = await Booking.create({
      referenceNumber,
      customerId: customer.id,
      staffId: data.staff_id,
      serviceId: data.service_id,
      branchId: data.branch_id,
      date: DateTime.fromISO(data.date),
      time: data.time,
      status: 'pending',
      notes: data.notes,
    })

    const staff = await Staff.query()
      .where('id', data.staff_id)
      .preload('user')
      .firstOrFail()
    if (staff.userId) {
      await NotificationService.bookingCreated(
        staff.userId,
        auth.user!.fullName,
        data.date,
        data.time,
        booking.id
      )
    }

    return response.created({
      message: 'Booking created successfully',
      booking: {
        id: booking.id,
        reference_number: booking.referenceNumber,
        date: booking.date,
        time: booking.time,
        status: booking.status,
      },
    })  
  }

  /**
   * Get all bookings — for owner, filterable
   * GET /api/bookings
   */
  async index({ request, response }: HttpContext) {
    const { date, service_id, staff_id, status } = request.qs()

    const query = Booking.query()
      .preload('customer')
      .preload('staff')
      .preload('service')
      .preload('branch')

    if (date) query.where('date', date)
    if (service_id) query.where('service_id', service_id)
    if (staff_id) query.where('staff_id', staff_id)
    if (status) query.where('status', status)

    const bookings = await query.orderBy('date', 'desc')

    return response.ok({
      bookings: bookings.map((b) => ({
        id: b.id,
        reference_number: b.referenceNumber,
        customer_name: b.customer.fullName,
        staff_name: b.staff.user?.fullName,
        service_name: b.service.name,
        date: b.date,
        time: b.time,
        status: b.status,
      })),
    })
  }

  /**
   * Get all bookings for a customer
   * GET /api/bookings/customer/:id
   */
  async byCustomer({ params, response }: HttpContext) {
    const bookings = await Booking.query()
      .where('customer_id', params.id)
      .preload('staff')
      .preload('service')
      .preload('branch')
      .orderBy('date', 'desc')

    return response.ok({
      bookings: bookings.map((b) => ({
        id: b.id,
        reference_number: b.referenceNumber,
        staff_name: b.staff.user?.fullName,
        service_name: b.service.name,
        date: b.date,
        time: b.time,
        status: b.status,
      })),
    })
  }

  /**
   * Get all bookings for a staff member
   * GET /api/bookings/staff/:id
   */
  async byStaff({ params, response }: HttpContext) {
    const bookings = await Booking.query()
      .where('staff_id', params.id)
      .preload('customer')
      .preload('service')
      .preload('branch')
      .orderBy('date', 'desc')

    return response.ok({
      bookings: bookings.map((b) => ({
        id: b.id,
        reference_number: b.referenceNumber,
        customer_name: b.customer.fullName,
        service_name: b.service.name,
        date: b.date,
        time: b.time,
        status: b.status,
      })),
    })
  }

  /**
   * Edit booking
   * PUT /api/bookings/:id
   */
  async update({ params, request, response, auth }: HttpContext) {
    const booking = await Booking.findOrFail(params.id)
    const data = await request.validateUsing(updateBookingValidator)

    // If rescheduling — check new slot is available
    if (data.staff_id || data.date || data.time) {
      const newStaffId = data.staff_id ?? booking.staffId ?? 0
      const newDate = data.date ?? booking.date.toISODate() ?? ''
      const newTime = data.time || booking.time

      const existingBooking = await Booking.query()
        .where('staff_id', newStaffId)
        .where('date', newDate)
        .where('time', newTime)
        .whereNot('id', booking.id)
        .whereNotIn('status', ['cancelled', 'rescheduled'])
        .first()

      if (existingBooking) {
        return response.conflict({
          message: 'This time slot is already booked. Please choose a different time.'
        })
      }
    }

    //Track if this is actually a reschedule( date or time changed)
    const isReschedule = (data.date && data.date !== booking.date.toISODate()) ||
                          (data.time && data.time !== booking.time)

    booking.merge({
      serviceId: data.service_id,
      branchId: data.branch_id,
      staffId: data.staff_id,
      date: data.date ? DateTime.fromISO(data.date) : booking.date,
      time: data.time,
      notes: data.notes,
      status: isReschedule ? 'confirmed' : booking.status,
    })

    await booking.save()
  
    // Notify staff of reschedule
  if (isReschedule) {
  const staff = await Staff.query()
    .where('id', booking.staffId ?? 0)
    .preload('user')
    .first()
  if (staff && staff.userId) {
    await NotificationService.bookingRescheduled(
      staff.userId,
      auth.user!.fullName,
      data.date ?? booking.date.toISODate() ?? '',
      data.time ?? booking.time,
      booking.id
    )
  }  
}

    return response.ok({
      message: isReschedule ? 'Booking rescheduled successfully. Old slot has been released.' : 'Booking updated successfully',
      booking: {
        id: booking.id,
        reference_number: booking.referenceNumber,
        date: booking.date,
        time: booking.time,
        status: booking.status,
      },
    })
  }

  /**
   * Cancel booking
   * DELETE /api/bookings/:id
   */
  async destroy({ params, request, response, auth }: HttpContext) {
    const booking = await Booking.findOrFail(params.id)
    const { reason } = request.body()

    booking.status = 'cancelled'
    booking.cancelledAt = DateTime.now()
    booking.cancellationReason = reason || null
    await booking.save()

    // Notify staff of cancellation
    const staff = await Staff.query()
      .where('id', booking.staffId ?? 0)
      .preload('user')
      .first()
    
    if (staff && staff.userId) {  
      await NotificationService.bookingCancelled(
        staff.userId,
        auth.user!.fullName,
        booking.date.toISODate() ?? '',
        booking.time,
        booking.id
      )
    }  

    return response.ok({
      message: 'Booking cancelled successfully. The slot has been released.'
    })
  }

  /**
   * Mark booking as complete — staff only
   * PUT /api/bookings/:id/complete
   */
  async complete({ params, response }: HttpContext) {
    const booking = await Booking.findOrFail(params.id)

    booking.status = 'completed'
    await booking.save()

    return response.ok({
      message: 'Booking marked as completed',
      booking: {
        id: booking.id,
        reference_number: booking.referenceNumber,
        status: booking.status,
      },
    })
  }

  /**
   * Create walk-in booking
   * POST /api/bookings/walkin
   */
  async walkIn({ request, response }: HttpContext) {
    const data = await request.validateUsing(walkInValidator)

    // Import WalkIn model dynamically since it's a separate table
    const WalkIn = (await import('#models/walk_in')).default

    const walkIn = await WalkIn.create({
      staffId: data.staff_id,
      serviceId: data.service_id,
      businessId: data.business_id,
      customerName: data.customer_name,
      customerPhone: data.customer_phone,
      date: DateTime.fromISO(data.date),
      time: data.time,
      synced: true,
    })

    return response.created({
      message: 'Walk-in booking recorded successfully',
      walkIn: {
        id: walkIn.id,
        customer_name: walkIn.customerName,
        date: walkIn.date,
        time: walkIn.time,
      },
    })
  }
}