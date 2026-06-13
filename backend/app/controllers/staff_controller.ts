import type { HttpContext } from '@adonisjs/core/http'
import Staff from '#models/staff'
import User from '#models/user'
import mail from '@adonisjs/mail/services/main'
import string from '@adonisjs/core/helpers/string'
import { DateTime } from 'luxon'


export default class StaffController {
  /**
   * Get all staff for a business
   * Get /api/business/:id/staff
   */
  async index({ params, response }: HttpContext) {
    const staff = await Staff.query()
      .where('business_id', params.id)
      .preload('user')

    return response.ok({
      staff: staff.map((s) => ({
        id: s.id,
        full_name: s.user.fullName,
        email: s.user.email,
        role: s.role,
        specialties: s.specialties,
        status: s.status,
        branch_id: s.branchId,
      })),
    })  
  }

  /**
   * Get individual staff profile
   * Get /api/business/:id/staff/staffId
   */
  async show({ params, response }: HttpContext) {
    const staff = await Staff.query()
      .where('id', params.staffId)
      .where('business_id', params.id)
      .preload('user')
      .firstOrFail()

    return response.ok({
      staff: {
        id: staff.id,
        full_name: staff.user.fullName,
        email: staff.user.email,
        role: staff.role,
        specialties: staff.specialties,
        status: staff.status,
        branch_id: staff.branchId,
      },
    })  
  }

  /**
   * Create staff account
   * POST /api/business/:id/staff
   */
  async store({ params, request, response }: HttpContext) {
    const { full_name, email, role, branch_id, specialties } = request.body()

    //Check if user already exists
    let user = await User.findBy('email', email)

    if (!user) {
      //Create new user account for staff
      user = await User.create({
        fullName: full_name,
        email,
        password: string.generateRandom(16),
        role: 'staff',
        isActive: false,
      })
    }

    //Create staff record
    const staff = await Staff.create({
      userId: user.id,
      businessId: params.id,
      branchId: branch_id || null,
      role: role || 'staff',
      specialties: specialties || [],
      status: 'pending',
    })

    return response.created({
      message: 'Staff member created successfully',
      staff: {
        id: staff.id,
        full_name: user.fullName,
        email:user.email,
        role: staff.role,
        status: staff.status,
      },
    })
  }

  /**
   * Send invitation email to staff
   * POST /api/business/:id/staff/:staffId/invite
   */
  async invite({ params, response }: HttpContext) {
    const staff = await Staff.query()
      .where('id', params.staffId)
      .where('business_id', params.id)
      .preload('user')
      .firstOrFail()

    //Generate invite token
    const inviteToken = string.generateRandom(64)
    
    //Save token to user
    staff.user.passwordResetToken = inviteToken
    staff.user.passwordResetExpiry = DateTime.now().plus({ days: 7 }) // 7 days
    await staff.user.save()

    //Update status to pending
    staff.status = 'pending'
    await staff.save()

    //Send invite email
    const inviteUrl = `http://localhost:300/staff/setup?token=${inviteToken}`

    await mail.send((message) => {
      message
        .to(staff.user.email)
        .from('noreply@schedora.com')
        .subject('You have been invited to join Schedora')
        .html(`
          <h2>You're invited to Schedora!</h2>
          <p>Hi ${staff.user.fullName},</p>
          <p>You have been ivited to join a business on Schedora.>/p>
          <p>Click the link below to set up your account:</p>
          <a href="${inviteUrl}">Accept Invitation>/a>
          <p>This link expires in 7 days.>/p>
        `)
    })

    return response.ok({
      message: 'Invitation sent successfully'
    })
  }

  /**
   * Update staff details
   * PUT /api/business/:id/staff/:staffId
   */
  async update({ params, request, response }: HttpContext) {
    const staff = await Staff.query()
      .where('id', params.staffId)
      .where('business_id', params.id)
      .preload('user')
      .firstOrFail()

    const{ full_name, role, branch_id, specialties, status } = request.body()
    
    // Update user details
    if (full_name) {
      staff.user.fullName = full_name
      await staff.user.save()
    }

    //Update staff details 
    staff.role = role || staff.role
    staff.branchId = branch_id || staff.branchId
    staff.specialties = specialties || staff.specialties
    staff.status = status || staff.status
    await staff.save()

    return response.ok({
      message: 'Staff member updated successfully',
      staff: {
        id: staff.id,
        full_name: staff.user.fullName,
        email: staff.user.email,
        role: staff.role,
        specialties: staff.specialties,
        status: staff.status,
        branch_id: staff.branchId,
      },
    })
  }

  /**
   * Remove staff member
   * DELETE /api/business/:id/staff/:staffId
   */
  async destroy({ params, response }: HttpContext){
    const staff = await Staff.query()
      .where('id', params.staffId)
      .where('business_id', params.id)
      .firstOrFail()

    await staff.delete()
    
    return response.ok({
      message: 'Staff member removed successfully'
    })
  }

  /**
   * Get available staff for booking
   * GET /api/business/:id/staff/available
   */
  async available({ params, request, response }: HttpContext) {
    const { date: _date, time: _time } = request.qs()

    const staff = await Staff.query()
      .where('business_id', params.id)
      .where('status', 'active')
      .preload('user')

    return response.ok({
      staff: staff.map((s) => ({
        id: s.id,
        full_name: s.user.fullName,
        role: s.role,
        specialties: s.specialties,
      })),
    })  
  }
}