import process from 'node:process'
import { Environments } from '@/enums/environment.enum'
import { Logger } from '@vani0-0/logger'

const logger = new Logger({ level: process.env.NODE_ENV === Environments.DEV ? 'debug' : 'info', showTimestamp: true })

export default logger
