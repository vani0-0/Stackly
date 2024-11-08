import type { ExpressRouter } from '@/types/express-types'
import { Router } from 'express'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

const auth: ExpressRouter = Router()
const controller = new AuthController(new AuthService())

auth.route('/login').post(controller.Login)

export default auth
