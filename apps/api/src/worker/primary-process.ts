import type { Cluster } from 'node:cluster'
import process from 'node:process'
import { AppLogger, PrintAppInfo } from '@/utils'

function PrimaryProcess(cpuCount: number, cluster: Cluster): void {
  PrintAppInfo(cpuCount, cpuCount, process.pid, `Primary ${process.pid}, is running`)

  for (let i = 0; i < cpuCount; i++) {
    cluster.fork()
  }

  cluster.on('exit', (worker, code, signal) => {
    AppLogger.info(
      `Worker ${worker.process.pid} has exited with code ${code} and signal ${signal}`,
    )

    AppLogger.info('Starting a new worker...')
    cluster.fork()
  })
}

export default PrimaryProcess
