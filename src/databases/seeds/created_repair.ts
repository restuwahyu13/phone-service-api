import { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
  await knex('repair').del()

  const repairsData: Record<string, any> = [
    {
      company_id: 1,
      service_cd: 'SR-4EG07H4O',
      description: 'ganti batrai',
      active: true,
      walk_in_service: true,
      preliminary_check: true,
      prepayment: true,
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
      service_cd: 'SR-9YSE5DKG',
      description: 'ganti lcd',
      active: true,
      walk_in_service: true,
      preliminary_check: true,
      prepayment: true,
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
      service_cd: 'SR-C1I4VQDX',
      description: 'ganti casing dan lcd',
      active: true,
      walk_in_service: true,
      preliminary_check: true,
      prepayment: true,
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
      service_cd: 'SR-MPH0BUHO',
      description: 'ganti ic speaker',
      active: true,
      walk_in_service: true,
      preliminary_check: true,
      prepayment: true,
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
      service_cd: 'SR-L6QVZE6L',
      description: 'ganti connector charger',
      active: true,
      walk_in_service: true,
      preliminary_check: true,
      prepayment: true,
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

  await knex('repair').insert(repairsData)
}
