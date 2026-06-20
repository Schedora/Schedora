import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Staff from './staff.js'

/**
 * Attendance Model
 * Represents a weekly availability plan submitted by a staff member
 * Staff must submit their availability at least 7 days in advance
 * Only time slots within this availability are shown to customers in the booking form
 */
export default class Attendance extends BaseModel {
  // The database table this model maps to
  public static table = 'attendance'

  // Unique auto-incrementing ID for each attendance record
  @column({ isPrimary: true })
  declare id: number

  // Links this attendance record to the staff member who submitted it
  // If the staff member is deleted their attendance records are deleted too
  @column()
  declare staffId: number

  // The Monday of the week this availability applies to
  // e.g. 2024-10-28
  @column.date()
  declare weekStart: DateTime

  // The Sunday of the week this availability applies to
  // e.g. 2024-11-03
  @column.date()
  declare weekEnd: DateTime

  // The days the staff member is available that week
  // Stored as an array of day names e.g. ['Monday', 'Wednesday', 'Friday']
  // Only these days will show available slots to customers
  @column()
  declare availableDays: string[]

  // What time the staff member starts work on their available days
  // e.g. '09:00:00'
  @column()
  declare startTime: string

  // What time the staff member finishes work on their available days
  // e.g. '17:00:00'
  @column()
  declare endTime: string

  // Automatically set when the attendance record is first created
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  // Automatically updated when the attendance record changes
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  // Relationship — each attendance record belongs to one staff member
  // Lets us write attendance.staff to get the full staff details
  @belongsTo(() => Staff)
  declare staff: BelongsTo<typeof Staff>
}
