export interface LoggerOptions {
  showTimestamp: boolean
  level: LogLevel
}

export type LogLevel = 'info' | 'debug' | 'warn' | 'error'
