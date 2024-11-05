import type {
  NextFunction as ExpressNextFunction,
  Request as ExpressRequest,
  Response as ExpressResponse,
  Router,
} from 'express'

export type Request = ExpressRequest
export type Response = ExpressResponse
export type NextFunction = ExpressNextFunction
export type ExpressRouter = Router
