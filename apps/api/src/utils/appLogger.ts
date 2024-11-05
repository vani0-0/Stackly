import config, { API_URL, APP_URL, DB_URL, ENV, PORT } from '@/app/config'
import { Logger } from '@vani0-0/logger'

const logger = new Logger({
  level: ENV === 'development' ? 'debug' : 'info',
  showTimestamp: true,
})

function printAppInfo(cpuCount: number = 1, workerCount: number = 1, processId: number | string = 'unknown', customMessage: string = '', customMessage2: string = '') {
  logger.info('-----------------------------------------------------------------')
  logger.debug(ENV, 'Environment')
  logger.debug(PORT, 'Port')
  logger.debug(API_URL, 'API Url')
  logger.debug(`/${config.api.baseRoute}/${config.api.version}`, 'API Base Route')
  logger.debug(APP_URL, 'APP Url')
  logger.debug(DB_URL, 'Database Url')
  logger.info(processId, 'Process ID')
  logger.info(cpuCount, 'CPU Count')
  logger.info(workerCount, 'Worker Count')
  logger.info(customMessage, 'Custom Message 1')
  logger.info(customMessage2, 'Custom Message 2')
  logger.info('-----------------------------------------------------------------')
}

export { printAppInfo }

export default logger
