import process from 'node:process'
import { EnvironmentFile, Environments } from '@/enums/environment.enum'
import { Logger } from '@vani0-0/logger'
import { config } from 'dotenv'

if (process.env.NODE_ENV === Environments.DEV) {
  config({ path: EnvironmentFile.DEV })
  Logger.log('Loaded Development Environment Variables', 'Stackly')
}
else if (process.env.NODE_ENV === Environments.PROD) {
  config({ path: EnvironmentFile.PROD })
  Logger.log('Loaded Production Environment Variables', 'Stackly')
}

function validateEnv() {
  const requiredVariables = [
    'BACKEND_PORT',
    'FRONTEND_BASE_URL',
    'BACKEND_BASE_URL',
    'DATABASE_URL',
  ]

  const missingVariables = requiredVariables.filter(variable => !process.env[variable])
  if (missingVariables.length > 0) {
    Logger.error(`Missing required environment variables ${missingVariables.join(', ')}`)
    process.exit(1)
  }

  if (Number.isNaN(process.env.BACKEND_PORT)) {
    Logger.error('BACKEND_PORT must be a number')
    process.exit(1)
  }
  Logger.log('Environment variables are ready.')
}

validateEnv()
