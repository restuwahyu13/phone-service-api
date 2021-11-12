import { Knex } from 'knex'
import crypto from 'crypto'
import { knex } from '../../configs/config.db'

let db = knex

export async function seed(knex: Knex): Promise<void> {
  const companyData = await db('company').select('*')
  const userData = await db('user').select('*')
  const repairsData: Record<string, any> = []

  for (let i = 1; i <= companyData.length; i++) {
    repairsData.push(
      {
        service_cd: `SR-${crypto.randomBytes(4).toString('hex').toUpperCase()}`,
        description: 'ganti batrai',
        active: true,
        walk_in_service: true,
        preliminary_check: true,
        prepayment: true,
        created_date_time: new Date(),
        last_modified_date_time: new Date(),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        service_cd: `SR-${crypto.randomBytes(4).toString('hex').toUpperCase()}`,
        description: 'ganti lcd',
        active: true,
        walk_in_service: true,
        preliminary_check: true,
        prepayment: true,
        created_date_time: new Date(),
        last_modified_date_time: new Date(),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        service_cd: `SR-${crypto.randomBytes(4).toString('hex').toUpperCase()}`,
        description: 'ganti casing dan lcd',
        active: true,
        walk_in_service: true,
        preliminary_check: true,
        prepayment: true,
        created_date_time: new Date(),
        last_modified_date_time: new Date(),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        service_cd: `SR-${crypto.randomBytes(4).toString('hex').toUpperCase()}`,
        description: 'ganti ic speaker',
        active: true,
        walk_in_service: true,
        preliminary_check: true,
        prepayment: true,
        created_date_time: new Date(),
        last_modified_date_time: new Date(),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        service_cd: `SR-${crypto.randomBytes(4).toString('hex').toUpperCase()}`,
        description: 'ganti connector charger',
        active: true,
        walk_in_service: true,
        preliminary_check: true,
        prepayment: true,
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
