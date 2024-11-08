import process from 'node:process'
import { Environments } from '@/enums/environment.enum'
import { AppLogger } from '@/lib'

function printAppInfo(cpuCount: number = 1, workerCount: number = 1, processId: number | string = 'Unknown', customMessage: string = '', customMessage2: string = ''): void {
  const env = process.env.NODE_ENV || Environments.DEV
  const port = process.env.BACKEND_PORT || 'Not set'
  const appUrl = process.env.FRONTEND_BASE_URL || 'Not set'
  const apiUrl = process.env.BACKEND_BASE_URL || 'Not set'
  const redisUrl = process.env.REDIS_URL || 'Not set'
  const dbUrl = process.env.DATABASE_URL || 'Not set'

  AppLogger.info('--------------------------------------------------------------')
  AppLogger.info('Server is running successfully...')
  AppLogger.debug(env, 'Env')
  AppLogger.debug(port, 'Port')
  AppLogger.debug(apiUrl, 'Server URL')
  AppLogger.debug(appUrl, 'Client URL')
  AppLogger.debug(redisUrl, 'Redis URL')
  AppLogger.debug(dbUrl, 'Database URL')
  AppLogger.info(processId, 'Process ID')
  AppLogger.info(cpuCount, 'CPU Count ')
  AppLogger.info(workerCount, 'Worker Count')
  AppLogger.info(customMessage)
  AppLogger.info(customMessage2)
  AppLogger.info('--------------------------------------------------------------')
}

export default printAppInfo
