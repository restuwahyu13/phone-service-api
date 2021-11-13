import 'mocha'
import chai from 'chai'
import chaiHttp from 'chai-http'
import chaiDeepMatch from 'chai-deep-match'
import { app } from '../app'

// initialize assertion chai
const { expect } = chai

// binding module to chai middleware
chai.use(chaiHttp)
chai.use(chaiDeepMatch)

describe('Company Group Testing', function () {
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
})
