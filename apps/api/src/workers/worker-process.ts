import process from 'node:process'
import { createServer } from '@/app'
import swaggerSpec from '@/app/swagger'
import Shutdown from '@/utils/shutdown'
import { Logger } from '@vani0-0/logger'

function WorkerProcess(cpuCount: number): void {
  const server = createServer(cpuCount, process)
  server()

  process.on('SIGTERM', Shutdown)
  process.on('SIGINT', Shutdown)

  process.on('uncaughtException', (err) => {
    Logger.error(`Uncaught Exception: ${err}`, `Worker ${process.pid}`)
    Shutdown()
  })
}

export default WorkerProcess
