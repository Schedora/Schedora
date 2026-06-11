import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'staff'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      //every staff gets a unique id
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      //links staff to their user account...first user then assigned as staff
      table
        .integer('business_id')
        .unsigned()
        .references('id')
        .inTable('businesses')
        .onDelete('CASCADE')
      //business staff works in
      table
        .integer('branch_id')
        .unsigned()
        .references('id')
        .inTable('branches')
        .onDelete('SET NULL')
        .nullable()
      //branch they are assigned to
      table.string('role').notNullable()
      //job title
      table.specificType('specialties', 'text[]').nullable()
      //services they specialize in
      table.enum('status', ['active', 'inactive', 'pending']).defaultTo('pending')
      //current status (pending, active, inactive)
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
