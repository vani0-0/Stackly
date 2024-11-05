/* eslint-disable no-console */
import type { LoggerOptions, LogLevel } from './types.js'
import kleur from 'kleur'

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

  private formatMessage(level: LogLevel, message: any, title?: string): string {
    const timestamp = this.options.showTimestamp ? `[${this.getTimestamp()}]` : ''
    const levelStr = `[${level.toUpperCase()}]`
    const titleStr = title ? `${kleur.bold(title)}: ` : '' // Apply bold to title if provided

    return `${timestamp} ${levelStr} ${titleStr}${message}`
  }

  log(level: LogLevel, message: any, title?: string): void {
    if (!this.shouldLog(level))
      return

    const output = this.formatMessage(level, message, title)

    switch (level) {
      case 'info':
        console.log(kleur.green(output))
        break
      case 'warn':
        console.warn(kleur.yellow(output))
        break
      case 'error':
        console.error(kleur.red(output))
        break
      case 'debug':
        console.debug(kleur.gray(output))
        break
      default:
        console.log(output)
    }
  }

  info(message: any, title?: string) {
    this.log('info', message, title)
  }

  warn(message: any, title?: string) {
    this.log('warn', message, title)
  }

  error(message: any, title?: string) {
    this.log('error', message, title)
  }

  debug(message: any, title?: string) {
    this.log('debug', message, title)
  }
}

export default Logger
