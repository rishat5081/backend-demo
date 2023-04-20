'use strict'
const { responses } = require('../../../../utlls/response')
const httpCodes = require('../../../../utlls/httpCodes')
const Services = require('../../../../services/api/v1/user/user.service')
module.exports = {
  show: async (req, res) => {
    try {
      const data = await Services.show(req)
      responses(res, data)
    } catch (error) {
      responses(res, {
        httpCode: httpCodes.INTERNAL_SERVER_ERROR,
        errors: [{ message: error.message }]
      })
    }
  },
  posts: async (req, res) => {
    try {
      const data = await Services.posts(req)
      responses(res, data)
    } catch (error) {
      responses(res, {
        httpCode: httpCodes.INTERNAL_SERVER_ERROR,
        errors: [{ message: error.message }]
      })
    }
  },
  list: async (req, res) => {
    try {
      const data = await Services.list(req)
      responses(res, data)
    } catch (error) {
      responses(res, {
        httpCode: httpCodes.INTERNAL_SERVER_ERROR,
        errors: [{ message: error.message }]
      })
    }
  },
  create: async (req, res) => {
    try {
      const data = await Services.create(req)
      responses(res, data)
    } catch (error) {
      responses(res, {
        httpCode: httpCodes.INTERNAL_SERVER_ERROR,
        errors: [{ message: error.message }]
      })
    }
  },
  update: async (req, res) => {
    try {
      const data = await Services.update(req)
      responses(res, data)
    } catch (error) {
      responses(res, {
        httpCode: httpCodes.INTERNAL_SERVER_ERROR,
        errors: [{ message: error.message }]
      })
    }
  }
}
