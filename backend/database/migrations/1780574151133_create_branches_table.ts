import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'branches'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      //each branch gets unique ID
      table
        .integer('business_id')
        .unsigned()
        .references('id')
        .inTable('businesses')
        .onDelete('CASCADE')
      //links branch to its parent business
      table.string('branch_name').notNullable()
      //name of branch
      table.text('address').notNullable()
      //physical location of the branch
      table.string('phone').nullable()
      //phone number of that specific branch
      table.string('manager').nullable()
      //name of branch manager
      table.boolean('is_primary').defaultTo(false)
      //whether its the main branch
      table.boolean('is_active').defaultTo(true)
      //whether branch is currently open for bookings
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
      //when branch was added and updated
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
