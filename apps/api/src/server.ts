import http from 'node:http'
import { AppLogger, PrintAppInfo } from '@/utils'
import { connectPrisma, disconnectPrisma } from '@vani0-0/database'
import { ExpressApp } from './app'
import { PORT } from './app/config'

const expressServer = new ExpressApp()
const app = expressServer.app
const server = http.createServer(app)

function createServer(cpuCount: number, process: NodeJS.Process): () => Promise<void> {
  return async () => {
    try {
      await connectPrisma()

      server.listen(PORT, () => {
        PrintAppInfo(cpuCount, cpuCount, process.pid, `Worker ${process.pid}: Prisma and Redis Connected`, `Worker ${process.pid}: Server started on port ${PORT}`)
      })
    }
    catch (error) {
      AppLogger.error(error, `Worker ${process.pid}: Connection failed`)
      await disconnectPrisma()
      process.exit(1)
    }
  }
}

export default createServer
