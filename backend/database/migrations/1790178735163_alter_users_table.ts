import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      // Add password reset columns needed for staff invitation emails
      table.string('password_reset_token').nullable()
      table.timestamp('password_reset_expiry').nullable()
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('password_reset_token')
      table.dropColumn('password_reset_expiry')
    })
  }
}