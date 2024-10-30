import process from 'node:process'
import Logger from '@vani0-0/logger'

const logger = new Logger({ level: 'debug', showTimestamp: true })

async function main() {
  logger.debug('Server started')
  logger.info('Server started')
  logger.warn('Server started')
  logger.error('Server started')
}

main()
  .then(() => {
    process.exit(0)
  })
  .catch((error) => {
    logger.error(error)
    process.exit(1)
  })
