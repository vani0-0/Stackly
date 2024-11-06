import process from 'node:process'
import { disconnectPrisma } from '@vani0-0/database'
import logger from './app-logger'

async function Shutdown() {
  logger.info(`Worker ${process.pid}: Shutting down gracefully...`, 'Stackly API')
  try {
    await disconnectPrisma()
    logger.info(`Worker ${process.pid}: Prisma Disconnected`, 'Stackly API')
    process.exit(0)
  }
  catch (err) {
    logger.error(`Error during shutdown: ${err}`, `Worker ${process.pid}`)
    process.exit(1)
  }
}

export default Shutdown
