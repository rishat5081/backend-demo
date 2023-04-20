'use strict'
const router = require('express').Router()
const Controller = require('../../../../controller/api/v1/user/posts.controller')
const PostValidator = require('../../../../validator/post.validator')

/**
 * @swagger
 * /api/posts:
 *  post:
 *    tags:
 *      - Posts
 *    description: add posts
 *    parameters:
 *      - description: user can add posts
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
 *                     userId:
 *                       type: string
 *                       required: true
 *                       example: 123456789876345223
 *                     title:
 *                       type: string
 *                       example: 1
 *                     content:
 *                       type: string
 *                       example: 1
 *    responses:
 *      200:
 *        description: Success
 */
router.post('/', PostValidator.body, PostValidator.validate, Controller.create)

/**
 * @swagger
 * /api/posts/{postId}:
 *  get:
 *    tags:
 *      - Posts
 *    description: Get User Details
 *    parameters:
 *      - name: postId
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
  '/:postId',
  PostValidator.show,
  PostValidator.validate,
  Controller.show
)

/**
 * @swagger
 * /api/posts/{postId}:
 *  put:
 *    tags:
 *      - Posts
 *    description: update user record
 *    parameters:
 *      - name: postId
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
 *                     userId:
 *                       type: string
 *                       required: true
 *                       example: 123456789876345223
 *                     title:
 *                       type: string
 *                       example: 1
 *                     content:
 *                       type: string
 *                       example: 1
 *
 *    responses:
 *      200:
 *        description: Success
 */

router.put(
  '/:postId',
  PostValidator.show,
  PostValidator.update,
  PostValidator.validate,
  Controller.update
)

module.exports = router
