import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'business_images'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('business_id').unsigned().references('id').inTable('businesses').onDelete('CASCADE')
      //business the images belong to
      table.string('url').notNullable()
      //web path of the image
      table.boolean('is_cover').defaultTo(false)
      //main profile photo shown on the business card
      table.boolean('is_banner').defaultTo(false)
      //large hero image shown at the top of business landing page
      table.integer('sort_order').defaultTo(0)
      //owner can arrange images however they want
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}