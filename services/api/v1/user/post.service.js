'use strict'
const PostModel = require('../../../../models/Post')
const httpCode = require('../../../../utlls/httpCodes')
const ErrorSerializer = require('../../../../Serializer/error.serializer')
const PostSerializer = require('../../../../Serializer/post.serializer')

const RedisService = require('../../../../helper/redis')
module.exports = {
  create: async (req) => {
    try {
      const body = req?.body?.data?.attributes
      const post = await PostModel.create(body)
      if (post?._id) {
        return {
          httpCode: httpCode.CREATED,
          data: {
            ...PostSerializer.serialize(post)
          }
        }
      } else {
        return {
          httpCode: httpCode.BAD_REQUEST,
          ...ErrorSerializer.error(
            httpCode.BAD_REQUEST,
            req.originalUrl,
            'Error Creating Post'
          )
        }
      }
    } catch (error) {
      return {
        httpCode: httpCode.INTERNAL_SERVER_ERROR,
        errors: [{ message: error.message }]
      }
    }
  },
  show: async (req) => {
    try {
      const { postId } = req.params
      const post = await PostModel.findOne({ _id: postId }).populate('userId')
      if (post?._id) {
        await RedisService.set(
          `GET:${req.originalUrl}`,
          300,
          JSON.stringify({
            data: {
              ...PostSerializer.serialize(post)
            }
          })
        )
        return {
          httpCode: httpCode.OK,
          data: {
            ...PostSerializer.serialize(post)
          }
        }
      } else {
        return {
          httpCode: httpCode.NO_CONTENT,
          data: {
            ...PostSerializer.serialize()
          }
        }
      }
    } catch (error) {
      return {
        httpCode: httpCode.INTERNAL_SERVER_ERROR,
        errors: [{ message: error.message }]
      }
    }
  },
  update: async (req) => {
    try {
      const { postId } = req.params
      const body = req?.body?.data?.attributes
      const post = await PostModel.findOneAndUpdate({ _id: postId }, body, {
        new: true,
        returnDocument: true,
        returnOriginal: false
      })
      if (post?._id) {
        await RedisService.set(
          `GET:${req.originalUrl}`,
          300,
          JSON.stringify({
            data: {
              ...PostSerializer.serialize(post)
            }
          })
        )
        return {
          httpCode: httpCode.OK,
          data: {
            ...PostSerializer.serialize(post)
          }
        }
      } else {
        return {
          httpCode: httpCode.NO_CONTENT,
          data: {
            ...PostSerializer.serialize()
          }
        }
      }
    } catch (error) {
      return {
        httpCode: httpCode.INTERNAL_SERVER_ERROR,
        errors: [{ message: error.message }]
      }
    }
  }
}
