'use strict'
const mongoose = require('mongoose')
const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false
    },
    title: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
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
PostSchema.index({ userId: 1 })

module.exports = mongoose.model('Post', PostSchema)
