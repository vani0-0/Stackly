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
