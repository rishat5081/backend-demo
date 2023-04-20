const { validationResult, body, param } = require('express-validator')
const { responses } = require('../utlls/response')
const ErrorSerializer = require('../Serializer/error.serializer')
const httpCode = require('../utlls/httpCodes')
module.exports = {
  show: [
    param('postId', 'post Id is Mandatory').not().isEmpty().isMongoId().escape()
  ],
  body: [
    body('data.attributes.userId', 'User Id is Mandatory')
      .not()
      .isEmpty()
      .isString()
      .isMongoId(),
    body('data.attributes.title', 'Title is Mandatory')
      .not()
      .isEmpty()
      .isString()
      .escape(),
    body('data.attributes.content', 'Invalid skill')
      .not()
      .isEmpty()
      .isString()
      .escape()
  ],
  update: [
    body('data.attributes.userId', 'User Id is Mandatory')
      .optional()
      .isMongoId(),
    body('data.attributes.title', 'Title is Mandatory')
      .optional()
      .isString()
      .escape(),
    body('data.attributes.content', 'Invalid skill')
      .optional()
      .isString()
      .escape()
  ],
  validate: async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      responses(res, {
        httpCode: httpCode.UNPROCESSABLE_ENTITY,
        ...ErrorSerializer.error(
          httpCode.UNPROCESSABLE_ENTITY,
          req.originalUrl,
          errors.array()
        )
      })
    } else next()
  }
}
