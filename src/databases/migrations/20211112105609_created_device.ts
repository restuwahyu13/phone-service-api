import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.withSchema('public').createTable('device', (table: Knex.TableBuilder) => {
    table.increments('device_id').unsigned().index()
    table.integer('company_id').references('id').inTable('company').unsigned().unique().notNullable().index()
    table.string('device_cd', 50).notNullable()
    table.string('description', 255).notNullable()
    table.boolean('active').notNullable()
    table.enum('complexity', ['low', 'medium', 'high'])
    table.integer('created_by_id').references('id').inTable('user').unsigned().unique().notNullable().index()
    table.string('created_by_screen_id', 8).notNullable()
    table.dateTime('created_date_time').notNullable()
    table.integer('last_modified_by_id').unsigned().unique().nullable()
    table.string('last_modified_by_screen_id', 8).notNullable()
    table.dateTime('last_modified_date_time').notNullable()
    table.integer('noted_id').unsigned().unique().nullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.withSchema('public').dropTable('device')
}
