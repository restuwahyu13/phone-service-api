import { Knex } from 'knex'
import { App } from '../../app'

let db = new App().knex

export async function seed(knex: Knex): Promise<void> {
  // rollback and migrate latest
  const cekTable = await db.raw("SELECT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename  = 'device')")

  if (!cekTable.length) {
    await db.migrate.latest()
  } else {
    await db.migrate.rollback()
    await db.migrate.latest()
  }

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
