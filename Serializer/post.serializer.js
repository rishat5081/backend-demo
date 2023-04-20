const JSONAPISerializer = require('jsonapi-serializer').Serializer
module.exports = new JSONAPISerializer('post', {
  attributes: ['_id', 'userId', 'title', 'content', 'createdAt'],
  pluralizeType: false,
  id: '_id',
  keyForAttribute: 'camelCase'
})
