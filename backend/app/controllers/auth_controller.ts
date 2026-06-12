import User from '#models/user'
import { HttpContext } from '@adonisjs/core/http'
import mail from '@adonisjs/mail/services/main'
import string from '@adonisjs/core/helpers/string'
import hash from '@adonisjs/core/services/hash'
import { DateTime } from 'luxon'


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
    const token = await User.accessTokens.create(user, ['*'], {
      expiresIn: '30days'
    })

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

    try{
      // Find user by email and verify password
      const user = await User.verifyCredentials(email, password)

      // Generate token wtih expiry
      const token = await User.accessTokens.create(user, ['*'], {
        expiresIn: '30days'
      })

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
      //Return same message for wrong email or wrong password
      //This prevents attackers from knowing which field is wrong
      return response.unauthorized({
        message: 'Invalid email or password'
      })
    }
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
  /**
   * Forgot password - send reset email
   * POST /api/auth/forgot-password
   */
  async forgotPassword({ request, response }: HttpContext) {
    const { email } = request.body()

    //find user by email
    const user = await User.findBy('email', email)

    //Always returns success even if email not found
    //This prevents attackers from knowing which emails are registered
    if (!user){
      return response.ok({
        message: 'If an account exists with this email, you will receive a reset link shortly'
      })
    }
    //Generate a random reset token
    const resetToken = string.generateRandom(64)

    //Store the token and expiry in the user record
    user.passwordResetToken = resetToken
    user.passwordResetExpiry = DateTime.now().plus({ minutes: 60 }) //1 hour
    await user.save()

    //Send reset email
    const resetUrl = `http://localhost:3000/reset-password?token=${resetToken}`

    await mail.send((message) => {
      message
        .to(user.email)
        .from('app@yourdomain.com')
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
    const { token, password } = request.body()

    // Find user by reset token
    const user = await User.findBy('passwordResetToken', token)
    
    //Check if token is valid
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
    user.password = await hash.make(password)
    user.passwordResetToken = null
    user.passwordResetExpiry = null
    await user.save()

    return response.ok({
      message: 'Password reset successfully. You can now login with your new password.'
    })
  }
}