'use strict'
const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    userName: {
      type: String,
      default: ''
    },
    email: {
      type: String,
      unique: true,
      required: true
    },
    createdAt: {
      type: Date
    },
    updatedAt: {
      type: Date
    }
  },
  { timestamps: true, toJSON: { getters: true, virtuals: true } },
  { versionKey: false }
)

UserSchema.index({ firstName: 1, email: 1 })

module.exports = mongoose.models.User || mongoose.model('User', UserSchema)
