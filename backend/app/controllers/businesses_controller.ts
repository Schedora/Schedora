import type { HttpContext } from '@adonisjs/core/http'
import Business from '#models/business'

/**
 * BusinessesController
 * Handles all API endpoints related to business profiles
 * This includes creating, reading, and updating business information
 */
export default class BusinessesController {
  /**
   * GET /businesses
   * Returns a list of all businesses
   * Used by the customer login dropdown to show available businesses
   * Customers can filter by category (e.g. salon, barbershop)
   */
  async index({ request, response }: HttpContext) {
    // Get the category filter from the query string if provided
    // Example: /businesses?category=salon
    const category = request.qs().category

    // If a category was provided, filter by it
    // Otherwise return all businesses
    const businesses = category
      ? await Business.query().where('category', category).where('is_active', true)
      : await Business.query().where('is_active', true)

    return response.ok({
      message: 'Businesses fetched successfully',
      data: businesses,
    })
  }

  /**
   * GET /businesses/:id
   * Returns a single business by its ID
   * Used to populate the business landing page customers see
   */
  async show({ params, response }: HttpContext) {
    // Find the business by ID
    // orFail() automatically returns a 404 error if not found
    const business = await Business.findOrFail(params.id)

    return response.ok({
      message: 'Business fetched successfully',
      data: business,
    })
  }

  /**
   * POST /businesses
   * Creates a new business profile
   * Called after the owner completes the Business Info step in onboarding
   */
  async store({ request, response, auth }: HttpContext) {
    // Get the currently logged in owner
    const owner = auth.getUserOrFail()

    // Get the data sent in the request body
    const data = request.only(['name', 'category', 'description', 'booking_policy'])

    // Create the business and link it to the logged in owner
    const business = await Business.create({
      ownerId: owner.id,
      name: data.name,
      category: data.category,
      description: data.description,
      bookingPolicy: data.booking_policy,
    })

    return response.created({
      message: 'Business created successfully',
      data: business,
    })
  }

  /**
   * PUT /businesses/:id
   * Updates an existing business profile
   * Called when the owner edits their profile after onboarding
   */
  async update({ params, request, response, auth }: HttpContext) {
    // Find the business by ID
    const business = await Business.findOrFail(params.id)

    // Make sure the logged in owner actually owns this business
    // Prevents one owner from editing another owner's business
    const owner = auth.getUserOrFail()
    if (business.ownerId !== owner.id) {
      return response.forbidden({
        message: 'You do not have permission to update this business',
      })
    }

    // Get only the fields we allow to be updated
    const data = request.only(['name', 'category', 'description', 'booking_policy', 'is_active'])

    // Apply the updates
    business.merge({
      name: data.name,
      category: data.category,
      description: data.description,
      bookingPolicy: data.booking_policy,
      isActive: data.is_active,
    })

    // Save the changes to the database
    await business.save()

    return response.ok({
      message: 'Business updated successfully',
      data: business,
    })
  }

  /**
   * POST /businesses/:id/register-new
   * Allows an existing owner to register an additional business
   * without creating a new account
   * Called from the User Profile page on the owner dashboard
   */
  async registerNew({ params, request, response, auth }: HttpContext) {
    // Get the currently logged in owner
    const owner = auth.getUserOrFail()

    // Get the data for the new business
    const data = request.only(['name', 'category', 'description', 'booking_policy'])

    // Create the new business linked to the same owner
    const business = await Business.create({
      ownerId: owner.id,
      name: data.name,
      category: data.category,
      description: data.description,
      bookingPolicy: data.booking_policy,
    })

    return response.created({
      message: 'New business registered successfully',
      data: business,
    })
  }
}
