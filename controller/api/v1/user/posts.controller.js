'use strict'
const Service = require('../../../../services/api/v1/user/post.service')
const { responses } = require('../../../../utlls/response')
const httpCodes = require('../../../../utlls/httpCodes')

module.exports = {
  create: async (req, res) => {
    try {
      const data = await Service.create(req)
      responses(res, data)
    } catch (error) {
      responses(res, {
        httpCode: httpCode.INTERNAL_SERVER_ERROR,
        errors: [{ message: error.message }]
      })
    }
  },
  update: async (req, res) => {
    try {
      const data = await Service.update(req)
      responses(res, data)
    } catch (error) {
      responses(res, {
        httpCode: httpCode.INTERNAL_SERVER_ERROR,
        errors: [{ message: error.message }]
      })
    }
  },
  show: async (req, res) => {
    try {
      const data = await Service.show(req)
      responses(res, data)
    } catch (error) {
      responses(res, {
        httpCode: httpCode.INTERNAL_SERVER_ERROR,
        errors: [{ message: error.message }]
      })
    }
  }
}
