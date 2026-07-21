import User from '#models/user'
import { HttpContext } from '@adonisjs/core/http'
import mail from '@adonisjs/mail/services/main'
import string from '@adonisjs/core/helpers/string'
import hash from '@adonisjs/core/services/hash'
import { DateTime } from 'luxon'
import vine from '@vinejs/vine'

/*
|--------------------------------------------------------------------------
| Validators
|--------------------------------------------------------------------------
*/
const registerValidator = vine.compile(
  vine.object({
    full_name: vine.string().minLength(2).maxLength(100),
    email: vine.string().email().normalizeEmail(),
    password: vine.string().minLength(8),
    role: vine.enum(['customer', 'owner']),
    phone: vine.string().optional(),
  })
)

const loginValidator = vine.compile(
  vine.object({
    email: vine.string().email().normalizeEmail(),
    password: vine.string().minLength(1),
  })
)

const forgotPasswordValidator = vine.compile(
  vine.object({
    email: vine.string().email().normalizeEmail(),
  })
)

const resetPasswordValidator = vine.compile(
  vine.object({
    token: vine.string().minLength(1),
    password: vine.string().minLength(8),
  })
)

export default class AuthController {
  /**
   * Register a new user
   * POST /api/auth/register
   */
  async register({ request, response }: HttpContext) {
    // Validate input first
    const data = await request.validateUsing(registerValidator)

    // Check if email already exists
    const existingUser = await User.findBy('email', data.email)
    if (existingUser) {
      return response.conflict({
        message: 'An account with this email already exists'
      })
    }

    // Create the user
    const user = await User.create({
      fullName: data.full_name,
      email: data.email,
      password: data.password,
      role: data.role,
      phone: data.phone,
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
   * POST /api/auth/login
   */
  async login({ request, response }: HttpContext) {
    // Validate input first
    const data = await request.validateUsing(loginValidator)

    try {
      // Find user by email and verify password
      const user = await User.verifyCredentials(data.email, data.password)

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
    } catch (error) {
      // Return same message for wrong email or wrong password
      // This prevents attackers from knowing which field is wrong
      return response.unauthorized({
        message: 'Invalid email or password'
      })
    }
  }

  /**
   * Logout user
   * DELETE /api/auth/logout
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
   * GET /api/auth/me
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

  /**
   * Forgot password — send reset email
   * POST /api/auth/forgot-password
   */
  async forgotPassword({ request, response }: HttpContext) {
    // Validate input first
    const data = await request.validateUsing(forgotPasswordValidator)

    // Find user by email
    const user = await User.findBy('email', data.email)

    // Always return success even if email not found
    // This prevents attackers from knowing which emails are registered
    if (!user) {
      return response.ok({
        message: 'If an account exists with this email, you will receive a reset link shortly'
      })
    }

    // Generate a random reset token
    const resetToken = string.generateRandom(64)

    // Store the token and expiry in the user record
    user.passwordResetToken = resetToken
    user.passwordResetExpiry = DateTime.now().plus({ hours: 1 })
    await user.save()

    // Send reset email
    const resetUrl = `http://localhost:3000/reset-password?token=${resetToken}`

    await mail.send((message) => {
      message
        .to(user.email)
        .from('noreply@schedora.com')
        .subject('Reset your Schedora password')
        .html(`
          <h2>Reset Your Password</h2>
          <p>Hi ${user.fullName},</p>
          <p>You requested to reset your password. Click the link below:</p>
          <a href="${resetUrl}">Reset Password</a>
          <p>This link expires in 1 hour.</p>
          <p>If you didn't request this, ignore this email.</p>
        `)
    })

    return response.ok({
      message: 'If an account exists with this email, you will receive a reset link shortly'
    })
  }

  /**
   * Reset password — validate token and update password
   * POST /api/auth/reset-password
   */
  async resetPassword({ request, response }: HttpContext) {
    // Validate input first
    const data = await request.validateUsing(resetPasswordValidator)

    // Find user by reset token
    const user = await User.findBy('passwordResetToken', data.token)

    // Check if token is valid
    if (!user) {
      return response.badRequest({
        message: 'Invalid or expired reset token'
      })
    }

    // Check if token has expired
    if (!user.passwordResetExpiry || user.passwordResetExpiry < DateTime.now()) {
      return response.badRequest({
        message: 'Invalid or expired reset token'
      })
    }

    // Update password
    user.password = await hash.make(data.password)
    user.passwordResetToken = null
    user.passwordResetExpiry = null
    await user.save()

    return response.ok({
      message: 'Password reset successfully. You can now login with your new password.'
    })
  }
}