import type { ExpressRouter } from '@/types/express-types'
import { Router } from 'express'
import { auth } from './routes'

const router: ExpressRouter = Router()

router.use('/auth', auth)

export default router
