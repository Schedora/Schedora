import { BaseSchema } from '@adonisjs/lucid/schema'

/**
 * Migration to add Automotive Services category to the businesses table
 * This covers all car-related businesses — car washes, garages, auto detailing etc.
 * We update the enum constraint to include the new category
 */
export default class extends BaseSchema {
  protected tableName = 'businesses'

  async up() {
    // Drop the old constraint first
    await this.db.rawQuery(`
      ALTER TABLE businesses
      DROP CONSTRAINT IF EXISTS businesses_category_check
    `)

    // Add new constraint with Automotive Services included
    await this.db.rawQuery(`
      ALTER TABLE businesses
      ADD CONSTRAINT businesses_category_check
      CHECK (category IN (
        'Beauty & Personal Care',
        'Health & Fitness',
        'Medical & Wellness',
        'Pet Services',
        'Home Services',
        'Professional Services',
        'Tech Services',
        'Automotive Services'
      ))
    `)
  }

  async down() {
    // Roll back — remove Automotive Services
    await this.db.rawQuery(`
      ALTER TABLE businesses
      DROP CONSTRAINT IF EXISTS businesses_category_check
    `)

    await this.db.rawQuery(`
      ALTER TABLE businesses
      ADD CONSTRAINT businesses_category_check
      CHECK (category IN (
        'Beauty & Personal Care',
        'Health & Fitness',
        'Medical & Wellness',
        'Pet Services',
        'Home Services',
        'Professional Services',
        'Tech Services'
      ))
    `)
  }
}
