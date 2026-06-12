import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

/**
 * Customer middleware — only allows users with role 'customer'
 * to access the route
 */
export default class CustomerMiddleware {
  async handle({ auth, response }: HttpContext, next: NextFn) {
    // Get the logged in user
    const user = auth.user!

    // Check if user is a customer
    if (user.role !== 'customer') {
      return response.forbidden({
        message: 'Access denied. Only customers can access this resource.'
      })
    }

    // User is a customer — allow the request to continue
    return next()
  }
}