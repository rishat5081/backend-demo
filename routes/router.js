'use strict'
const router = require('express').Router()
const APIRoutes = require('./api/v1/user/router')
router.use('/api', APIRoutes)
module.exports = router
