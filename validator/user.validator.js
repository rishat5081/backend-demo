const { validationResult, body, param } = require('express-validator')
const { responses } = require('../utlls/response')
const ErrorSerializer = require('../Serializer/error.serializer')
const httpCodestatus = require('../utlls/httpCodes')
module.exports = {
  show: [
    param('userId', 'user Id is Mandatory').not().isEmpty().isMongoId().escape()
  ],
  create: [
    body('data.attributes.firstName', 'First Name is Mandotry')
      .not()
      .isEmpty()
      .isString()
      .escape(),
    body('data.attributes.lastName', 'Last Name is Mandotry')
      .not()
      .isEmpty()
      .isString()
      .escape(),
    body('data.attributes.userName', 'User Name is Mandotry')
      .not()
      .isEmpty()
      .isString()
      .escape(),
    body('data.attributes.email', 'Email is Mandatory Or Invalid Email')
      .isEmail()
      .escape()
  ],
  update: [
    body('data.attributes.firstName', 'First Name is Mandotry')
      .optional()
      .escape(),
    body('data.attributes.lastName', 'Last Name is Mandotry')
      .optional()
      .escape(),
    body('data.attributes.userName', 'User Name is Mandotry')
      .optional()
      .escape(),
    body('data.attributes.email', 'Email is Mandatory Or Invalid Email')
      .optional()
      .escape()
  ],
  validate: async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      responses(res, {
        httpCode: httpCodestatus.UNPROCESSABLE_ENTITY,
        ...ErrorSerializer.error(
          httpCodestatus.UNPROCESSABLE_ENTITY,
          req.originalUrl,
          errors.array()
        )
      })
    } else next()
  }
}
