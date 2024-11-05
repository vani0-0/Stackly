import type { Cluster } from 'node:cluster'
import { parse } from 'node:path'
import process from 'node:process'
import logger, { printAppInfo } from '@/utils/appLogger'

function PrimaryProcess(cpuCount: number, cluster: Cluster): void {
  printAppInfo(cpuCount, cpuCount, process.pid, `Primary ${process.pid}, is running`)

  for (let i = 0; i < cpuCount; i++) {
    cluster.fork()
  }

  cluster.on('exit', (worker, code, signal) => {
    logger.info(
      `Worker ${worker.process.pid} has exited with code ${code} and signal ${signal}`,
    )

    logger.info('Starting a new worker...')
    cluster.fork()
  })
}

export default PrimaryProcess
