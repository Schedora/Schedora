import vine from '@vinejs/vine'

/**
 * Validator for POST /api/businesses/:id/services
 * Validates data when an owner adds a new service to their catalog
 */
export const createServiceValidator = vine.compile(
  vine.object({
    // Service name is required e.g. "Haircut", "Oil Change", "Deep Tissue Massage"
    name: vine.string().trim().minLength(2).maxLength(100),

    // Duration must be a positive number in minutes
    // Minimum 5 minutes, maximum 480 minutes (8 hours)
    duration: vine.number().min(5).max(480),

    // Price must be a positive number
    // Minimum 1 to avoid free services being accidentally created
    price: vine.number().min(1).max(999999),

    // Category is a free text field — owner can use any category name
    // e.g. Haircare, Nail Design, Skincare, Wellness
    category: vine.string().trim().minLength(2).maxLength(100),

    // Description is optional
    description: vine.string().trim().maxLength(500).optional(),
  })
)

/**
 * Validator for PUT /api/businesses/:id/services/:serviceId
 * Validates data when an owner updates an existing service
 * All fields are optional since the owner may only update one field
 */
export const updateServiceValidator = vine.compile(
  vine.object({
    // All fields optional on update
    name: vine.string().trim().minLength(2).maxLength(100).optional(),

    duration: vine.number().min(5).max(480).optional(),

    price: vine.number().min(1).max(999999).optional(),

    category: vine.string().trim().minLength(2).maxLength(100).optional(),

    description: vine.string().trim().maxLength(500).optional(),

    // Owner can hide or show a service without deleting it
    is_active: vine.boolean().optional(),
  })
)
