import vine from '@vinejs/vine'

/**
 * Validator for POST /api/staff/:staffId/availability
 * Validates data when a staff member submits their weekly availability
 */
export const createAvailabilityValidator = vine.compile(
  vine.object({
    // The Monday of the week this availability applies to
    // Must be a valid date string e.g. "2024-10-28"
    week_start: vine.date(),

    // The Sunday of the week this availability applies to
    week_end: vine.date(),

    // Array of day names the staff member is available
    // Must contain at least one day
    // Valid values: Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday
    available_days: vine
      .array(
        vine.enum(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'])
      )
      .minLength(1),

    // What time the staff member starts work e.g. "09:00"
    start_time: vine
      .string()
      .trim()
      .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),

    // What time the staff member finishes work e.g. "17:00"
    end_time: vine
      .string()
      .trim()
      .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
  })
)

/**
 * Validator for PUT /api/staff/:staffId/availability/:id
 * Validates data when a staff member updates their availability
 * week_start and week_end cannot be changed on update
 * Only available days and working hours can be updated
 */
export const updateAvailabilityValidator = vine.compile(
  vine.object({
    // Days can be updated — must still be valid day names
    available_days: vine
      .array(
        vine.enum(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'])
      )
      .minLength(1)
      .optional(),

    // Working hours can be updated
    start_time: vine
      .string()
      .trim()
      .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
      .optional(),

    end_time: vine
      .string()
      .trim()
      .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
      .optional(),
  })
)
