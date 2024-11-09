import http from 'node:http'
import { connectPrisma, disconnectPrisma } from '@/lib'
import printAppInfo from '@/utils/print-app-info'
import { Logger } from '@vani0-0/logger'
import ExpressApp from './express'
import '@/utils/env-validator'

const expressApp = new ExpressApp()
const main = expressApp.app
const server = http.createServer(main)

function createServer(cpuCount: number, process: NodeJS.Process): () => Promise<void> {
  return async () => {
    try {
      await connectPrisma()

      server.listen(process.env.BACKEND_PORT, () => {
        printAppInfo(cpuCount, cpuCount, process.pid, `Worker ${process.pid}: Prisma and Redis Connected`, `Worker ${process.pid}: Server started on port ${process.env.BACKEND_PORT}`)
      })
    }
    catch (err) {
      Logger.error(`Connection failed: ${err}`, `Worker ${process.pid}`)
      await disconnectPrisma()
      process.exit(1)
    }
  }
}

export { createServer }
