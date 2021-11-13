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
let devicePayload
let companyData
let userData
let adminAccount
let accessToken

describe('Device Group Testing', function () {
  before(async function () {
    companyData = await db('company').select('*').where('id', 2).first()
    userData = await db('user').select('*').where('id', 2).first()

    devicePayload = {
      company_id: companyData.id,
      device_cd: `SAMSUNG${`SR-${crypto.randomBytes(1).toString('hex').toUpperCase()}`}}`,
      description: 'samsung a6 2020',
      active: true,
      complexity: 'high',
      created_by_id: userData['id'],
      created_by_screen_id: String(userData['id']),
      last_modified_by_id: userData['id'],
      last_modified_by_screen_id: String(userData['id']),
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

  it('Should be create device success', async function () {
    const res = await chai
      .request(app)
      .post('/api/v1/device')
      .set({ 'Conten-Type': 'application/json', 'Authorization': `Bearer ${accessToken}` })
      .send(devicePayload)

    expect(res.status).to.be.equal(201)
    expect(res.body.message).to.be.equal('Add new device success')
  })

  it('Should be create device already exist', async function () {
    const res = await chai
      .request(app)
      .post('/api/v1/device')
      .set({ 'Conten-Type': 'application/json', 'Authorization': `Bearer ${accessToken}` })
      .send(devicePayload)

    expect(res.status).to.be.equal(409)
    expect(res.body.message).to.be.equal('Device code already exist')
  })

  it('Should be create device error', async function () {
    const res = await chai
      .request(app)
      .post('/api/v1/device')
      .set({ 'Conten-Type': 'application/json', 'Authorization': `Bearer ${accessToken}` })
      .send({})

    expect(res.status).to.be.equal(400)
  })

  it('Should be results all device success', async function () {
    const res = await chai
      .request(app)
      .get('/api/v1/device')
      .set({ 'Conten-Type': 'application/json', 'Authorization': `Bearer ${accessToken}` })
      .query({ limit: 10, offset: 10 })

    expect(res.status).to.be.equal(200)
    expect(res.body.message).to.be.equal('Devices OK')
  })

  it('Should be results all device error', async function () {
    const res = await chai
      .request(app)
      .get('/api/v1/device')
      .set({ 'Conten-Type': 'application/json', 'Authorization': `Bearer ${accessToken}` })

    expect(res.status).to.be.equal(400)
  })

  it('Should be result by id device success', async function () {
    const res = await chai
      .request(app)
      .get(`/api/v1/device/${2}`)
      .set({ 'Conten-Type': 'application/json', 'Authorization': `Bearer ${accessToken}` })

    expect(res.status).to.be.equal(200)
    expect(res.body.message).to.be.equal('Device OK')
  })

  it('Should be result by id device error', async function () {
    const res = await chai
      .request(app)
      .get('/api/v1/device/abc')
      .set({ 'Conten-Type': 'application/json', 'Authorization': `Bearer ${accessToken}` })

    expect(res.status).to.be.equal(400)
  })

  it('Should be update device success', async function () {
    const res = await chai
      .request(app)
      .put(`/api/v1/device/${2}`)
      .set({ 'Conten-Type': 'application/json', 'Authorization': `Bearer ${accessToken}` })
      .send(devicePayload)

    expect(res.status).to.be.equal(200)
    expect(res.body.message).to.be.equal('Update device data success')
  })

  it('Should be update device error', async function () {
    const res = await chai
      .request(app)
      .put(`/api/v1/device/${2}`)
      .set({ 'Conten-Type': 'application/json', 'Authorization': `Bearer ${accessToken}` })
      .send({})

    expect(res.status).to.be.equal(400)
  })

  it('Should be delete by id device success', async function () {
    const res = await chai
      .request(app)
      .delete(`/api/v1/device/${2}`)
      .set({ 'Conten-Type': 'application/json', 'Authorization': `Bearer ${accessToken}` })

    expect(res.status).to.be.equal(200)
    expect(res.body.message).to.be.equal(`Delete device data, for this id ${2} success`)
  })

  it('Should be delete by id device error', async function () {
    const res = await chai
      .request(app)
      .delete(`/api/v1/device/${2}`)
      .set({ 'Conten-Type': 'application/json', 'Authorization': `Bearer ${accessToken}` })

    expect(res.status).to.be.equal(404)
    expect(res.body.message).to.be.equal(`Device data not found, for this id ${2}`)
  })
})
