/* eslint-disable no-undef */
const chai = require('chai')
const chaiHttp = require('chai-http')
require('../../../server')
const request = require('../index')
chai.should()
chai.use(chaiHttp)

describe('User API unit test cases', () => {
  describe('route: /api/users , method:get', () => {
    it('It should display all the Users', (done) => {
      chai
        .request(request)
        .get('/api/users')
        .end((err, res) => {
          if (err) {
            console.error(
              'The following error' +
                err.message +
                ' is generated in users api unit test case of route : /api/users'
            )
          } else {
            res.should.have.status(200)
            res.body.should.be.a('object')
            res?.body?.should.have.a.property('data').be.a('array')
            for (let index = 0; index < res?.body?.data?.length; index++) {
              res?.body?.data[index]?.should.have.a.property('type')
              res?.body?.data[index]?.should.have.a.property('id')
              res?.body?.data[index]?.should.have.a.property('attributes')

              res?.body?.data[index]?.attributes.should.have.a.property(
                'firstName'
              )
              res?.body?.data[index]?.attributes.should.have.a.property(
                'lastName'
              )
              res?.body?.data[index]?.attributes.should.have.a.property(
                'userName'
              )
              res?.body?.data[index]?.attributes.should.have.a.property('email')
              res?.body?.data[index]?.attributes.should.have.a.property(
                'createdAt'
              )
            }

            done()
          }
        })
    })
  })
})
