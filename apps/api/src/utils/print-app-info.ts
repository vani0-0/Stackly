import process from 'node:process'
import { Config } from '@/app'
import { AppLogger } from '.'

function printAppInfo(cpuCount: number = 1, workerCount: number = 1, processId: number | string = 'unknown', customMessage: string = '', customMessage2: string = '') {
  const ENV = process.env.NODE_ENV
  const PORT = process.env.BACKEND_PORT
  const API_URL = process.env.FRONTEND_BASE_URL
  const APP_URL = process.env.BACKEND_BASE_URL
  const DB_URL = process.env.DATABASE_URL

  AppLogger.info('-----------------------------------------------------------------')
  AppLogger.info('Server started succesfully.', 'Stackly')
  AppLogger.debug(ENV, 'Environment')
  AppLogger.debug(PORT, 'Port')
  AppLogger.debug(API_URL, 'API Url')
  AppLogger.debug(`/${Config.api.baseRoute}/${Config.api.version}`, 'API Base Route')
  AppLogger.debug(APP_URL, 'APP Url')
  AppLogger.debug(DB_URL, 'Database Url')
  AppLogger.info(processId, 'Process ID')
  AppLogger.info(cpuCount, 'CPU Count')
  AppLogger.info(workerCount, 'Worker Count')
  AppLogger.info(customMessage, 'Custom Message 1')
  AppLogger.info(customMessage2, 'Custom Message 2')
  AppLogger.info('-----------------------------------------------------------------')
}

export default printAppInfo
