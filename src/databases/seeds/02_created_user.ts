import { Knex } from 'knex'
import faker from 'faker'
import { App } from '../../app'
import { randomPhoneNumber } from '../../helpers/helper.randomPhone'

let db = new App().knex

export async function seed(knex: Knex): Promise<void> {
  // rollback and migrate latest
  const cekTable = await db.raw("SELECT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename  = 'user')")

  if (!cekTable.length) {
    await db.migrate.latest()
  } else {
    await db.migrate.rollback()
    await db.migrate.latest()
  }

  const usersData: Record<string, any> = []

  for (let i = 1; i <= 5; i++) {
    usersData.push({
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      email: faker.internet.email(),
      phone: randomPhoneNumber(),
      password: '@Qwerty12',
      active: true,
      role: 'user',
      created_at: new Date(),
      updated_at: new Date()
    })
  }

  for (let i = 1; i <= 5; i++) {
    usersData.push({
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      email: faker.internet.email(),
      phone: randomPhoneNumber(),
      password: '@Qwerty12',
      active: true,
      role: 'admin',
      created_at: new Date(),
      updated_at: new Date()
    })
  }

  for (let i = 1; i <= 5; i++) {
    usersData.push({
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      email: faker.internet.email(),
      phone: randomPhoneNumber(),
      password: '@Qwerty12',
      active: true,
      role: 'company',
      created_at: new Date(),
      updated_at: new Date()
    })
  }

  await knex('user').insert(usersData)
}
