import 'dotenv/config'
import express, { Express, Router } from 'express'
import http, { Server } from 'http'
import Knex, { Knex as KnexDB } from 'knex'
import Objection from 'objection'
import bodyParser from 'body-parser'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import compression from 'compression'
import zlib from 'zlib'

import * as knexfile from '@/knexfile'
import RouteDevice from '@routes/route.device'
import RouteRepair from '@routes/route.repair'
import RouteUser from '@routes/route.user'
import RouteCompany from '@routes/route.company'
import { globalError } from '@middlewares/middleware.error'

interface IApp {
  app: Express
  db: KnexDB
}

export class App {
  private app: Express
  private server: Server
  private knex: KnexDB
  private device: Router
  private repair: Router
  private user: Router
  private company: Router

  constructor() {
    this.app = express()
    this.server = http.createServer(this.app)
    this.knex = Knex(knexfile[process.env.NODE_ENV as string])
    this.device = RouteDevice
    this.repair = RouteRepair
    this.user = RouteUser
    this.company = RouteCompany
  }

  private connection(): KnexDB {
    Objection.Model.knex(this.knex)
    return this.knex
  }

  private async middleware(): Promise<void> {
    this.app.use(bodyParser.json({ limit: '5mb' }))
    this.app.use(bodyParser.urlencoded({ extended: true }))
    this.app.use(helmet({ contentSecurityPolicy: false }))
    this.app.use(
      cors({
        origin: '*',
        methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
        credentials: true
      })
    )
    this.app.use(
      compression({
        strategy: zlib.constants.Z_RLE,
        level: zlib.constants.Z_BEST_COMPRESSION,
        memLevel: zlib.constants.Z_BEST_COMPRESSION,
        chunkSize: Infinity,
        threshold: Infinity
      })
    )
    if (process.env.NODE_ENV !== 'production') {
      this.app.use(morgan('dev'))
    }
    this.app.use(globalError())
  }

  private async config(): Promise<void> {
    this.app.disabled('x-powered-by')
  }

  private async route(): Promise<void> {
    this.app.use('/api/v1/device', this.device)
    this.app.use('/api/v1/repair', this.repair)
    this.app.use('/api/v1/user', this.user)
    this.app.use('/api/v1/company', this.company)
  }

  private async run(): Promise<void> {
    this.server.listen(process.env.PORT, () => {
      if (process.env.NODE_ENV !== 'production') {
        console.info('Server is running on port:', process.env.PORT)
      }
    })
  }

  public async main(): Promise<void> {
    this.connection()
    await this.middleware()
    await this.config()
    await this.route()
    await this.run()
  }

  public async mainTest(): Promise<IApp> {
    await this.middleware()
    await this.config()
    await this.route()
    return { app: this.app, db: this.connection() }
  }
}

/**
 * @description intialize app and run app development / production
 */
;(async function () {
  await new App().main()
})()

/**
 * @description intialize app and db for testing
 */

let app: Express
let db: KnexDB
;(async function () {
  if (process.env.NODE_ENV === 'test') {
    const res = await new App().mainTest()
    app = res.app
    db = res.db
  }
})()

export { app, db }
