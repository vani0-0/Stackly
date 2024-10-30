import chalk from "chalk"
import { LoggerOptions, LogLevel } from "./types"

const defaultOptions: LoggerOptions = {
  showTimestamp: true,
  level: 'info',
}

class Logger {
  private options: LoggerOptions

  constructor(options?: LoggerOptions) {
    this.options = { ...defaultOptions, ...options }
  }

  private getTimestamp(): string {
    return new Date().toISOString()
  }

  private shouldLog(level: LogLevel): boolean {
    const levels: LogLevel[] = ['debug', 'info', 'warn', 'error']
    return levels.indexOf(level) >= levels.indexOf(this.options.level || 'info')
  }

  private formatMessage(level: LogLevel, message: any): string {
    const timestamp = this.options.showTimestamp ? `[${this.getTimestamp()}]` : ''
    const levelStr = `[${level.toUpperCase()}]`

    return `${timestamp} ${levelStr}: ${message}`
  }

  log(level: LogLevel, message: any): void {
    if (!this.shouldLog(level))
      return

    const output = this.formatMessage(level, message)

    switch (level) {
      case 'info':
        console.log(chalk.blue(output))
        break
      case 'warn':
        console.warn(chalk.yellow(output))
        break
      case 'error':
        console.error(chalk.red(output))
        break
      case 'debug':
        console.debug(chalk.gray(output))
        break
      default:
        console.log(output)
    }
  }

  info(message: any) {
    this.log('info', message)
  }

  warn(message: any) {
    this.log('warn', message)
  }

  error(message: any) {
    this.log('error', message)
  }

  debug(message: any) {
    this.log('debug', message)
  }
}

export default Logger