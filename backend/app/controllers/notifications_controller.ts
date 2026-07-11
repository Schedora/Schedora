import { HttpContext } from '@adonisjs/core/http'
import Notification from '#models/notification'

export default class NotificationController {
  /**
   * Get all notifications for a staff member
   * GET /api/notifications/staff/:id
   */
  async byStaff({ params, response }: HttpContext) {
    const notifications = await Notification.query()
      .where('user_id', params.id)
      .orderBy('created_at', 'desc')

    return response.ok({
      notifications: notifications.map((n) => ({
        id: n.id,
        type: n.type,
        title: n.title,
        message: n.message,
        is_read: n.isRead,
        booking_id: n.bookingId,
        created_at: n.createdAt,
      })),
      unread_count: notifications.filter((n) => !n.isRead).length,
    })
  }

  /**
   * Mark a single notification as read
   * PUT /api/notifications/:id/read
   */
  async markRead({ params, response }: HttpContext) {
    const notification = await Notification.findOrFail(params.id)

    notification.isRead = true
    await notification.save()

    return response.ok({
      message: 'Notification marked as read',
    })
  }

  /**
   * Mark all notifications as read for a staff member
   * PUT /api/notifications/staff/:id/read-all
   */
  async markAllRead({ params, response }: HttpContext) {
    await Notification.query()
      .where('user_id', params.id)
      .where('is_read', false)
      .update({ isRead: true })

    return response.ok({
      message: 'All notifications marked as read',
    })
  }
}