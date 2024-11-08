import type { NextFunction, Request, Response } from '@/types/express-types'
import { HttpBadRequestError } from '@/lib/error'
import { type ClassConstructor, plainToInstance } from 'class-transformer'
import { validate } from 'class-validator'

class RequestValidator {
  static validate = <T>(classInstance: ClassConstructor<T>) => {
    return async (req: Request, _res: Response, next: NextFunction) => {
      const validationErrorText = 'Request validation failed!'
      try {
        const convertedObject = plainToInstance(classInstance, req.body)
        const errors = await validate(
          convertedObject as Record<string, unknown>,
        )
        if (errors.length === 0) {
          next()
          return
        }
        const rawErrors: string[] = [
          ...new Set([
            ...errors.flatMap(error =>
              Object.values(error.constraints ?? []),
            ),
          ]),
        ]

        next(new HttpBadRequestError(validationErrorText, rawErrors))
      }
      catch (e) {
        next(new HttpBadRequestError(validationErrorText, [e.message]))
      }
    }
  }
}

export default RequestValidator
