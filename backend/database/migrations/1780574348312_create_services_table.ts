import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'services'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      //every service gets a unique number
      table.integer('business_id').unsigned().references('id').inTable('businesses').onDelete('CASCADE')
      //links service to business id
      table.string('name').notNullable()
      //service name
      table.integer('duration').notNullable()
      //how long service takes
      table.decimal('price', 10, 2).notNullable()
      //Price in ksh...upto 10 digits with 2 decimal places
      table.string('category').notNullable()
      //category service falls under
      table.text('description').nullable()
      //description of service
      table.boolean('is_active').defaultTo(true)
      //if service is currently available owner can turn it off
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
      //when service was created
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}