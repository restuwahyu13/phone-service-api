import { Knex } from 'knex'
import faker from 'faker'
import { randomPhoneNumber } from '../../helpers/helper.randomPhone'
import { hashPassword } from '../../libs/lib.bcrypt'

export async function seed(knex: Knex): Promise<void> {
  const usersData: Record<string, any> = []

  for (let i = 1; i <= 10; i++) {
    usersData.push({
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      email: faker.internet.email(),
      phone: randomPhoneNumber(),
      password: await hashPassword('@Qwerty12'),
      active: true,
      role: 'user',
      created_at: new Date(),
      updated_at: new Date()
    })
  }

  for (let i = 1; i <= 20; i++) {
    usersData.push({
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      email: faker.internet.email(),
      phone: randomPhoneNumber(),
      password: await hashPassword('@Qwerty12'),
      active: true,
      role: 'admin',
      created_at: new Date(),
      updated_at: new Date()
    })
  }

  for (let i = 1; i <= 20; i++) {
    usersData.push({
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      email: faker.internet.email(),
      phone: randomPhoneNumber(),
      password: await hashPassword('@Qwerty12'),
      active: true,
      role: 'company',
      created_at: new Date(),
      updated_at: new Date()
    })
  }

  usersData.push({
    first_name: 'admin',
    last_name: 'admin',
    email: 'admin@gmail.com',
    phone: randomPhoneNumber(),
    password: await hashPassword('qwerty12'),
    active: true,
    role: 'admin',
    created_at: new Date(),
    updated_at: new Date()
  })

  usersData.push({
    first_name: 'company',
    last_name: 'company',
    email: 'company@gmail.com',
    phone: randomPhoneNumber(),
    password: await hashPassword('qwerty12'),
    active: true,
    role: 'company',
    created_at: new Date(),
    updated_at: new Date()
  })

  usersData.push({
    first_name: 'user',
    last_name: 'user',
    email: 'user@gmail.com',
    phone: randomPhoneNumber(),
    password: await hashPassword('qwerty12'),
    active: true,
    role: 'user',
    created_at: new Date(),
    updated_at: new Date()
  })

  await knex('user').insert(usersData)
}
