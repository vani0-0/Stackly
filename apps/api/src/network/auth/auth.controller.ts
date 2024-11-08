import type { NextFunction, Request, Response } from 'express'
import type { AuthService } from './auth.service'

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  public Login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const auth = await this.authService.login()
    }
    catch (error) {
      res.status(error.status).json({ message: error.message })
    }
  }
}
