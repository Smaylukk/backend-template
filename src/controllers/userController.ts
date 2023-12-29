import { NextFunction, Request, Response } from 'express'
import ApiError from '../errors/ApiError'
import { checkValidationError } from '../validation/validation'
import { IUserDTO } from '../models/dto/UserDTO'
import AuthService from '../services/authService'

class UserController {
  async registration(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      checkValidationError(req)

      const { email, name, password } = req.body
      const tokens = await AuthService.registration(email, name, password)
      return res.status(200).json(tokens)
    } catch (error) {
      console.log(error)
      next(ApiError.badRequestError(error.message))
    }
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      checkValidationError(req)

      const { email, password } = req.body
      const tokens = await AuthService.login(email, password)
      return res.status(200).json(tokens)
    } catch (error) {
      console.log(error)
      next(ApiError.badRequestError(error.message))
    }
  }

  async check(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      checkValidationError(req)

      const user = req.session.user as IUserDTO
      const accessToken = await AuthService.check(user)
      return res.status(200).json({ accessToken })
    } catch (error) {
      next(ApiError.badRequestError(error.message))
    }
  }

  async refresh(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      checkValidationError(req)

      const { refreshToken } = req.body
      const accessToken = await AuthService.refreshAccessToken(refreshToken)
      return res.status(200).json({ accessToken })
    } catch (error) {
      next(ApiError.badRequestError(error.message))
    }
  }
}

export default new UserController()
