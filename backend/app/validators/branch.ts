import vine from '@vinejs/vine'

/**
 * Validator for POST /api/businesses/:id/branches
 * Validates data when an owner adds a new branch location during onboarding
 * or from their dashboard
 */
export const createBranchValidator = vine.compile(
  vine.object({
    // Branch name is required e.g. "Downtown Boutique" or "Westside Branch"
    name: vine.string().trim().minLength(2).maxLength(100),

    // Full address is required so customers can find the branch
    address: vine.string().trim().minLength(5).maxLength(255),

    // Phone number is required for each branch
    // We use a simple string validation to support different formats
    phone: vine.string().trim().minLength(7).maxLength(20),

    // Branch manager name is required
    manager: vine.string().trim().minLength(2).maxLength(100),
  })
)

/**
 * Validator for PUT /api/businesses/:id/branches/:branchId
 * Validates data when an owner updates an existing branch
 * All fields are optional since the owner may only update one field
 */
export const updateBranchValidator = vine.compile(
  vine.object({
    // All fields optional on update
    name: vine.string().trim().minLength(2).maxLength(100).optional(),

    address: vine.string().trim().minLength(5).maxLength(255).optional(),

    phone: vine.string().trim().minLength(7).maxLength(20).optional(),

    manager: vine.string().trim().minLength(2).maxLength(100).optional(),
  })
)
