import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.withSchema('public').createTable('user', (table: Knex.TableBuilder) => {
    table.increments('id').unsigned().index()
    table.string('first_name').notNullable()
    table.string('last_name').notNullable()
    table.string('email').notNullable()
    table.string('phone').notNullable()
    table.string('password').notNullable()
    table.boolean('active').notNullable()
    table.enum('role', ['user', 'admin', 'company']).notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.withSchema('public').dropTable('user')
}
