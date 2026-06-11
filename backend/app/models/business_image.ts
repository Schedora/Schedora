import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Business from './business.js'

/**
 * BusinessImage Model
 * Represents a single image uploaded by a business owner
 * Each image belongs to one business and can be marked as cover or banner
 */
export default class BusinessImage extends BaseModel {
  // Unique auto-incrementing ID for each image
  @column({ isPrimary: true })
  declare id: number

  // Links this image to the business it belongs to
  @column()
  declare businessId: number

  // The URL or file path where the image is stored
  @column()
  declare url: string

  // True if this is the cover photo for the business page
  // Only one image per business should be true at a time
  @column()
  declare isCover: boolean

  // True if this is the main banner image on the business landing page
  // Only one image per business should be true at a time
  @column()
  declare isBanner: boolean

  // Controls the display order in the gallery — lower numbers appear first
  @column()
  declare sortOrder: number

  // Automatically set when the image is first uploaded
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  // Automatically updated when the image record changes
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  // Relationship — each image belongs to one business
  // Lets us write image.business to get the full business details
  @belongsTo(() => Business)
  declare business: BelongsTo<typeof Business>
}
