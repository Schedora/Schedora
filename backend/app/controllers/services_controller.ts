import type { HttpContext } from '@adonisjs/core/http'
import Service from '#models/service'
import Business from '#models/business'

/**
 * ServicesController
 * Handles all API endpoints related to services offered by a business
 * Services are created by the owner during onboarding or from the dashboard
 * They appear in the Service Type dropdown on the customer booking form
 */
export default class ServicesController {
  /**
   * GET /businesses/:id/services
   * Returns all active services for a specific business
   * Used to populate the Service Type dropdown on the customer booking form
   */
  async index({ params, response }: HttpContext) {
    // Find the business or return 404 if it does not exist
    const business = await Business.findOrFail(params.id)

    // Get all active services for this business
    // We only return active ones so customers never see hidden services
    const services = await Service.query()
      .where('business_id', business.id)
      .where('is_active', true)
      .orderBy('category', 'asc')

    return response.ok({
      message: 'Services fetched successfully',
      data: services,
    })
  }

  /**
   * POST /businesses/:id/services
   * Creates a new service for a business
   * Called during onboarding on the Service Catalog step
   * and any time the owner adds a new service from the dashboard
   */
  async store({ params, request, response, auth }: HttpContext) {
    // Find the business or return 404
    const business = await Business.findOrFail(params.id)

    // Make sure the logged in owner actually owns this business
    // Prevents one owner from adding services to another owner's business
    const owner = await auth.authenticate()
    if (business.ownerId !== owner.id) {
      return response.forbidden({
        message: 'You do not have permission to add services to this business',
      })
    }

    // Get the service details from the request body
    const data = request.only(['name', 'duration', 'price', 'category', 'description'])

    // Create the service and link it to this business
    const service = await Service.create({
      businessId: business.id,
      name: data.name,
      duration: data.duration,
      price: data.price,
      category: data.category,
      description: data.description,
      isActive: true,
    })

    return response.created({
      message: 'Service created successfully',
      data: service,
    })
  }

  /**
   * PUT /businesses/:id/services/:serviceId
   * Updates an existing service
   * Called when the owner edits a service from their dashboard
   */
  async update({ params, request, response, auth }: HttpContext) {
    // Find the business or return 404
    const business = await Business.findOrFail(params.id)

    // Check ownership
    const owner = await auth.authenticate()
    if (business.ownerId !== owner.id) {
      return response.forbidden({
        message: 'You do not have permission to update services for this business',
      })
    }

    // Find the specific service or return 404
    const service = await Service.findOrFail(params.serviceId)

    // Make sure this service actually belongs to this business
    // Prevents an owner from editing a service that belongs to another business
    if (service.businessId !== business.id) {
      return response.forbidden({
        message: 'This service does not belong to this business',
      })
    }

    // Get only the fields we allow to be updated
    const data = request.only(['name', 'duration', 'price', 'category', 'description', 'is_active'])

    // Apply the updates to the service record
    service.merge({
      name: data.name,
      duration: data.duration,
      price: data.price,
      category: data.category,
      description: data.description,
      isActive: data.is_active,
    })

    // Save the changes to the database
    await service.save()

    return response.ok({
      message: 'Service updated successfully',
      data: service,
    })
  }

  /**
   * DELETE /businesses/:id/services/:serviceId
   * Deletes a service permanently
   * Called when the owner removes a service from their catalog
   */
  async destroy({ params, response, auth }: HttpContext) {
    // Find the business or return 404
    const business = await Business.findOrFail(params.id)

    // Check ownership
    const owner = await auth.authenticate()
    if (business.ownerId !== owner.id) {
      return response.forbidden({
        message: 'You do not have permission to delete services for this business',
      })
    }

    // Find the specific service or return 404
    const service = await Service.findOrFail(params.serviceId)

    // Make sure this service belongs to this business
    if (service.businessId !== business.id) {
      return response.forbidden({
        message: 'This service does not belong to this business',
      })
    }

    // Delete the service permanently from the database
    await service.delete()

    return response.ok({
      message: 'Service deleted successfully',
    })
  }
}
