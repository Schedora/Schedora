import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'reviews'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('booking_id').unsigned().references('id').inTable('bookings').onDelete('CASCADE')
      //links review to specific booking
      table.integer('customer_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      //who wrote the review
      table.integer('staff_id').unsigned().references('id').inTable('staff').onDelete('CASCADE')
      //staff member being reviewed
      table.integer('business_id').unsigned().references('id').inTable('businesses').onDelete('CASCADE')
      //which business is being reviewed
      table.integer('staff_rating').unsigned().notNullable()
      table.integer('business_rating').unsigned().notNullable()
      //separate star ratings
      table.text('comment').nullable()
      //written review
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}