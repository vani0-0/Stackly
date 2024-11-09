import { ConsoleLogger } from './services/console-logger.service'
import { isLogLevelEnabled } from './utils'

export type LoggerFn = (message: any, ...optionalParams: any[]) => any

export type LogLevel = 'log' | 'error' | 'warn' | 'debug' | 'verbose' | 'fatal'

export interface LoggerService {
  log: LoggerFn
  error: LoggerFn
  warn: LoggerFn
  debug?: LoggerFn
  verbose?: LoggerFn
  fatal?: LoggerFn
}

const DEFAULT_LOGGER = new ConsoleLogger()

const dateTimeFormatter = new Intl.DateTimeFormat(undefined, {
  year: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  day: '2-digit',
  month: '2-digit',
})

export class Logger implements LoggerService {
  protected static staticInstanceRef?: LoggerService = DEFAULT_LOGGER
  protected static logLevels?: LogLevel[]

  protected localInstanceRef?: LoggerService

  constructor()
  constructor(context: string)
  constructor(context: string, options?: { timestamp?: boolean })
  constructor(protected context?: string, protected options: { timestamp?: boolean } = {}) {}

  get localInstance(): LoggerService {
    if (Logger.staticInstanceRef === DEFAULT_LOGGER) {
      return this.registerLocalInstanceRef()
    }
    else if (Logger.staticInstanceRef instanceof Logger) {
      const prototype: LoggerService = Object.getPrototypeOf(Logger.staticInstanceRef)
      if (prototype.constructor === Logger) {
        return this.registerLocalInstanceRef()
      }
    }
    return Logger.staticInstanceRef as LoggerService
  }

  log(message: any, context?: string): void
  log(message: any, ...optionalParams: [...any, string?]): void
  log(message: any, ...optionalParams: any[]) {
    this.localInstanceRef?.log?.(message, ...optionalParams)
  }

  error(message: any, context?: string): void
  error(message: any, ...optionalParams: [...any, string?]): void
  error(message: any, ...optionalParams: any[]) {
    this.localInstanceRef?.error?.(message, ...optionalParams)
  }

  warn(message: any, context?: string): void
  warn(message: any, ...optionalParams: [...any, string?]): void
  warn(message: any, ...optionalParams: any[]) {
    this.localInstanceRef?.warn?.(message, ...optionalParams)
  }

  debug(message: any, context?: string): void
  debug(message: any, ...optionalParams: [...any, string?]): void
  debug(message: any, ...optionalParams: any[]) {
    this.localInstanceRef?.debug?.(message, ...optionalParams)
  }

  verbose(message: any, context?: string): void
  verbose(message: any, ...optionalParams: [...any, string?]): void
  verbose(message: any, ...optionalParams: any[]) {
    this.localInstanceRef?.verbose?.(message, ...optionalParams)
  }

  fatal(message: any, context?: string): void
  fatal(message: any, ...optionalParams: [...any, string?]): void
  fatal(message: any, ...optionalParams: any[]) {
    this.localInstanceRef?.fatal?.(message, ...optionalParams)
  }

  static log(message: any, context?: string): void
  static log(message: any, ...optionalParams: [...any, string?]): void
  static log(message: any, ...optionalParams: any[]) {
    this.staticInstanceRef?.log?.(message, ...optionalParams)
  }

  static error(message: any, context?: string): void
  static error(message: any, ...optionalParams: [...any, string?]): void
  static error(message: any, ...optionalParams: any[]) {
    this.staticInstanceRef?.error?.(message, ...optionalParams)
  }

  static warn(message: any, context?: string): void
  static warn(message: any, ...optionalParams: [...any, string?]): void
  static warn(message: any, ...optionalParams: any[]) {
    this.staticInstanceRef?.warn?.(message, ...optionalParams)
  }

  static debug(message: any, context?: string): void
  static debug(message: any, ...optionalParams: [...any, string?]): void
  static debug(message: any, ...optionalParams: any[]) {
    this.staticInstanceRef?.debug?.(message, ...optionalParams)
  }

  static verbose(message: any, context?: string): void
  static verbose(message: any, ...optionalParams: [...any, string?]): void
  static verbose(message: any, ...optionalParams: any[]) {
    this.staticInstanceRef?.verbose?.(message, ...optionalParams)
  }

  static fatal(message: any, context?: string): void
  static fatal(message: any, ...optionalParams: [...any, string?]): void
  static fatal(message: any, ...optionalParams: any[]) {
    this.staticInstanceRef?.fatal?.(message, ...optionalParams)
  }

  static getTimestamp() {
    return dateTimeFormatter.format(Date.now())
  }

  static isLevelEnabled(level: LogLevel): boolean {
    const logLevels = Logger.logLevels
    return isLogLevelEnabled(level, logLevels)
  }

  private registerLocalInstanceRef(): LoggerService {
    if (this.localInstanceRef) {
      return this.localInstanceRef
    }
    this.localInstanceRef = new ConsoleLogger(this.context as string, { timestamp: this.options?.timestamp, logLevels: Logger.logLevels })
    return this.localInstanceRef
  }
}
