import type { Options } from 'swagger-jsdoc'
import path from 'node:path'
import swaggerJSDoc from 'swagger-jsdoc'
import config, { PORT } from './config'

const options: Options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Stackly',
      version: '0.0.1',
      description: '',
    },
    servers: [
      {
        url: `http://localhost:${PORT}/${config.api.baseRoute}/${config.api.version}`,
        description: 'Local development server',
      },
    ],
  },
  apis: [path.join(__dirname, '../../**/*.ts')],
}

const swaggerSpec = swaggerJSDoc(options)

export default swaggerSpec
