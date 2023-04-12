import { Next, Context } from 'koa'
import ApiError from '../errors/ApiError'
import jwtService from '../services/jwtService'

export default async (ctx: Context, next: Next) => {
  if (ctx.method === 'OPTIONS') {
    return next()
  }

  const { authorization } = ctx.headers
  if (!authorization || authorization.indexOf('Bearer') === -1) {
    throw ApiError.unauthorizedError('Користувач не авторизований - відсутній токен')
  }

  const token = authorization.split(' ')[1]
  if (!token) {
    throw ApiError.unauthorizedError('Користувач не авторизований - токен пустий')
  }
  try {
    ctx.state.user = jwtService.verifyToken(token)
    return next()
  } catch (error) {
    throw ApiError.unauthorizedError(`Помилка авторизації - ${error.message}`)
  }
}
