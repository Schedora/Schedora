import vine from '@vinejs/vine'

/**
 * Validator for POST /api/businesses
 * Validates data when an owner creates a new business during onboarding
 */
export const createBusinessValidator = vine.compile(
  vine.object({
    // Business name is required and must be between 2 and 100 characters
    name: vine.string().trim().minLength(2).maxLength(100),

    // Category must be one of the 8 allowed business types
    category: vine.enum([
      'Beauty & Personal Care',
      'Health & Fitness',
      'Medical & Wellness',
      'Pet Services',
      'Home Services',
      'Professional Services',
      'Tech Services',
      'Automotive Services',
    ]),

    // Description is optional but cannot exceed 300 characters
    description: vine.string().trim().maxLength(300).optional(),

    // Booking policy must be either instant or request
    booking_policy: vine.enum(['instant', 'request']),
  })
)

/**
 * Validator for PUT /api/businesses/:id
 * Validates data when an owner updates their business profile
 * All fields are optional since the owner may only want to update one field
 */
export const updateBusinessValidator = vine.compile(
  vine.object({
    // Name is optional on update but still has length limits if provided
    name: vine.string().trim().minLength(2).maxLength(100).optional(),

    // Category must still be one of the allowed values if provided
    category: vine
      .enum([
        'Beauty & Personal Care',
        'Health & Fitness',
        'Medical & Wellness',
        'Pet Services',
        'Home Services',
        'Professional Services',
        'Tech Services',
        'Automotive Services',
      ])
      .optional(),

    // Description is optional and can be cleared
    description: vine.string().trim().maxLength(300).optional(),

    // Booking policy is optional on update
    booking_policy: vine.enum(['instant', 'request']).optional(),

    // Owner can show or hide their business
    is_active: vine.boolean().optional(),
  })
)
