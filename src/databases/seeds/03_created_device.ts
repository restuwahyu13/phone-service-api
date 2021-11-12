import Knex, { Knex as KnexDB } from 'knex'
import { config } from 'dotenv'
import * as knexfile from '../../knexfile'

config({ path: '../../../.env' })

export async function seed(knex: KnexDB): Promise<void> {
  const db = Knex(knexfile[process.env.NODE_ENV as string])
  const companyData = await db('company').select('*').limit(5)
  const userData = await db('user').select('*').limit(5)

  const devicesData: Record<string, any> = [
    {
      device_cd: 'SAMSUNGA6',
      description: 'samsung a6 2019',
      active: true,
      complexity: 'high',
      created_date_time: new Date(),
      last_modified_date_time: new Date(),
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      device_cd: 'REDMINOTE8',
      description: 'redmi note 8 2020',
      active: true,
      complexity: 'high',
      created_date_time: new Date(),
      last_modified_date_time: new Date(),
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      device_cd: 'IPHONE11',
      description: 'iphone 11 2020',
      active: true,
      complexity: 'high',
      created_date_time: new Date(),
      last_modified_date_time: new Date(),
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      device_cd: 'OVORENO',
      description: 'ovoreno 2021',
      active: true,
      complexity: 'medium',
      created_date_time: new Date(),
      last_modified_date_time: new Date(),
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      device_cd: 'SAMSUNGA5',
      description: 'samsung a5 2020',
      active: true,
      complexity: 'low',
      created_date_time: new Date(),
      last_modified_date_time: new Date(),
      created_at: new Date(),
      updated_at: new Date()
    }
  ]

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
