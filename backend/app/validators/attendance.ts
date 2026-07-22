import vine from '@vinejs/vine'

/**
 * Validator for GET /api/businesses/:businessId/attendance
 * Validates query string parameters when owner views team attendance grid
 */
export const getAttendanceValidator = vine.compile(
  vine.object({
    // Optional week filter — must be a valid date if provided
    // e.g. ?week=2024-10-28
    week: vine.date().optional(),
  })
)

/**
 * Validator for GET /api/businesses/:businessId/attendance/score
 * Validates query string parameters when owner views team presence score
 */
export const getAttendanceScoreValidator = vine.compile(
  vine.object({
    // Optional week filter — defaults to current week if not provided
    week: vine.date().optional(),
  })
)

/**
 * Validator for GET /api/businesses/:businessId/attendance/summary
 * Validates query string parameters when owner views attendance summary
 */
export const getAttendanceSummaryValidator = vine.compile(
  vine.object({
    // View type — weekly or monthly
    view: vine.enum(['weekly', 'monthly']).optional(),

    // Optional week filter
    week: vine.date().optional(),
  })
)
