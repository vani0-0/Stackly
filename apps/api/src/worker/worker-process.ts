import process from 'node:process'
import createServer from '@/server'
import { AppLogger, Shutdown } from '@/utils'

function WorkerProcess(cpuCount: number): void {
  const server = createServer(cpuCount, process)
  server()

  process.on('SIGTERM', Shutdown)
  process.on('SIGINT', Shutdown)

  process.on('uncaughtException', (err) => {
    AppLogger.error(`Worker ${process.pid}: Uncaught Exception: ${err}`)
    Shutdown()
  })
}

export default WorkerProcess
