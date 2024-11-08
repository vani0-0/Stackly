import type { ExpressRouter } from '@/types/express-types'
import { Router } from 'express'
import { auth, test } from './routes'

const router: ExpressRouter = Router()

router.use('/auth', auth)
router.use('/test', test)

export default router
