import 'mocha'
import chai from 'chai'
import chaiHttp from 'chai-http'
import chaiDeepMatch from 'chai-deep-match'
import faker from 'faker'
import { app, db } from '../app'
import { randomPhoneNumber } from '../helpers/helper.randomPhone'
import { randomZipCode } from '../helpers/helper.randomZipCode'

// initialize assertion chai
const { expect } = chai

// binding module to chai middleware
chai.use(chaiHttp)
chai.use(chaiDeepMatch)

// initialize payload
let companyPayload

describe('Company Group Testing', function () {
  before(async function () {
    await db.seed.run()
    companyPayload = {
      name: 'Jamal Mirdad',
      email: 'jamalmirdad@gmail.com',
      phone: +randomPhoneNumber(),
      address: faker.address.streetAddress(),
      state: faker.address.state(),
      city: faker.address.city(),
      country: faker.address.country(),
      postcode: +randomZipCode(),
      active: true,
      created_at: new Date(),
      updated_at: new Date()
    }
  })

  it('Should be create company success', async function () {
    const res = await chai.request(app).post('/api/v1/company').set('conten-type', 'application/json').send(companyPayload)

    expect(res.status).to.be.equal(201)
    expect(res.body.message).to.be.equal('Add new company success')
  })

  it('Should be create company already exist', async function () {
    const res = await chai.request(app).post('/api/v1/company').set('conten-type', 'application/json').send(companyPayload)

    expect(res.status).to.be.equal(409)
    expect(res.body.message).to.be.equal('Company name, email or phone already exist')
  })

  it('Should be create company error', async function () {
    const res = await chai.request(app).post('/api/v1/company').set('conten-type', 'application/json').send({})

    expect(res.status).to.be.equal(400)
  })

  it('Should be results all company success', async function () {
    const res = await chai
      .request(app)
      .get('/api/v1/company')
      .set('conten-type', 'application/json')
      .query({ limit: 10, offset: 10 })

    expect(res.status).to.be.equal(200)
    expect(res.body.message).to.be.equal('Companys OK')
  })

  it('Should be results all company error', async function () {
    const res = await chai.request(app).get('/api/v1/company').set('conten-type', 'application/json')

    expect(res.status).to.be.equal(400)
  })

  it('Should be result by id company success', async function () {
    const res = await chai.request(app).get(`/api/v1/company/${1}`).set('conten-type', 'application/json')

    expect(res.status).to.be.equal(200)
    expect(res.body.message).to.be.equal('Company OK')
  })

  it('Should be result by id company error', async function () {
    const res = await chai.request(app).get('/api/v1/company/abc').set('conten-type', 'application/json')

    expect(res.status).to.be.equal(400)
  })

  it('Should be update company success', async function () {
    const res = await chai.request(app).put(`/api/v1/company/${1}`).set('conten-type', 'application/json').send(companyPayload)

    expect(res.status).to.be.equal(200)
    expect(res.body.message).to.be.equal('Update company data success')
  })

  it('Should be update company error', async function () {
    const res = await chai.request(app).put(`/api/v1/company/${1}`).set('conten-type', 'application/json').send({})

    expect(res.status).to.be.equal(400)
  })

  it('Should be delete by id company success', async function () {
    const res = await chai.request(app).delete(`/api/v1/company/${1}`).set('conten-type', 'application/json')

    expect(res.status).to.be.equal(200)
    expect(res.body.message).to.be.equal(`Delete company data, for this id ${1} success`)
  })

  it('Should be delete by id company error', async function () {
    const res = await chai.request(app).delete(`/api/v1/company/${1}`).set('conten-type', 'application/json')

    expect(res.status).to.be.equal(404)
    expect(res.body.message).to.be.equal(`Company data not found, for this id ${1}`)
  })
})
