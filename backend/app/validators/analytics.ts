import vine from '@vinejs/vine'

/**
 * Validator for GET /api/analytics/:businessId/revenue
 * Validates query string when owner views revenue data
 */
export const revenueValidator = vine.compile(
  vine.object({
    // Number of days to look back — either 7 or 30
    days: vine.number().min(1).max(365).optional(),
  })
)

/**
 * Validator for GET /api/analytics/:businessId/revenue/transactions
 * Validates query string when owner views paginated transactions
 */
export const transactionsValidator = vine.compile(
  vine.object({
    // Page number for pagination
    page: vine.number().min(1).optional(),

    // Number of results per page
    limit: vine.number().min(1).max(100).optional(),

    // Filter by booking status
    status: vine.enum(['pending', 'confirmed', 'cancelled', 'completed', 'rescheduled']).optional(),
  })
)

/**
 * Validator for GET /api/analytics/:businessId/revenue/trends
 * Validates query string when owner views revenue trends
 */
export const trendsValidator = vine.compile(
  vine.object({
    // Number of days to look back
    days: vine.number().min(1).max(365).optional(),
  })
)

/**
 * Validator for GET /api/analytics/:businessId/revenue/by-service
 * Validates query string when owner views revenue by service
 */
export const revenueByServiceValidator = vine.compile(
  vine.object({
    // Number of days to look back
    days: vine.number().min(1).max(365).optional(),
  })
)
