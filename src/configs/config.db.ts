import Knex from 'knex'
import Objection from 'objection'
import { config } from 'dotenv'
import * as knexfile from '../knexfile'

config({ path: '../../.env' })

export const knex = Knex(knexfile[process.env.NODE_ENV as string])
Objection.Model.knex(knex)
