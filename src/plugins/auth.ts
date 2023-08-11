import boom from '@hapi/boom'
import { IUserDTO } from '../models/dto/UserDTO'

export const validateUser = (user: IUserDTO) => {
  if (!user) {
    return boom.unauthorized('Користувач не авторизований - токен пустий')
  }
  return { isValid: true, credentials: { ...user } }
}
