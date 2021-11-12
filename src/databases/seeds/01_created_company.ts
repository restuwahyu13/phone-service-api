import { Knex } from 'knex'
import faker from 'faker'
import { randomPhoneNumber } from '../../helpers/helper.randomPhone'

export async function seed(knex: Knex): Promise<void> {
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
