import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'reviews'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('rating').unsigned().notNullable().defaultTo(5)
      table.text('response').nullable()
      table.boolean('is_flagged').defaultTo(false)
      table.integer('helpful_count').defaultTo(0)
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('rating')
      table.dropColumn('response')
      table.dropColumn('is_flagged')
      table.dropColumn('helpful_count')
    })
  }
}