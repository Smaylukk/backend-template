import { FastifyRequest, FastifyReply } from 'fastify'
import ApiError from '../errors/ApiError'
import { IUserDTO } from '../models/dto/UserDTO'
import AuthService from '../services/authService'
import { IUserRequest, LoginPayload, RegistrationPayload } from '../interfaces'
import { checkValidationError } from '../validation/validation'

class UserController {
  async registration(request: FastifyRequest<{ Body: RegistrationPayload }>, res: FastifyReply) {
    try {
      checkValidationError(request)

      const { email, name, password } = request.body
      const tokens = await AuthService.registration(email, name, password)
      res.status(200).send(tokens)
    } catch (error) {
      console.log(error)
      throw ApiError.badRequestError(error.message)
    }
  }

  async login(request: FastifyRequest<{ Body: LoginPayload }>, res: FastifyReply) {
    try {
      checkValidationError(request)

      const { email, password } = request.body
      const tokens = await AuthService.login(email, password)
      res.status(200).send(tokens)
    } catch (error) {
      console.log(error)
      throw ApiError.badRequestError(error.message)
    }
  }

  async check(request: IUserRequest, res: FastifyReply) {
    try {
      checkValidationError(request)

      const user = request.user as IUserDTO
      const accessToken = await AuthService.check(user)
      res.status(200).send({ accessToken })
    } catch (error) {
      console.log(error)
      throw ApiError.badRequestError(error.message)
    }
  }

  async refresh(request: FastifyRequest<{ Body: { refreshToken: string } }>, res: FastifyReply) {
    try {
      checkValidationError(request)

      const { refreshToken } = request.body
      const accessToken = await AuthService.refreshAccessToken(refreshToken)
      res.status(200).send({ accessToken })
    } catch (error) {
      console.log(error)
      throw ApiError.badRequestError(error.message)
    }
  }
}

export default new UserController()
