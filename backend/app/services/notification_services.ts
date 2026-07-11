import Notification from '#models/notification'

export default class NotificationService {
  /**
   * Create a notification for a user
   */
  static async create({
    userId,
    type,
    title,
    message,
    bookingId,
  }: {
    userId: number
    type: 'booking' | 'cancellation' | 'reschedule' | 'reminder' | 'system'
    title: string
    message: string
    bookingId?: number
  }) {
    return await Notification.create({
      userId,
      type,
      title,
      message,
      isRead: false,
      bookingId: bookingId || null,
    })
  }

  /**
   * Notify staff when a booking is made
   */
  static async bookingCreated(staffUserId: number, customerName: string, date: string, time: string, bookingId: number) {
    await this.create({
      userId: staffUserId,
      type: 'booking',
      title: 'New Booking!',
      message: `${customerName} has booked an appointment with you on ${date} at ${time}.`,
      bookingId,
    })
  }

  /**
   * Notify staff when a booking is rescheduled
   */
  static async bookingRescheduled(staffUserId: number, customerName: string, newDate: string, newTime: string, bookingId: number) {
    await this.create({
      userId: staffUserId,
      type: 'reschedule',
      title: 'Booking Rescheduled',
      message: `${customerName} has rescheduled their appointment to ${newDate} at ${newTime}.`,
      bookingId,
    })
  }

  /**
   * Notify staff when a booking is cancelled
   */
  static async bookingCancelled(staffUserId: number, customerName: string, date: string, time: string, bookingId: number) {
    await this.create({
      userId: staffUserId,
      type: 'cancellation',
      title: 'Booking Cancelled',
      message: `${customerName} has cancelled their appointment on ${date} at ${time}.`,
      bookingId,
    })
  }
}