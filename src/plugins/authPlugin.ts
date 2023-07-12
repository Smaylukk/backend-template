import { preHandlerHookHandler } from 'fastify'
import ApiError from '../errors/ApiError'
import jwtService from '../services/jwtService'
import { IUserDTO } from '../models/dto/UserDTO'
import { IUserRequest } from '../interfaces'

const authPlugin: preHandlerHookHandler = (req: IUserRequest, reply, done) => {
  if (req.method === 'OPTIONS') {
    done()
  }

  const { authorization } = req.headers
  if (!authorization || authorization.indexOf('Bearer') === -1) {
    done(ApiError.unauthorizedError('Користувач не авторизований - відсутній токен'))
  }

  const token = authorization.split(' ')[1]
  if (!token) {
    done(ApiError.unauthorizedError('Користувач не авторизований - токен пустий'))
  }
  try {
    req.user = jwtService.verifyToken(token) as IUserDTO
    done()
  } catch (error) {
    done(ApiError.unauthorizedError(`Помилка авторизації - ${error.message}`))
  }
}

export default authPlugin
