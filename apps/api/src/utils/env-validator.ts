import process from 'node:process'
import { EnvironmentFile, Environments } from '@/enums/environment.enum'
import { config } from 'dotenv'
import { AppLogger } from '.'

if (process.env.NODE_ENV === Environments.DEV) {
  config({ path: EnvironmentFile.DEV })
  AppLogger.info('Loaded Development Environment Variables')
}

else if (process.env.NODE_ENV === Environments.PRODUCTION) {
  config({ path: EnvironmentFile.PRODUCTION })
  AppLogger.info('Loaded Production Environment Variables')
}

function validateEnvironment() {
  const requiredVariables = ['BACKEND_PORT', 'FRONTEND_BASE_URL', 'BACKEND_BASE_URL', 'DATABASE_URL']

  const missingVariables = requiredVariables.filter(variable => !process.env[variable])

  if (missingVariables.length > 0) {
    AppLogger.error(`Missing required environment variables: ${missingVariables.join(', ')}`)
    process.exit(1)
  }

  if (Number.isNaN(Number(process.env.BACKEND_PORT))) {
    AppLogger.error('BACKEND_PORT must be a number')
    process.exit(1)
  }
}

validateEnvironment()
