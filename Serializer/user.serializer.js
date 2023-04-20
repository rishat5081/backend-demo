const JSONAPISerializer = require('jsonapi-serializer').Serializer
module.exports = new JSONAPISerializer('user', {
  attributes: ['firstName', 'lastName', 'userName', 'email', 'createdAt'],
  pluralizeType: false,
  id: '_id',
  keyForAttribute: 'camelCase'
})
