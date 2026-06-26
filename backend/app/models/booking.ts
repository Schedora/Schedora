import { BookingSchema } from '#database/schema'
import { belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from '#models/user'
import Staff from '#models/staff'
import Service from '#models/service'
import Branch from '#models/branch'


export default class Booking extends BookingSchema {
  @belongsTo(() => User,{
    foreignKey: 'customerId',
  })
  declare customer: BelongsTo<typeof User>

  @belongsTo(() => Staff, {
    foreignKey: 'staffId',
  })
  declare staff: BelongsTo<typeof Staff>

  @belongsTo(() => Service, {
    foreignKey: 'serviceId',
  })
  declare service: BelongsTo<typeof Service>

  @belongsTo(() => Branch, {
    foreignKey: 'branchId',
  })
  declare branch: BelongsTo<typeof Branch>
}