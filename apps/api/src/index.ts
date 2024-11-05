import cluster from 'node:cluster'
import { availableParallelism } from 'node:os'
import { PrimaryProcess, WorkerProcess } from './worker'
import 'dotenv/config'

const cpuCount = availableParallelism()

if (cluster.isPrimary) {
  PrimaryProcess(cpuCount, cluster)
}
else {
  WorkerProcess(cpuCount)
}
