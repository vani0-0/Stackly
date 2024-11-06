import type { Application, NextFunction, Request, Response } from 'express'
import router from '@/network'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import nocache from 'nocache'
import swaggerUI from 'swagger-ui-express'
import config from './config'
import swaggerSpec from './swagger'

class ExpressApp {
  public app: Application

  constructor() {
    this.app = express()
    this.Middleware()
    this.Routes()
    this.ErrorHandler()
  }

  private Middleware(): void {
    this.app.use(helmet())
    this.app.use(nocache())
    this.app.use(express.json())
    this.app.use(morgan('dev'))
    this.app.disable('x-powered-by')
    this.app.set('view engine', 'ejs')
    this.app.set('views', 'views')
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(cookieParser())
    this.app.set('trust proxy', 1)

    this.app.use(cors({ origin: true, credentials: true }))
  }

  private Routes(): void {
    this.app.use(`/${config.api.baseRoute}/${config.api.version}`, router)

    this.app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec, {
      customfavIcon: '/swagger-ui/custom-favicon.ico',
      customSiteTitle: 'Stackly',
      swaggerOptions: {
        docExpansion: 'none',
        displayRequestDuration: true,
        filter: true,
        operationsSorter: 'alpha',
        tagsSorter: 'alpha',
        tryItOutEnabled: true,
      },
    }))
  }

  private ErrorHandler(): void {
    this.app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
      res.status(500).send({ message: 'Internal Server Error', error })
      next()
    })
  }
}

export default ExpressApp
