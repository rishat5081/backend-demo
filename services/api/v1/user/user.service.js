'use strict'
const UserSerializer = require('../../../../Serializer/user.serializer')
const PostSerializer = require('../../../../Serializer/post.serializer')
const UserModel = require('../../../../models/User')
const PostModel = require('../../../../models/Post')
const RedisService = require('../../../../helper/redis')
const httpCode = require('../../../../utlls/httpCodes')
const ErrorSerializer = require('../../../../Serializer/error.serializer')
module.exports = {
  list: async (req) => {
    try {
      const users = await UserModel.find()
      if (users?.length > 0) {
        await RedisService.set(
          `GET:${req.originalUrl}`,
          300,
          JSON.stringify({
            data: {
              ...UserSerializer.serialize(users)
            }
          })
        )
        return {
          httpCode: httpCode.OK,
          data: {
            ...UserSerializer.serialize(users)
          }
        }
      } else {
        return {
          httpCode: httpCode.NO_CONTENT,
          data: {
            ...UserSerializer.serialize()
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
  posts: async (req) => {
    try {
      const { userId } = req.params
      const posts = await PostModel.find({ userId })

      if (posts?.length > 0) {
        await RedisService.set(
          `GET:${req.originalUrl}`,
          300,
          JSON.stringify({
            data: {
              ...PostSerializer.serialize(posts)
            }
          })
        )
        return {
          httpCode: httpCode.OK,
          data: {
            ...PostSerializer.serialize(posts)
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
  show: async (req) => {
    try {
      const { userId } = req.params
      const user = await UserModel.findOne({ _id: userId })

      if (user?._id) {
        await RedisService.set(
          `GET:${req.originalUrl}`,
          300,
          JSON.stringify({
            data: {
              ...UserSerializer.serialize(user)
            }
          })
        )
        return {
          httpCode: httpCode.OK,
          data: {
            ...UserSerializer.serialize(user)
          }
        }
      } else {
        return {
          httpCode: httpCode.NO_CONTENT,
          data: {
            ...UserSerializer.serialize()
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
      const { userId } = req.params
      const body = req?.body.data.attributes
      const user = await UserModel.findOneAndUpdate({ _id: userId }, body, {
        returnDocument: true,
        returnOriginal: false,
        new: true
      })

      if (user?._id) {
        return {
          httpCode: httpCode.OK,
          data: {
            ...UserSerializer.serialize(user)
          }
        }
      } else {
        return {
          httpCode: httpCode.NO_CONTENT,
          data: {
            ...UserSerializer.serialize()
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
  create: async (req) => {
    try {
      const body = req?.body.data.attributes
      let user = await UserModel.findOne({ email: body.email })
      if (user?._id) {
        return {
          httpCode: httpCode.BAD_REQUEST,
          ...ErrorSerializer.error(
            httpCode.BAD_REQUEST,
            req.originalUrl,
            'Email Already Exists'
          )
        }
      } else {
        user = await UserModel.create(body)
        return {
          httpCode: httpCode.CREATED,
          data: {
            ...UserSerializer.serialize(user)
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
