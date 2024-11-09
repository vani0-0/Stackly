import process from 'node:process'
import { disconnectPrisma } from '@/lib'
import { Logger } from '@vani0-0/logger'

async function Shutdown(): Promise<void> {
  Logger.verbose('App Shutting down...', `Worker ${process.pid}`)
  try {
    await disconnectPrisma()
    Logger.verbose('Prisma disconnected', `Worker ${process.pid}`)
    process.exit(0)
  }
  catch (err) {
    Logger.error(`Error during shutdown: ${err}`, `Worker ${process.pid}`)
    process.exit(1)
  }
}
export default Shutdown
