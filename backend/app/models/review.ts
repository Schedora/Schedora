import { ReviewSchema } from '#database/schema'
import { belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from '#models/user'
import Staff from '#models/staff'
import Business from '#models/business'
import Booking from '#models/booking'

export default class Review extends ReviewSchema {
  @belongsTo(() => User, {
    foreignKey: 'customerId',
  })
  declare customer: BelongsTo<typeof User>

  @belongsTo(() => Staff, {
    foreignKey: 'staffId',
  })
  declare staff: BelongsTo<typeof Staff>

  @belongsTo(() => Business, {
    foreignKey: 'businessId',
  })
  declare business: BelongsTo<typeof Business>

  @belongsTo(() => Booking, {
    foreignKey: 'bookingId',
  })
  declare booking: BelongsTo<typeof Booking>
}