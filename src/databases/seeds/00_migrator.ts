import { knex } from '../../configs/config.db'

let db = knex

export async function seed(): Promise<void> {
  await db.migrate.latest()
  await db.migrate.rollback()
  await db.migrate.latest()
}
