require('dotenv').config()
require('./Database/mongodb')
const { color, log } = require('console-log-colors')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const swaggerUi = require('swagger-ui-express')
const { SwaggerTheme } = require('swagger-themes')
const swaggerJsdoc = require('swagger-jsdoc')
const morgan = require('morgan')
const cors = require('cors')
const RedisClient = require('./helper/redis')
const ApiRoutes = require('./routes/router')

app.use(
  bodyParser.json({
    limit: '100mb'
  })
)
app.use(
  bodyParser.urlencoded({
    limit: '100mb',
    extended: true
  })
)
if (process.env.NODE_ENV !== 'test') app.use(morgan('short'))

app.use(cors('*'))
app.get('*', async (req, res, next) => {
  if (req.method !== 'GET') return next()
  const cachedData = await RedisClient.list(`GET:${req.originalUrl}`)
  if (cachedData) {
    const data = JSON.parse(cachedData)
    res.json(data)
  } else next()
})

const server = app.listen(process.env.PORT, () => {
  log(color.yellow(' ******************************************** '))
  log(color.yellow(' *******                              ******* '))
  log(
    color.yellow(
      ` *******   Server started at ${process.env.PORT}     ******* `
    )
  )
  log(color.yellow(' *******                              ******* '))
  log(color.yellow(' ******************************************** '))
})

/***
 *
 *
 * Swagger Setup
 */
const theme = new SwaggerTheme('v3')

const swaggerOptions = {
  definition: {
    info: {
      title: 'eFuse',
      version: '1.0.0',
      description: 'Push your limits'
    },
    requestInterceptor: (request) => {
      request.headers.Origin = '*'
      return request
    },
    host: `localhost:5000`,
    schemes: ['http']
  },
  apis: ['server.js', './routes/api/v1/*/*.routes.js']
}

const swaggerDocs = swaggerJsdoc(swaggerOptions)
const swaggerUiOptions = {
  explorer: true,
  customCss: theme.getBuffer('dark')
}

app.use(
  '/docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocs, swaggerUiOptions)
)
app.use('/', ApiRoutes)
app.use("*", (req, res)=> console.log("eFuse"))
module.exports = app
