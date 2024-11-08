import path from 'node:path'
import process from 'node:process'
import swaggerJsDoc from 'swagger-jsdoc'
import config from './config'

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Next Nexus App',
    version: '1.0.0',
    description: 'Next Nexus App Api Documentation',
  },
  servers: [
    {
      url: `http://localhost:${process.env.BACKEND_PORT}/${config.api.baseRoute}/${config.api.version}`,
      description: 'Local development server',
    },
  ],
}

const options = {
  swaggerDefinition,
  apis: [path.join(__dirname, '../../**/*.ts')],
}

const swaggerSpec = swaggerJsDoc(options)

export default swaggerSpec
