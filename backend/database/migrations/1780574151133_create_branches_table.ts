import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'branches'

  // 'up' runs when you execute the migration — creates the table
  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id') // auto-incrementing primary key

      // Links this branch to a business. If the business is deleted, its branches are too (CASCADE)
      table
        .integer('business_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('businesses')
        .onDelete('CASCADE')

      table.string('name').notNullable() // e.g. "Westlands Branch"
      table.string('address').notNullable() // physical location
      table.string('phone').notNullable() // branch contact number
      table.string('manager').nullable() // optional — branch may not have a manager yet

      // True for the first branch added — used in booking dropdown to pre-select it
      table.boolean('is_primary').defaultTo(false).notNullable()
      table.boolean('is_active').defaultTo(true)

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  // 'down' runs if you undo the migration — drops the table
  async down() {
    this.schema.dropTable(this.tableName)
  }
}
