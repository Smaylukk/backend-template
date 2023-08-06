import { Request, ResponseToolkit } from 'hapi'
import boom from '@hapi/boom'
import { IUserDTO } from '../models/dto/UserDTO'

export const validateUser = (user: IUserDTO, req: Request, h: ResponseToolkit) => {
  if (!user) {
    return boom.unauthorized('Користувач не авторизований - токен пустий')
  }
  return { isValid: true, credentials: { ...user } }
}
