import { ServerRoute } from '@hapi/hapi'
import userController from '../controllers/userController'
import { userLoginSchema, userRegisterSchema } from '../schema/userSchema'
import validation from '../validation/validation'

export const userRegister: ServerRoute = {
  method: 'POST',
  path: '/api/user/reg',
  handler: userController.registration,
  options: {
    description: 'register user',
    validate: {
      payload: userRegisterSchema,
      failAction: validation,
    },
  },
}
export const userLogin: ServerRoute = {
  method: 'POST',
  path: '/api/user/login',
  handler: userController.login,
  options: {
    description: 'login user',
    validate: {
      payload: userLoginSchema,
      failAction: validation,
    },
  },
}
export const userCheckToken: ServerRoute = {
  method: 'GET',
  path: '/api/user/auth',
  handler: userController.check,
  options: {
    description: 'check auth token',
    auth: 'jwt',
  },
}
export const userRefreshToken: ServerRoute = {
  method: 'POST',
  path: '/api/user/refresh',
  handler: userController.refresh,
}
