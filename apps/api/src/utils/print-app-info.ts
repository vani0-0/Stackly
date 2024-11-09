import process from 'node:process'
import { Environments } from '@/enums/environment.enum'
import { Logger } from '@vani0-0/logger'

function printAppInfo(cpuCount: number = 1, workerCount: number = 1, processId: number | string = 'Unknown', customMessage: string = '', customMessage2: string = ''): void {
  const env = process.env.NODE_ENV || Environments.DEV
  const port = process.env.BACKEND_PORT || 'Not set'
  const appUrl = process.env.FRONTEND_BASE_URL || 'Not set'
  const apiUrl = process.env.BACKEND_BASE_URL || 'Not set'
  const redisUrl = process.env.REDIS_URL || 'Not set'
  const dbUrl = process.env.DATABASE_URL || 'Not set'

  Logger.log('--------------------------------------------------------------')
  Logger.log('Server is running successfully...')
  Logger.debug(env, 'Env')
  Logger.debug(port, 'Port')
  Logger.debug(apiUrl, 'Server URL')
  Logger.debug(appUrl, 'Client URL')
  Logger.debug(redisUrl, 'Redis URL')
  Logger.debug(dbUrl, 'Database URL')
  Logger.log(processId, 'Process ID')
  Logger.log(cpuCount, 'CPU Count ')
  Logger.log(workerCount, 'Worker Count')
  Logger.log(customMessage)
  Logger.log(customMessage2)
  Logger.log('--------------------------------------------------------------')
}

export default printAppInfo
