import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'walk_ins'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('staff_id').unsigned().references('id').inTable('staff').onDelete('CASCADE')
      //staff member serving the walk-in records it themselves on their dashboard
      table
        .integer('service_id')
        .unsigned()
        .references('id')
        .inTable('services')
        .onDelete('CASCADE')
      //service the walk-in customer is getting
      table
        .integer('business_id')
        .unsigned()
        .references('id')
        .inTable('businesses')
        .onDelete('CASCADE')
      //business walkin happended at
      table.string('customer_name').notNullable()
      table.string('customer_phone').nullable()
      //name and phone number of customer
      table.date('date').notNullable()
      table.time('time').notNullable()
      //when walk-in happened
      table.boolean('synced').defaultTo(false)
      //tracks whether the walk-in has been added to the main booking report
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
