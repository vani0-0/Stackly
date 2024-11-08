import type { ExpressRouter } from '@/types/express-types'
import RequestValidator from '@/middleware/validator'
import { LoginDTO } from '@/validators/auth.dto'
import { Router } from 'express'
import { AuthController } from '../controllers/auth.controller'
import { AuthService } from '../services/auth.service'

const auth: ExpressRouter = Router()
const controller = new AuthController(new AuthService())

/**
 * @swagger
 * /auth/login:
 *  post:
 *    summary: Log's in a user
 *    tags: [Auth]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#components/schemas/LoginDTO'
 *    responses:
 *      200:
 *        description: Succesful login
 *      401:
 *        description: Unauthorized
 *      500:
 *        description: Internal server error
 */
auth.route('/login').post(
  RequestValidator.validate(LoginDTO),
  controller.Login,
)

export default auth
