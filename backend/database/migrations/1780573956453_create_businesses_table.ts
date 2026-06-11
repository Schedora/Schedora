import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'businesses'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      // Links this business to the owner who created it
      table.integer('owner_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      // The business name entered during onboarding (e.g. "Luxe Salon")
      table.string('name').notNullable()
      // The type of business — only these categories are allowed
      table
        .enum('category', [
          'Beauty & Personal Care',
          'Health & Fitness',
          'Medical & Wellness',
          'Pet Services',
          'Home Services',
          'Professional Services',
          'Tech Services',
        ])
        .notNullable()
      // Optional description the owner writes during onboarding
      table.text('description').nullable()
      // File path or URL to the business logo uploaded during onboarding
      table.string('logo').nullable()
      // How the business handles new bookings
      table.enum('booking_policy', ['instant', 'request']).defaultTo('instant')
      // The current state of the business account
      table.enum('status', ['trial', 'active', 'suspended']).defaultTo('trial')
      // The date and time when the 14-day free trial expires
      table.timestamp('trial_ends_at').nullable()
      // Whether the business is currently visible to customers
      table.boolean('is_active').defaultTo(true)
      // Automatically records when the business profile was first created
      table.timestamp('created_at').notNullable()
      // Automatically records when the business profile was last updated
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}