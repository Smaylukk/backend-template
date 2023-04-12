import { Context } from 'koa'
import ApiError from '../errors/ApiError'
import { IUserDTO } from '../models/dto/UserDTO'
import AuthService from '../services/authService'

class UserController {
  async registration(ctx: Context) {
    try {
      const { email, name, password } = ctx.request.body as { email: string; name: string; password: string }
      const tokens = await AuthService.registration(email, name, password)
      ctx.status = 200
      ctx.body = tokens
    } catch (error) {
      const mes = !error.errors ? error.message : error.errors.map((item) => JSON.stringify(item)).join(', ')
      throw ApiError.badRequestError(mes)
    }
  }

  async login(ctx: Context) {
    try {
      const { email, password } = ctx.request.body as { email: string; password: string }
      const tokens = await AuthService.login(email, password)
      ctx.status = 200
      ctx.body = tokens
    } catch (error) {
      console.log(error)
      const mes = !error.errors ? error.message : error.errors.map((item) => JSON.stringify(item)).join(', ')
      throw ApiError.badRequestError(mes)
    }
  }

  async check(ctx: Context) {
    try {
      const user = ctx.state.user as IUserDTO
      const accessToken = await AuthService.check(user)
      ctx.status = 200
      ctx.body = { accessToken }
    } catch (error) {
      const mes = !error.errors ? error.message : error.errors.map((item) => JSON.stringify(item)).join(', ')
      throw ApiError.badRequestError(mes)
    }
  }

  async refresh(ctx: Context) {
    try {
      const { refreshToken } = ctx.request.body as { refreshToken: string }
      const accessToken = await AuthService.refreshAccessToken(refreshToken)
      ctx.status = 200
      ctx.body = { accessToken }
    } catch (error) {
      const mes = !error.errors ? error.message : error.errors.map((item) => JSON.stringify(item)).join(', ')
      throw ApiError.badRequestError(mes)
    }
  }
}

export default new UserController()