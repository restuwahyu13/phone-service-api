import Knex, { Knex as KnexDB } from 'knex'
import { config } from 'dotenv'
import faker from 'faker'
import * as knexfile from '../../knexfile'
import { randomPhoneNumber } from '../../helpers/helper.randomPhone'

config({ path: '../../../.env' })
const db = Knex(knexfile[process.env.NODE_ENV as string])

export async function seed(knex: KnexDB): Promise<void> {
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
