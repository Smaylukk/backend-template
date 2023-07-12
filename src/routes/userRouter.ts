import { FastifyInstance } from 'fastify'
import userController from '../controllers/userController'
import { userLoginSchema, userRegisterSchema } from '../schema/userSchema'
import authPlugin from '../plugins/authPlugin'

export default async function userRouter(fastify: FastifyInstance) {
  fastify.post(
    '/reg',
    {
      schema: {
        body: userRegisterSchema,
      },
      attachValidation: true,
    },
    userController.registration,
  )
  fastify.post(
    '/login',
    {
      schema: {
        body: userLoginSchema,
      },
      attachValidation: true,
    },
    userController.login,
  )
  fastify.get('/auth', { preHandler: authPlugin }, userController.check)
  fastify.post('/refresh', userController.refresh)
}
