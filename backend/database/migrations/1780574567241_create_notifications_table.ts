import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'notifications'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      //who receives notification
      table
        .enum('type', ['booking', 'cancellation', 'reschedule', 'reminder', 'system'])
        .notNullable()
      //kind of notification
      table.string('title').notNullable()
      table.text('message').notNullable()
      //notification title and full message
      table.boolean('is_read').defaultTo(false)
      //when user has seen the notification
      table
        .integer('booking_id')
        .unsigned()
        .references('id')
        .inTable('bookings')
        .onDelete('SET NULL')
        .nullable()
      //links notification to specific booking
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
