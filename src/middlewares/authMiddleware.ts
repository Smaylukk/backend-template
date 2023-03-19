import { NextFunction, Request, Response } from 'express'
import ApiError from '../errors/ApiError'
import jwtService from '../services/jwtService'

export default (req: Request, res: Response, next: NextFunction) => {
  if (req.method === 'OPTIONS') {
    return next()
  }

  try {
    const { authorization } = req.headers
    if (!authorization || authorization.indexOf('Bearer') === -1) {
      return next(
        ApiError.unauthorizedError(
          'Користувач не авторизований - відсутній токен',
        ),
      )
    }

    const token = authorization.split(' ')[1]
    if (!token) {
      return next(
        ApiError.unauthorizedError(
          'Користувач не авторизований - токен пустий',
        ),
      )
    }

    req.body.user = jwtService.verifyToken(token)
    next()
  } catch (error) {
    return next(
      ApiError.unauthorizedError(`Помилка авторизації - ${error.message}`),
    )
  }
}
