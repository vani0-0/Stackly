import type { ExpressRouter } from '@/types/express-types'
import { Router } from 'express'
import { TestController } from '../controllers/test.controller'
import { TestService } from '../services/test.service'

const test: ExpressRouter = Router()
const controller = new TestController(new TestService())
/**
 * @swagger
 * /test:
 *  get:
 *    summary: Gets a message
 *    tags: [Test]
 *    responses:
 *      200:
 *        description: Succesful login
 *      401:
 *        description: Unauthorized
 *      500:
 *        description: Internal server error
 */
test.route('/').get(controller.test)

export default test
