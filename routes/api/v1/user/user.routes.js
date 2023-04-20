'use strict'
const router = require('express').Router()
const Controller = require('../../../../controller/api/v1/user/user.controller')
const UserValidator = require('../../../../validator/user.validator')
/**
 * @swagger
 * /api/users:
 *  get:
 *    tags:
 *      - User
 *    description: Get Users
 *    responses:
 *      200:
 *        description: Success
 */

router.get('/', Controller.list)

/**
 * @swagger
 * /api/users:
 *  post:
 *    tags:
 *      - User
 *    description: create a  user
 *    parameters:
 *      - description: create a  user
 *        in: body
 *        name: body
 *        schema:
 *          type: object
 *          properties:
 *            data:
 *              type: object
 *              properties:
 *                attributes:
 *                  type: object
 *                  properties:
 *                     firstName:
 *                       type: string
 *                       required: true
 *                       example: Ali
 *                     lastName:
 *                       type: string
 *                       required: true
 *                       example: Akbar
 *                     email:
 *                       type: string
 *                       required: true
 *                       example: ali@gmail.com
 *                     userName:
 *                       type: string
 *                       required: true
 *                       example: ali_akbar
 *
 *    responses:
 *      200:
 *        description: Success
 */

router.post(
  '/',
  UserValidator.create,
  UserValidator.validate,
  Controller.create
)

/**
 * @swagger
 * /api/users/{userId}/posts:
 *  get:
 *    tags:
 *      - User
 *    description: Get User Posts
 *    parameters:
 *      - name: userId
 *        description: Id of the User.
 *        in: path
 *        type: string
 *        schema:
 *          type: string
 *          maximum: 50
 *          example: John
 *    responses:
 *      200:
 *        description: Success
 */

router.get(
  '/:userId/posts',
  UserValidator.show,
  UserValidator.validate,
  Controller.posts
)

/**
 * @swagger
 * /api/users/{userId}:
 *  get:
 *    tags:
 *      - User
 *    description: Get User Details
 *    parameters:
 *      - name: userId
 *        description: Id of the User.
 *        in: path
 *        type: string
 *        schema:
 *          type: string
 *          maximum: 50
 *          example: John
 *    responses:
 *      200:
 *        description: Success
 */

router.get(
  '/:userId',
  UserValidator.show,
  UserValidator.validate,
  Controller.show
)

/**
 * @swagger
 * /api/users/{userId}:
 *  put:
 *    tags:
 *      - User
 *    description: update user record
 *    parameters:
 *      - name: userId
 *        description: Id of the User.
 *        in: path
 *        type: string
 *        schema:
 *          type: string
 *          maximum: 50
 *          example: John
 *      - description: Get all invited user from emails
 *        in: body
 *        name: body
 *        schema:
 *          type: object
 *          properties:
 *            data:
 *              type: object
 *              properties:
 *                attributes:
 *                  type: object
 *                  properties:
 *                     firstName:
 *                       type: string
 *                       required: false
 *                       example: Ali
 *                     lastName:
 *                       type: string
 *                       required: false
 *                       example: Akbar
 *                     email:
 *                       type: string
 *                       required: false
 *                       example: ali@gmail.com
 *                     userName:
 *                       type: string
 *                       required: false
 *                       example: ali_akbar
 *
 *    responses:
 *      200:
 *        description: Success
 */

router.put(
  '/:userId',
  UserValidator.update,
  UserValidator.validate,
  Controller.update
)

module.exports = router
