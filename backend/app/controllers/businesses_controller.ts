import type { HttpContext } from '@adonisjs/core/http'
import Business from '#models/business'
import BusinessImage from '#models/business_image'
import string from '@adonisjs/core/helpers/string'

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
  async registerNew({ request, response, auth }: HttpContext) {
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
  /**
   * POST /businesses/:id/images
   * Uploads one or more gallery images for a business
   * Called during onboarding on the Visual Identity step
   * and any time the owner updates their gallery afterwards
   */
  async uploadImages({ params, request, response, auth }: HttpContext) {
    // Find the business or return 404 if it does not exist
    const business = await Business.findOrFail(params.id)

    // Make sure the logged in owner actually owns this business
    const owner = auth.getUserOrFail()
    if (business.ownerId !== owner.id) {
      return response.forbidden({
        message: 'You do not have permission to upload images for this business',
      })
    }

    // Get the uploaded files from the request
    // getFiles() returns an array so owners can upload multiple images at once
    const images = request.files('images', {
      size: '10mb',
      extnames: ['jpg', 'jpeg', 'png', 'webp'],
    })

    // If no files were sent return an error
    if (!images || images.length === 0) {
      return response.badRequest({
        message: 'Please select at least one image to upload',
      })
    }

    // Loop through each uploaded file and save it
    const uploadedImages: BusinessImage[] = []

    for (const image of images) {
      // Check the file passed validation (correct size and type)
      if (!image.isValid) {
        return response.badRequest({
          message: `File ${image.clientName} is invalid: ${image.errors}`,
        })
      }

      // Generate a unique filename so files never overwrite each other
      // e.g. businesses/clx1234abc.jpg
      const fileName = `${string.generateRandom(16)}.${image.extname}`

      // Move the file to our storage folder
      await image.move('storage/uploads/businesses', {
        name: fileName,
      })

      // Save the image record to the database
      const businessImage = await BusinessImage.create({
        businessId: business.id,
        url: `storage/uploads/businesses/${fileName}`,
        isCover: false,
        isBanner: false,
        sortOrder: uploadedImages.length,
      })

      uploadedImages.push(businessImage)
    }

    return response.created({
      message: `${uploadedImages.length} image(s) uploaded successfully`,
      data: uploadedImages,
    })
  }

  /**
   * PUT /businesses/:id/images/:imageId/cover
   * Sets a specific image as the cover photo for the business
   * When an image is set as cover all other images for that business
   * have their is_cover set to false automatically
   */
  async setCover({ params, response, auth }: HttpContext) {
    // Find the business or return 404
    const business = await Business.findOrFail(params.id)

    // Check ownership
    const owner = auth.user!
    if (business.ownerId !== owner.id) {
      return response.forbidden({
        message: 'You do not have permission to update images for this business',
      })
    }

    // Find the specific image or return 404
    const image = await BusinessImage.findOrFail(params.imageId)

    // Make sure this image actually belongs to this business
    if (image.businessId !== business.id) {
      return response.forbidden({
        message: 'This image does not belong to this business',
      })
    }

    // Remove cover status from all other images for this business
    // This ensures only one image is the cover at a time
    await BusinessImage.query().where('business_id', business.id).update({ isCover: false })

    // Set this image as the cover
    image.isCover = true
    await image.save()

    return response.ok({
      message: 'Cover image updated successfully',
      data: image,
    })
  }

  /**
   * PUT /businesses/:id/images/:imageId/banner
   * Sets a specific image as the main banner for the business landing page
   * Works the same way as setCover — only one banner allowed at a time
   */
  async setBanner({ params, response, auth }: HttpContext) {
    const business = await Business.findOrFail(params.id)

    const owner = auth.user!
    if (business.ownerId !== owner.id) {
      return response.forbidden({
        message: 'You do not have permission to update images for this business',
      })
    }

    const image = await BusinessImage.findOrFail(params.imageId)

    if (image.businessId !== business.id) {
      return response.forbidden({
        message: 'This image does not belong to this business',
      })
    }

    // Remove banner status from all other images for this business
    await BusinessImage.query().where('business_id', business.id).update({ isBanner: false })

    // Set this image as the banner
    image.isBanner = true
    await image.save()

    return response.ok({
      message: 'Banner image updated successfully',
      data: image,
    })
  }

  /**
   * DELETE /businesses/:id/images/:imageId
   * Deletes a specific image from the business gallery
   * Removes both the database record and the actual file from storage
   */
  async deleteImage({ params, response, auth }: HttpContext) {
    const business = await Business.findOrFail(params.id)

    const owner = auth.user!
    if (business.ownerId !== owner.id) {
      return response.forbidden({
        message: 'You do not have permission to delete images for this business',
      })
    }

    const image = await BusinessImage.findOrFail(params.imageId)

    if (image.businessId !== business.id) {
      return response.forbidden({
        message: 'This image does not belong to this business',
      })
    }

    // Delete the database record
    await image.delete()

    return response.ok({
      message: 'Image deleted successfully',
    })
  }
}
