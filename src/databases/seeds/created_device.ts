import { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
  await knex('device').del()

  const devicesData: Record<string, any> = [
    {
      company_id: 1,
      device_cd: 'SAMSUNGA6',
      description: 'samsung a6 2019',
      active: true,
      complexity: 'high',
      created_by_id: 1,
      created_by_screen_id: '1',
      created_date_time: new Date(),
      last_modified_by_id: 1,
      last_modified_by_screen_id: '1',
      last_modified_date_time: new Date(),
      noted_id: true,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      company_id: 2,
      device_cd: 'REDMINOTE8',
      description: 'redmi note 8 2020',
      active: true,
      complexity: 'high',
      created_by_id: 2,
      created_by_screen_id: '2',
      created_date_time: new Date(),
      last_modified_by_id: 2,
      last_modified_by_screen_id: '2',
      last_modified_date_time: new Date(),
      noted_id: true,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      company_id: 3,
      device_cd: 'IPHONE11',
      description: 'iphone 11 2020',
      active: true,
      complexity: 'high',
      created_by_id: 3,
      created_by_screen_id: '3',
      created_date_time: new Date(),
      last_modified_by_id: 3,
      last_modified_by_screen_id: '3',
      last_modified_date_time: new Date(),
      noted_id: true,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      company_id: 4,
      device_cd: 'OVORENO',
      description: 'ovoreno 2021',
      active: true,
      complexity: 'medium',
      created_by_id: 4,
      created_by_screen_id: '4',
      created_date_time: new Date(),
      last_modified_by_id: 4,
      last_modified_by_screen_id: '4',
      last_modified_date_time: new Date(),
      noted_id: true,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      company_id: 5,
      device_cd: 'SAMSUNGA5',
      description: 'samsung a5 2020',
      active: true,
      complexity: 'low',
      created_by_id: 5,
      created_by_screen_id: '5',
      created_date_time: new Date(),
      last_modified_by_id: 5,
      last_modified_by_screen_id: '5',
      last_modified_date_time: new Date(),
      noted_id: true,
      created_at: new Date(),
      updated_at: new Date()
    }
  ]

  await knex('device').insert(devicesData)
}
