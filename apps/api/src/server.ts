import http from 'node:http'
import { AppLogger } from '@/utils/index'
import { connectPrisma, disconnectPrisma } from '@vani0-0/database'
import { ExpressApp } from './app'
import { PORT } from './app/config'
import { printAppInfo } from './utils/appLogger'

const expressServer = new ExpressApp()
const app = expressServer.app
const server = http.createServer(app)

function createServer(cpuCount: number, process: NodeJS.Process) {
  return async () => {
    try {
      await connectPrisma()

      server.listen(PORT, () => {
        printAppInfo(cpuCount, cpuCount, process.pid, `Worker ${process.pid}: Prisma and Redis Connected`, `Worker ${process.pid}: Server started on port ${PORT}`)
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
