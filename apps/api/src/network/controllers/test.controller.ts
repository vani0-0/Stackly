import type { NextFunction, Request, Response } from 'express'
import type { TestService } from '../services/test.service'
import Api from '@/lib/api'
import { HttpInternalServerError } from '@/lib/error'
import { HttpStatusCode } from 'axios'

export class TestController extends Api {
  constructor(private readonly testService: TestService) {
    super()
  }

  async test(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const message = this.testService.testGet()
      this.send(res, message, HttpStatusCode.Ok, 'Message')
    }
    catch {
      next(new HttpInternalServerError('Failed to get all users'))
    }
  }
}
