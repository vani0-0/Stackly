import { ENV } from '@/app/config'
import { Logger } from '@vani0-0/logger'

const logger = new Logger({
  level: ENV === 'development' ? 'debug' : 'info',
  showTimestamp: true,
})

export default logger
