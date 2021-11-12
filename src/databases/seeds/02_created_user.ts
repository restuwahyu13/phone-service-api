import { Knex } from 'knex'
import faker from 'faker'
import { randomPhoneNumber } from '../../helpers/helper.randomPhone'

export async function seed(knex: Knex): Promise<void> {
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
