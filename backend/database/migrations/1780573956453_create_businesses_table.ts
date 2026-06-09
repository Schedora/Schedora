import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'businesses'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      //business gets a unique ID
      table.integer('owner_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      //links business to ownerin users table
      table.string('name').notNullable()
      //business name
      table.enum('category', ['salon', 'barbershop', 'car_wash', 'garage']).notNullable()
      //type of business
      table.text('description').nullable()
      //description of business
      table.string('logo').nullable()
      //stores url to business logo
      table.enum('booking_policy', ['instant', 'request']).defaultTo('instant')
      //how booking works instant/request
      table.enum('status', ['trial', 'active', 'suspended']).defaultTo('trial')
      //subscription status- trial/active/suspended
      table.timestamp('trial_ends_at').nullable()
      //date and time trial ends
      table.boolean('is_active').defaultTo(true)
      //is business visible on platform superadmin can turn it off
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
      //when business was created and last updated
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}