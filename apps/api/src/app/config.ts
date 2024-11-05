import process from 'node:process'

export const ENV = process.env.NODE_ENV || 'development'
export const PORT = process.env.PORT || 'Not set'
export const APP_URL = process.env.BACKEND_BASE_URL || 'Not set'
export const API_URL = process.env.FRONTEND_BASE_URL || 'Not set'
export const DB_URL = process.env.DATABASE_URL || 'Not set'

interface IAppConfig {
  api: {
    baseRoute: string
    version: string
  }
  docs: {
    swaggerUIPath: string
    apiDocsPath: string
  }
}

class AppConfig {
  public api: IAppConfig['api']
  public docs: IAppConfig['docs']

  constructor() {
    this.api = {
      baseRoute: 'api',
      version: 'v1',
    }
    this.docs = {
      swaggerUIPath: '/v1/swagger',
      apiDocsPath: '/v1/api-docs',
    }
  }
}

const config = new AppConfig()

export default config
