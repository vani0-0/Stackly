import process from 'node:process'
import { AppLogger, disconnectPrisma } from '@/lib'

async function Shutdown(): Promise<void> {
  AppLogger.info('App Shutting down...', `Worker ${process.pid}`)
  try {
    await disconnectPrisma()
    AppLogger.info('Prisma disconnected', `Worker ${process.pid}`)
    process.exit(0)
  }
  catch (err) {
    AppLogger.error(`Error during shutdown: ${err}`, `Worker ${process.pid}`)
    process.exit(1)
  }
}
export default Shutdown
