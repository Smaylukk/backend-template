import { FastifyInstance } from 'fastify'
import authPlugin from '../plugins/authPlugin'
import todoController from '../controllers/todoController'
import { todoPostSchema } from '../schema/todoSchema'

export default async function todoRouter(fastify: FastifyInstance) {
  fastify.post(
    '/',
    {
      schema: {
        body: todoPostSchema,
      },
      attachValidation: true,
      preHandler: authPlugin,
    },
    todoController.create,
  )
  fastify.put(
    '/:id',
    {
      preHandler: authPlugin,
    },
    todoController.update,
  )
  fastify.get(
    '/',
    {
      preHandler: authPlugin,
    },
    todoController.getAll,
  )
  fastify.get(
    '/:id',
    {
      preHandler: authPlugin,
    },
    todoController.getOne,
  )
  fastify.delete(
    '/:id',
    {
      preHandler: authPlugin,
    },
    todoController.delete,
  )
}
