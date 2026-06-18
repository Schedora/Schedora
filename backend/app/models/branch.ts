import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Business from '#models/business'

export default class Branch extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  // Links this branch to its parent business
  @column()
  declare businessId: number

  @column()
  declare branchName: string // maps to "branch_name" column in DB

  @column()
  declare address: string

  @column()
  declare phone: string | null

  @column()
  declare manager: string | null

  // First branch added to a business is automatically primary
  @column()
  declare isPrimary: boolean

  // Soft on/off switch — inactive branches won't show in booking dropdown
  @column()
  declare isActive: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  // A branch belongs to one business
  @belongsTo(() => Business)
  declare business: BelongsTo<typeof Business>
}
