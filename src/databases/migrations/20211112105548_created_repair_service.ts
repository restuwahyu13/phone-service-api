import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.withSchema('public').createTable('repair_service', (table: Knex.TableBuilder) => {
    table.increments('id').unsigned().index()
    table.integer('company_id').references('id').inTable('company').onDelete('CASCADE').unsigned().unique().notNullable().index()
    table.string('service_cd', 50).notNullable()
    table.string('description', 150).notNullable()
    table.boolean('active').notNullable()
    table.boolean('walk_in_service').notNullable()
    table.boolean('preliminary_check').notNullable()
    table.boolean('prepayment').notNullable()
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
  await knex.schema.withSchema('public').dropTable('repair_service')
}
