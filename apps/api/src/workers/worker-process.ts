import process from 'node:process'
import { createServer } from '@/app'
import { AppLogger } from '@/lib'
import Shutdown from '@/utils/shutdown'

function WorkerProcess(cpuCount: number): void {
  const server = createServer(cpuCount, process)
  server()

  process.on('SIGTERM', Shutdown)
  process.on('SIGINT', Shutdown)

  process.on('uncaughtException', (err) => {
    AppLogger.error(`Uncaught Exception: ${err}`, `Worker ${process.pid}`)
    Shutdown()
  })
}

export default WorkerProcess