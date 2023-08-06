import { ServerRoute } from '@hapi/hapi'
import todoController from '../controllers/todoController'
import { todoPostSchema } from '../schema/todoSchema'
import validation from '../validation/validation'

export const todoCreate: ServerRoute = {
  method: 'POST',
  path: '/api/todo',
  handler: todoController.create,
  options: {
    description: 'create todo',
    validate: {
      payload: todoPostSchema,
      failAction: validation,
    },
    auth: 'jwt',
  },
}
export const todoUpdate: ServerRoute = {
  method: 'PUT',
  path: '/api/todo/{id}',
  handler: todoController.update,
  options: {
    description: 'update todo',
    auth: 'jwt',
  },
}
export const todoGetAll: ServerRoute = {
  method: 'GET',
  path: '/api/todo',
  handler: todoController.getAll,
  options: {
    description: 'get all todo',
    auth: 'jwt',
  },
}
export const todoGetOne: ServerRoute = {
  method: 'GET',
  path: '/api/todo/{id}',
  handler: todoController.getOne,
  options: {
    description: 'get one todo',
    auth: 'jwt',
  },
}
export const todoDelete: ServerRoute = {
  method: 'DELETE',
  path: '/api/todo/{id}',
  handler: todoController.delete,
  options: {
    description: 'delete todo',
    auth: 'jwt',
  },
}
