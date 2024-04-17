import { FastifyReply } from 'fastify'
import ApiError from '../errors/ApiError'
import TodoService from '../services/todoService'
import { checkValidationError } from '../validation/validation'
import { IUserRequest, TodoPayload } from '../interfaces'
import { TodoDTO } from '../models/dto/TodoDTO'

class TodoController {
  async getAll(request: IUserRequest, res: FastifyReply) {
    try {
      const todos = await TodoService.getAllTodos(request.user.id)

      res.status(200).send(todos)
    } catch (error) {
      console.log(error)
      throw ApiError.badRequestError(error.message)
    }
  }

  async getOne(request: IUserRequest<never, { id: string }>, res: FastifyReply) {
    try {
      const { id } = request.params
      const todo = await TodoService.getOneTodo(request.user.id, id)

      res.status(200).send(todo)
    } catch (error) {
      throw ApiError.badRequestError(error.message)
    }
  }

  async create(request: IUserRequest<TodoPayload, { id: string }>, res: FastifyReply) {
    try {
      checkValidationError(request)

      const { body } = request
      const todo = await TodoService.createTodo(request.user.id, new TodoDTO(body))
      return res.status(200).send(todo)
    } catch (error) {
      throw ApiError.badRequestError(error.message)
    }
  }

  async update(request: IUserRequest<TodoPayload, { id: string }>, res: FastifyReply) {
    try {
      checkValidationError(request)

      const { body } = request
      const todo = await TodoService.updateTodo(request.user.id, request.params.id, body)
      return res.status(200).send(todo)
    } catch (error) {
      throw ApiError.badRequestError(error.message)
    }
  }

  async delete(request: IUserRequest<never, { id: string }>, res: FastifyReply) {
    try {
      const todo = await TodoService.deleteTodo(request.user.id, request.params.id)

      return res.status(200).send(todo)
    } catch (error) {
      throw ApiError.badRequestError(error.message)
    }
  }
}

export default new TodoController()
