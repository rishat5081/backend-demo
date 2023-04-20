/* eslint-disable no-undef */
const chai = require('chai')
const chaiHttp = require('chai-http')
require('../../../server')
const request = require('../index')
chai.should()
chai.use(chaiHttp)
let userId = ''
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
              userId = res?.body?.data[index]?.id

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

  describe('route: /api/users , method:get', () => {
    it('It should display a User details', (done) => {
      chai
        .request(request)
        .get(`/api/users/${userId}`)
        .end((err, res) => {
          if (err) {
            console.error(
              'The following error' +
                err.message +
                ' is generated in users api unit test case of route : /api/users/{userId}'
            )
          } else {
            res.should.have.status(200)
            res.body.should.be.a('object')
            res?.body?.should.have.a.property('data').be.a('object')
            res?.body?.data?.should.have.a.property('type')
            res?.body?.data?.should.have.a.property('id')
            res?.body?.data?.should.have.a.property('attributes')
            res?.body?.data?.attributes.should.have.a.property('firstName')
            res?.body?.data?.attributes.should.have.a.property('lastName')
            res?.body?.data?.attributes.should.have.a.property('userName')
            res?.body?.data?.attributes.should.have.a.property('email')
            res?.body?.data?.attributes.should.have.a.property('createdAt')
            done()
          }
        })
    })
  })
})
