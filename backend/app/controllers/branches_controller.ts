import type { HttpContext } from '@adonisjs/core/http'
import Business from '#models/business'
import Branch from '#models/branch'
import { createBranchValidator, updateBranchValidator } from '#validators/branch'

export default class BranchesController {
  // POST /businesses/:id/branches — add a new branch
  async store({ params, request, response }: HttpContext) {
    // Make sure the business exists before adding a branch
    const business = await Business.findOrFail(params.id)

    // Validate the request data before saving
    // Ensures name, address, phone and manager are present and valid
    const data = await createBranchValidator.validate(request.all())

    // Count existing branches for this business
    const existingCount = await Branch.query().where('business_id', business.id).count('* as total')

    // If this is the first branch, automatically mark it as primary
    const isFirst = Number(existingCount[0].$extras.total) === 0

    const branch = await Branch.create({
      ...data,
      businessId: business.id,
      isPrimary: isFirst,
      isActive: true, // new branches are active by default
    })

    return response.created({ data: branch })
  }

  // GET /businesses/:id/branches — get all branches for a business
  async index({ params, response }: HttpContext) {
    // Make sure the business exists
    const business = await Business.findOrFail(params.id)

    const branches = await Branch.query()
      .where('business_id', business.id)
      .orderBy('is_primary', 'desc') // primary branch always comes first
      .orderBy('created_at', 'asc')

    return response.ok({ data: branches })
  }

  // PUT /businesses/:id/branches/:branchId — edit a branch
  async update({ params, request, response }: HttpContext) {
    // Find the branch and make sure it belongs to this business
    const branch = await Branch.query()
      .where('id', params.branchId)
      .where('business_id', params.id)
      .firstOrFail()

    // Validate the update data — all fields are optional
    const data = await updateBranchValidator.validate(request.all())

    branch.merge(data)
    await branch.save()

    return response.ok({ data: branch })
  }

  // DELETE /businesses/:id/branches/:branchId — delete a branch
  async destroy({ params, response }: HttpContext) {
    // Find the branch and make sure it belongs to this business
    const branch = await Branch.query()
      .where('id', params.branchId)
      .where('business_id', params.id)
      .firstOrFail()

    // If we're deleting the primary branch, promote the next oldest one
    if (branch.isPrimary) {
      const next = await Branch.query()
        .where('business_id', params.id)
        .whereNot('id', branch.id)
        .orderBy('created_at', 'asc')
        .first()

      if (next) {
        next.isPrimary = true
        await next.save()
      }
    }

    await branch.delete()

    return response.ok({ message: 'Branch deleted successfully' })
  }
}
