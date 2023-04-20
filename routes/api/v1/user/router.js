'use strict'
const router = require('express').Router()
const UserRoutes = require('./user.routes')
const PostsRoutes = require('./posts.routes')
router.use('/users', UserRoutes)
router.use('/posts', PostsRoutes)
module.exports = router
