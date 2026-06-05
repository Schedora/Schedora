import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      //unique id for every user
      table.string('full_name').notNullable()
      //name of user
      table.string('email').notNullable().unique()
      //email of user
      table.string('password').notNullable()
      //user's password
      table.enum('role', ['customer', 'owner', 'staff', 'superadmin']).notNullable()
      //user's specifi role
      table.string('phone').nullable()
      //phone number
      table.boolean('is_active').defaultTo(true)
      //acctive or not
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
      //when account was created or updated
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}