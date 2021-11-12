import { Knex } from 'knex'
import crypto from 'crypto'
import { knex } from '../../configs/config.db'

let db = knex

export async function seed(knex: Knex): Promise<void> {
  const companyData = await db('company').select('*')
  const userData = await db('user').select('*')

  const devicesData: Record<string, any> = []

  for (let i = 1; i <= companyData.length; i++) {
    devicesData.push(
      {
        device_cd: `SAMSUNG${`SR-${crypto.randomBytes(1).toString('hex').toUpperCase()}`}}`,
        description: 'samsung a6 2019',
        active: true,
        complexity: 'high',
        created_date_time: new Date(),
        last_modified_date_time: new Date(),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        device_cd: `XIOMI${`SR-${crypto.randomBytes(1).toString('hex').toUpperCase()}`}`,
        description: 'redmi note 8 2020',
        active: true,
        complexity: 'high',
        created_date_time: new Date(),
        last_modified_date_time: new Date(),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        device_cd: `IPHONE${`SR-${crypto.randomBytes(1).toString('hex').toUpperCase()}`}`,
        description: 'iphone 11 2020',
        active: true,
        complexity: 'high',
        created_date_time: new Date(),
        last_modified_date_time: new Date(),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        device_cd: `OVO${`SR-${crypto.randomBytes(1).toString('hex').toUpperCase()}`}`,
        description: 'ovoreno 2021',
        active: true,
        complexity: 'medium',
        created_date_time: new Date(),
        last_modified_date_time: new Date(),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        device_cd: `VIVO${`SR-${crypto.randomBytes(1).toString('hex').toUpperCase()}`}`,
        description: 'samsung a5 2020',
        active: true,
        complexity: 'low',
        created_date_time: new Date(),
        last_modified_date_time: new Date(),
        created_at: new Date(),
        updated_at: new Date()
      }
    )
  }

  const newData = companyData.map((val: Record<string, any>, index: number) => {
    return {
      company_id: val.id,
      device_cd: devicesData[index]['device_cd'],
      description: devicesData[index]['description'],
      active: devicesData[index]['active'],
      complexity: devicesData[index]['complexity'],
      created_by_id: userData[index]['id'],
      created_by_screen_id: String(userData[index]['id']),
      created_date_time: devicesData[index]['created_date_time'],
      last_modified_by_id: userData[index]['id'],
      last_modified_by_screen_id: String(userData[index]['id']),
      last_modified_date_time: devicesData[index]['last_modified_date_time'],
      created_at: devicesData[index]['created_at'],
      updated_at: devicesData[index]['updated_at']
    }
  })

  await knex('device').insert(newData)
}
