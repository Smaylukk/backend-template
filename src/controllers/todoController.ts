import { Request, ResponseToolkit, ResponseObject } from 'hapi'
import boom from '@hapi/boom'
import TodoService from '../services/todoService'
import { IUserDTO } from '../models/dto/UserDTO'
import { ITodoDTO } from '../models/dto/TodoDTO'

class TodoController {
  async getAll(req: Request, h: ResponseToolkit): Promise<ResponseObject> {
    try {
      const user = req.auth.credentials as IUserDTO
      const todos = await TodoService.getAllTodos(user.id)

      return h.response(todos).code(200)
    } catch (error) {
      console.log(error)
      const boomError = boom.badRequest(error.message)
      return h
        .response(boomError.output.payload)
        .code(boomError.output.statusCode)
    }
  }

  async getOne(req: Request, h: ResponseToolkit): Promise<ResponseObject> {
    try {
      const user = req.auth.credentials as IUserDTO
      const { id } = req.params
      const todo = await TodoService.getOneTodo(user.id, id)

      return h.response(todo).code(200)
    } catch (error) {
      console.log(error)
      const boomError = boom.badRequest(error.message)
      return h
        .response(boomError.output.payload)
        .code(boomError.output.statusCode)
    }
  }

  async create(req: Request, h: ResponseToolkit): Promise<ResponseObject> {
    try {
      const user = req.auth.credentials as IUserDTO
      const payload = req.payload as ITodoDTO
      const todo = await TodoService.createTodo(user.id, payload)
      return h.response(todo).code(200)
    } catch (error) {
      console.log(error)
      const boomError = boom.badRequest(error.message)
      return h
        .response(boomError.output.payload)
        .code(boomError.output.statusCode)
    }
  }

  async update(req: Request, h: ResponseToolkit): Promise<ResponseObject> {
    try {
      const user = req.auth.credentials as IUserDTO
      const { id } = req.params
      const { payload } = req
      const todo = await TodoService.updateTodo(user.id, id, payload)
      return h.response(todo).code(200)
    } catch (error) {
      console.log(error)
      const boomError = boom.badRequest(error.message)
      return h
        .response(boomError.output.payload)
        .code(boomError.output.statusCode)
    }
  }

  async delete(req: Request, h: ResponseToolkit): Promise<ResponseObject> {
    try {
      const user = req.auth.credentials as IUserDTO
      const { id } = req.params
      const todo = await TodoService.deleteTodo(user.id, id)

      return h.response(todo.toString()).code(200)
    } catch (error) {
      console.log(error)
      const boomError = boom.badRequest(error.message)
      return h
        .response(boomError.output.payload)
        .code(boomError.output.statusCode)
    }
  }
}

export default new TodoController()
