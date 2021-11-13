import 'mocha'
import chai from 'chai'
import { db } from '../app'

// initialize assertion chai
const { expect } = chai

describe('Migrator Database Run', function () {
  before(async function () {
    await db.seed.run()
  })

  it('Should be migrator is working', function () {
    expect(2 + 3).to.be.equal(5)
  })
})
