import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

/**
 * Staff middleware — only allows users with role 'staff'
 * to access the route
 */
export default class StaffMiddleware {
  async handle({ auth, response }: HttpContext, next: NextFn) {
    // Get the logged in user
    const user = auth.user!

    // Check if user is a staff member
    if (user.role !== 'staff') {
      return response.forbidden({
        message: 'Access denied. Only staff members can access this resource.'
      })
    }

    // User is staff — allow the request to continue
    return next()
  }
}