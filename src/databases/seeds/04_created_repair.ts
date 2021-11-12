import Knex, { Knex as KnexDB } from 'knex'
import { config } from 'dotenv'
import * as knexfile from '../../knexfile'

config({ path: '../../../.env' })

export async function seed(knex: KnexDB): Promise<void> {
  const db = Knex(knexfile[process.env.NODE_ENV as string])
  const companyData = await db('company').select('*').limit(5)
  const userData = await db('user').select('*').limit(5)

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
      created_at: new Date(),
      updated_at: new Date()
    }
  ]

  const newData = companyData.map((val: Record<string, any>, index: number) => {
    return {
      company_id: val.id,
      service_cd: repairsData[index]['service_cd'],
      description: repairsData[index]['description'],
      active: repairsData[index]['active'],
      walk_in_service: repairsData[index]['walk_in_service'],
      preliminary_check: repairsData[index]['preliminary_check'],
      prepayment: repairsData[index]['prepayment'],
      created_by_id: userData[index]['id'],
      created_by_screen_id: String(userData[index]['id']),
      created_date_time: repairsData[index]['created_date_time'],
      last_modified_by_id: userData[index]['id'],
      last_modified_by_screen_id: String(userData[index]['id']),
      last_modified_date_time: repairsData[index]['last_modified_date_time'],
      created_at: repairsData[index]['created_at'],
      updated_at: repairsData[index]['updated_at']
    }
  })

  await knex('repair_service').insert(newData)
}
