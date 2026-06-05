import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'businesses'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('owner_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.string('name').notNullable()
      table.enum('category', ['salon', 'barbershop', 'car_wash', 'garage']).notNullable()
      table.text('description').nullable()
      table.string('logo').nullable()
      table.enum('booking_policy', ['instant', 'request']).defaultTo('instant')
      table.enum('status', ['trial', 'active', 'suspended']).defaultTo('trial')
      table.timestamp('trial_ends_at').nullable()
      table.boolean('is_active').defaultTo(true)
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}