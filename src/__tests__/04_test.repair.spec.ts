import 'mocha'
import chai from 'chai'
import chaiHttp from 'chai-http'
import chaiDeepMatch from 'chai-deep-match'
import crypto from 'crypto'
import { app, db } from '../app'

// initialize assertion chai
const { expect } = chai

// binding module to chai middleware
chai.use(chaiHttp)
chai.use(chaiDeepMatch)

// initialize payload
let repairPayload
let companyData
let userData
let adminAccount
let accessToken

describe('Repair Group Testing', function () {
  before(async function () {
    companyData = await db('company').select('*').where('id', 2).first()
    userData = await db('user').select('*').where('id', 2).first()

    repairPayload = {
      company_id: companyData.id,
      service_cd: `SR-${crypto.randomBytes(4).toString('hex').toUpperCase()}`,
      description: 'ganti batrai',
      active: true,
      walk_in_service: true,
      preliminary_check: true,
      prepayment: true,
      created_by_id: userData.id,
      created_by_screen_id: String(userData.id),
      last_modified_by_id: userData.id,
      last_modified_by_screen_id: String(userData.id),
      created_date_time: new Date(),
      last_modified_date_time: new Date(),
      created_at: new Date(),
      updated_at: new Date()
    }

    adminAccount = {
      email: 'admin@gmail.com',
      password: 'qwerty12'
    }
  })

  it('Should be login success', async function () {
    const res = await chai.request(app).post('/api/v1/auth/login').set({ 'Conten-Type': 'application/json' }).send(adminAccount)

    expect(res.status).to.be.equal(200)
    expect(res.body.message).to.be.equal('Login success')

    accessToken = res.body.token.accessToken
  })

  it('Should be create repair success', async function () {
    const res = await chai
      .request(app)
      .post('/api/v1/repair')
      .set({ 'Conten-Type': 'application/json', 'Authorization': `Bearer ${accessToken}` })
      .send(repairPayload)

    expect(res.status).to.be.equal(201)
    expect(res.body.message).to.be.equal('Add new service repair success')
  })

  it('Should be create repair already exist', async function () {
    const res = await chai
      .request(app)
      .post('/api/v1/repair')
      .set({ 'Conten-Type': 'application/json', 'Authorization': `Bearer ${accessToken}` })
      .send(repairPayload)

    expect(res.status).to.be.equal(409)
    expect(res.body.message).to.be.equal('Service repair code already exist')
  })

  it('Should be create repair error', async function () {
    const res = await chai
      .request(app)
      .post('/api/v1/repair')
      .set({ 'Conten-Type': 'application/json', 'Authorization': `Bearer ${accessToken}` })
      .send({})

    expect(res.status).to.be.equal(400)
  })

  it('Should be results all repair success', async function () {
    const res = await chai
      .request(app)
      .get('/api/v1/repair')
      .set({ 'Conten-Type': 'application/json', 'Authorization': `Bearer ${accessToken}` })
      .query({ limit: 10, offset: 10 })

    expect(res.status).to.be.equal(200)
    expect(res.body.message).to.be.equal('Service Repairs OK')
  })

  it('Should be results all repair error', async function () {
    const res = await chai
      .request(app)
      .get('/api/v1/repair')
      .set({ 'Conten-Type': 'application/json', 'Authorization': `Bearer ${accessToken}` })

    expect(res.status).to.be.equal(400)
  })

  it('Should be result by id repair success', async function () {
    const res = await chai
      .request(app)
      .get(`/api/v1/repair/${2}`)
      .set({ 'Conten-Type': 'application/json', 'Authorization': `Bearer ${accessToken}` })

    expect(res.status).to.be.equal(200)
    expect(res.body.message).to.be.equal('Service Repair OK')
  })

  it('Should be result by id repair error', async function () {
    const res = await chai
      .request(app)
      .get('/api/v1/repair/abc')
      .set({ 'Conten-Type': 'application/json', 'Authorization': `Bearer ${accessToken}` })

    expect(res.status).to.be.equal(400)
  })

  it('Should be update repair success', async function () {
    const res = await chai
      .request(app)
      .put(`/api/v1/repair/${2}`)
      .set({ 'Conten-Type': 'application/json', 'Authorization': `Bearer ${accessToken}` })
      .send(repairPayload)

    expect(res.status).to.be.equal(200)
    expect(res.body.message).to.be.equal('Update service repair data success')
  })

  it('Should be update repair error', async function () {
    const res = await chai
      .request(app)
      .put(`/api/v1/repair/${2}`)
      .set({ 'Conten-Type': 'application/json', 'Authorization': `Bearer ${accessToken}` })
      .send({})

    expect(res.status).to.be.equal(400)
  })

  it('Should be delete by id repair success', async function () {
    const res = await chai
      .request(app)
      .delete(`/api/v1/repair/${2}`)
      .set({ 'Conten-Type': 'application/json', 'Authorization': `Bearer ${accessToken}` })

    expect(res.status).to.be.equal(200)
    expect(res.body.message).to.be.equal(`Delete service repair data, for this id ${2} success`)
  })

  it('Should be delete by id repair error', async function () {
    const res = await chai
      .request(app)
      .delete(`/api/v1/repair/${2}`)
      .set({ 'Conten-Type': 'application/json', 'Authorization': `Bearer ${accessToken}` })

    expect(res.status).to.be.equal(404)
    expect(res.body.message).to.be.equal(`Service repair data not found, for this id ${2}`)
  })
})
