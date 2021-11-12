import Knex, { Knex as KnexDB } from 'knex'
import { config } from 'dotenv'
import faker from 'faker'
import * as knexfile from '../../knexfile'
import { randomPhoneNumber } from '../../helpers/helper.randomPhone'

config({ path: '../../../.env' })
const db = Knex(knexfile[process.env.NODE_ENV as string])

export async function seed(knex: KnexDB): Promise<void> {
  // rollback and migrate latest
  const cekTable = await db.raw("SELECT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename  = 'company')")

  if (!cekTable.length) {
    await db.migrate.latest()
  } else {
    await db.migrate.rollback()
    await db.migrate.latest()
  }

  const companyData: Record<string, any> = []

  for (let i = 1; i <= 10; i++) {
    companyData.push({
      name: faker.company.companyName(),
      email: faker.internet.email(),
      phone: randomPhoneNumber(),
      address: faker.address.streetAddress(),
      state: faker.address.state(),
      city: faker.address.city(),
      country: faker.address.country(),
      postcode: faker.address.zipCode(),
      active: true,
      created_at: new Date(),
      updated_at: new Date()
    })
  }

  await knex('company').insert(companyData)
}
