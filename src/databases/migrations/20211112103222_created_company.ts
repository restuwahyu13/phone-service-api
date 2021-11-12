import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.withSchema('public').createTable('company', (table: Knex.TableBuilder) => {
    table.increments('id').unsigned().index()
    table.string('name').notNullable()
    table.string('email').notNullable()
    table.bigInteger('phone').unsigned().notNullable()
    table.string('address').notNullable()
    table.string('state').notNullable()
    table.string('city').notNullable()
    table.string('country').notNullable()
    table.bigInteger('postcode').unsigned().notNullable()
    table.boolean('active').notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.withSchema('public').dropTable('company')
}
