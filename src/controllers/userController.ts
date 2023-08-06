import { Request, ResponseToolkit, ResponseObject } from 'hapi'
import boom from '@hapi/boom'
import { IUserDTO } from '../models/dto/UserDTO'
import AuthService from '../services/authService'
import {
  LoginPayload,
  RefreshPayload,
  RegistrationPayload,
} from '../interfaces'

class UserController {
  async registration(
    req: Request,
    h: ResponseToolkit,
  ): Promise<ResponseObject> {
    try {
      const { email, name, password } = req.payload as RegistrationPayload
      const tokens = await AuthService.registration(email, name, password)
      return h.response(tokens).code(200)
    } catch (error) {
      console.log(error)
      const boomError = boom.badRequest(error.message)
      return h
        .response(boomError.output.payload)
        .code(boomError.output.statusCode)
    }
  }

  async login(req: Request, h: ResponseToolkit): Promise<ResponseObject> {
    try {
      const { email, password } = req.payload as LoginPayload
      const tokens = await AuthService.login(email, password)
      return h.response(tokens).code(200)
    } catch (error) {
      console.log(error)
      const boomError = boom.badRequest(error.message)
      return h
        .response(boomError.output.payload)
        .code(boomError.output.statusCode)
    }
  }

  async check(req: Request, h: ResponseToolkit): Promise<ResponseObject> {
    try {
      const user = req.auth.credentials as IUserDTO
      const accessToken = await AuthService.check(user)
      return h.response({ accessToken }).code(200)
    } catch (error) {
      console.log(error)
      const boomError = boom.badRequest(error.message)
      return h
        .response(boomError.output.payload)
        .code(boomError.output.statusCode)
    }
  }

  async refresh(req: Request, h: ResponseToolkit): Promise<ResponseObject> {
    try {
      const { refreshToken } = req.payload as RefreshPayload
      const accessToken = await AuthService.refreshAccessToken(refreshToken)
      return h.response({ accessToken }).code(200)
    } catch (error) {
      console.log(error)
      const boomError = boom.badRequest(error.message)
      return h
        .response(boomError.output.payload)
        .code(boomError.output.statusCode)
    }
  }
}

export default new UserController()
