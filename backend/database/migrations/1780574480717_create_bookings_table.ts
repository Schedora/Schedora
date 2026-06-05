import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'bookings'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      //id
      table.string('reference_number').notNullable().unique()
      //a unique booking code customer gets when they book
      table.integer('customer_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      //links to customer user's account
      table.integer('staff_id').unsigned().references('id').inTable('staff').onDelete('CASCADE')
      //staff member that will handle the booking
      table.integer('service_id').unsigned().references('id').inTable('services').onDelete('CASCADE')
      //servuce that was booked
      table.integer('branch_id').unsigned().references('id').inTable('branches').onDelete('CASCADE')
      //branch appointment is at
      table.date('date').notNullable()
      table.time('time').notNullable()
      //date and time of the appointment
      table.enum('status', ['pending', 'confirmed', 'cancelled', 'completed', 'rescheduled']).defaultTo('pending')
      //booking status
      table.text('notes').nullable()
      table.timestamp('cancelled_at').nullable()
      table.string('cancellation_reason').nullable()
      //when it was cancelled and why
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}