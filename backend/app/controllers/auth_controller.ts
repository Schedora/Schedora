import User from '#models/user'
import { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  /**
   * Register a new user
   * POST /auth/register
   */
  async register({ request, response }: HttpContext) {
    //gets data user sent us
    const { full_name, email, password, role, phone } = request.body()

    // Check if email already exists
    const existingUser = await User.findBy('email', email)
    if (existingUser) {
      return response.conflict({
        message: 'Email already registered'
      })
    }

    // Create the user
    const user = await User.create({
      fullName: full_name,
      email,
      password,
      role: role || 'customer',
      phone,
      isActive: true,
    })

    // Generate token
    const token = await User.accessTokens.create(user)

    return response.created({
      message: 'Account created successfully',
      user: {
        id: user.id,
        full_name: user.fullName,
        email: user.email,
        role: user.role,
        phone: user.phone,
      },
      token: token.value!.release(),
    })
  }

  /**
   * Login user
   * POST /auth/login
   */
  async login({ request, response }: HttpContext) {
    const { email, password } = request.body()

    // Find user by email and verify password
    const user = await User.verifyCredentials(email, password)

    // Generate token
    const token = await User.accessTokens.create(user)

    return response.ok({
      message: 'Login successful',
      user: {
        id: user.id,
        full_name: user.fullName,
        email: user.email,
        role: user.role,
        phone: user.phone,
      },
      token: token.value!.release(),
    })
  }

  /**
   * Logout user
   * DELETE /auth/logout
   */
  async logout({ auth, response }: HttpContext) {
    const user = auth.user!
    await User.accessTokens.delete(user, user.currentAccessToken.identifier)

    return response.ok({
      message: 'Logged out successfully'
    })
  }

  /**
   * Get current logged in user
   * GET /auth/me
   */
  async me({ auth, response }: HttpContext) {
    const user = auth.user!

    return response.ok({
      user: {
        id: user.id,
        full_name: user.fullName,
        email: user.email,
        role: user.role,
        phone: user.phone,
        is_active: user.isActive,
        created_at: user.createdAt,
      }
    })
  }
}