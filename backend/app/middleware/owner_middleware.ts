import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

/**
 * Owner middleware — only allows users with role 'owner' 
 * to access the route
 */
export default class OwnerMiddleware {
  async handle({ auth, response }: HttpContext, next: NextFn) {
    // Get the logged in user
    const user = auth.user!

    // Check if user is an owner
    if (user.role !== 'owner') {
      return response.forbidden({
        message: 'Access denied. Only business owners can access this resource.'
      })
    }

    // User is an owner — allow the request to continue
    return next()
  }
}