import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Business from './business.js'

/**
 * Service Model
 * Represents a single service offered by a business
 * e.g. Haircut, Car Wash, Oil Change, Facial Treatment
 * Each service belongs to one business and appears in the
 * customer booking form Service Type dropdown
 */
export default class Service extends BaseModel {
  // Unique auto-incrementing ID for each service
  @column({ isPrimary: true })
  declare id: number

  // Links this service to the business that offers it
  // Matches the business_id column in the services table
  @column()
  declare businessId: number

  // The name of the service e.g. "Haircut", "Deep Tissue Massage"
  @column()
  declare name: string

  // How long the service takes in minutes e.g. 30, 45, 60, 90
  // Note: column is named 'duration' in the database (not duration_minutes)
  @column()
  declare duration: number

  // The price of the service — stored with 2 decimal places
  // e.g. 500.00, 1200.50
  @column()
  declare price: number

  // The category this service belongs to
  // e.g. Haircare, Nail Design, Skincare, Wellness
  @column()
  declare category: string

  // Optional extra detail about the service
  // e.g. "Includes wash, cut and blow dry"
  @column()
  declare description: string | null

  // Whether this service is currently available for booking
  // false means it is hidden from customers without being deleted
  @column()
  declare isActive: boolean

  // Automatically set when the service is first created
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  // Automatically updated every time the service record changes
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  // Relationship — each service belongs to one business
  // Lets us write service.business to get the full business details
  @belongsTo(() => Business)
  declare business: BelongsTo<typeof Business>
}
