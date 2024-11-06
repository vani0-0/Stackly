import cluster from 'node:cluster'
import { availableParallelism } from 'node:os'
import { PrimaryProcess, WorkerProcess } from './worker'

const cpuCount = availableParallelism()

if (cluster.isPrimary) {
  PrimaryProcess(cpuCount, cluster)
}
else {
  WorkerProcess(cpuCount)
}
