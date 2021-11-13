import 'mocha'
import chai from 'chai'
import chaiHttp from 'chai-http'
import chaiDeepMatch from 'chai-deep-match'
import faker from 'faker'
import { app } from '../app'
import { randomPhoneNumber } from '../helpers/helper.randomPhone'

// initialize assertion chai
const { expect } = chai

// binding module to chai middleware
chai.use(chaiHttp)
chai.use(chaiDeepMatch)

// initialize payload
let authPayloadDynamic
let authPayloadStatic

describe('Auth Group Testing', function () {
  before(async function () {
    authPayloadDynamic = {
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      email: faker.internet.email(),
      phone: randomPhoneNumber(),
      password: 'qwerty12',
      active: true,
      role: 'company',
      created_at: new Date(),
      updated_at: new Date()
    }
    authPayloadStatic = {
      first_name: 'max',
      last_name: 'cavalera',
      email: 'maxcavalera@gmail.com',
      phone: randomPhoneNumber(),
      password: 'qwerty12',
      active: true,
      role: 'user',
      created_at: new Date(),
      updated_at: new Date()
    }
  })

  it('Should be register user dynamic success', async function () {
    const res = await chai
      .request(app)
      .post('/api/v1/auth/register')
      .set('conten-type', 'application/json')
      .send(authPayloadDynamic)

    expect(res.status).to.be.equal(201)
    expect(res.body.message).to.be.equal('Add new user account success')
  })

  it('Should be register user static success', async function () {
    const res = await chai
      .request(app)
      .post('/api/v1/auth/register')
      .set('conten-type', 'application/json')
      .send(authPayloadStatic)

    expect(res.status).to.be.equal(201)
    expect(res.body.message).to.be.equal('Add new user account success')
  })

  it('Should be register user static conflict', async function () {
    const res = await chai
      .request(app)
      .post('/api/v1/auth/register')
      .set('conten-type', 'application/json')
      .send(authPayloadStatic)

    expect(res.status).to.be.equal(409)
    expect(res.body.message).to.be.equal('Email or Phone number already taken')
  })

  it('Should be register user error', async function () {
    const res = await chai.request(app).post('/api/v1/auth/register').set('conten-type', 'application/json').send({})

    expect(res.status).to.be.equal(400)
  })
})
