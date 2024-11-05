import type { Application, NextFunction, Request, Response } from 'express'
import router from '@/network'
import express from 'express'
import swaggerUI from 'swagger-ui-express'
import config from './config'

class ExpressApp {
  public app: Application

  constructor() {
    this.app = express()
    this.Middleware()
    this.Routes()
    this.ErrorHandler()
  }

  private Middleware(): void {

  }

  private Routes(): void {
    this.app.use(`/${config.api.baseRoute}/${config.api.version}`, router)

    this.app.use('/api-docs', swaggerUI.serve, swaggerUI.setup())
  }

  private ErrorHandler(): void {
    this.app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
      res.status(500).send({ message: 'Internal Server Error', error })
      next()
    })
  }
}

export default ExpressApp
