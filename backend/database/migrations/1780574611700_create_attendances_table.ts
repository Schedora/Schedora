import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'attendance'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('staff_id').unsigned().references('id').inTable('staff').onDelete('CASCADE')
      //which staff member submitted this attendance
      table.date('week_start').notNullable()
      table.date('week_end').notNullable()
      //start and end dates of the week marked for availability
      table.specificType('available_days', 'text[]').notNullable()
      //array of days available
      table.time('start_time').notNullable()
      table.time('end_time').notNullable()
      //working hours
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
