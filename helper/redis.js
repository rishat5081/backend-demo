const redis = require('redis')
const client = redis.createClient({ url: process.env.REDIS_URL })
client.connect().catch((err) => console.error(err))
module.exports = {
  list: async (key) => await client.get(key),
  set: async (key, time, data) => await client.setEx(key, time, data)
}
