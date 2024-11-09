export function isUndefined(obj: any): obj is undefined {
  return typeof obj === 'undefined'
}

export function isObject(fn: any): fn is object {
  return !isNil(fn) && typeof fn === 'object'
}

export function isPlainObject(fn: any): fn is object {
  if (!isObject(fn)) {
    return false
  }
  const proto = Object.getPrototypeOf(fn)
  if (proto === null) {
    return true
  }
  const ctor
    = Object.prototype.hasOwnProperty.call(proto, 'constructor')
    && proto.constructor
  return (
    typeof ctor === 'function'
    && ctor instanceof ctor
    && Function.prototype.toString.call(ctor)
    === Function.prototype.toString.call(Object)
  )
}

export function addLeadingSlash(path?: string): string {
  return path && typeof path === 'string'
    ? path.charAt(0) !== '/'
      ? `/${path}`
      : path
    : ''
}

export function normalizePath(path?: string): string {
  return path
    ? path.startsWith('/')
      ? (`/${path.replace(/\/+$/, '')}`).replace(/\/+/g, '/')
      : `/${path.replace(/\/+$/, '')}`
    : '/'
}

export function stripEndSlash(path: string) {
  return path[path.length - 1] === '/' ? path.slice(0, path.length - 1) : path
}

export function isFunction(val: any): val is (...args: any[]) => any {
  return typeof val === 'function'
}
export const isString = (val: any): val is string => typeof val === 'string'
export const isNumber = (val: any): val is number => typeof val === 'number'
export const isConstructor = (val: any): boolean => val === 'constructor'
export function isNil(val: any): val is null | undefined {
  return isUndefined(val) || val === null
}
export const isEmpty = (array: any): boolean => !(array && array.length > 0)
export const isSymbol = (val: any): val is symbol => typeof val === 'symbol'
