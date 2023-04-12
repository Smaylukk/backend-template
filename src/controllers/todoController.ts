import { Context } from 'koa'
import ApiError from '../errors/ApiError'
import TodoService from '../services/todoService'
import { ITodoDTO } from '../models/dto/TodoDTO'

class TodoController {
  async getAll(ctx: Context) {
    try {
      const limit = ctx.query?.limit ? parseInt(ctx.query?.limit?.toString(), 10) : 25
      const page = ctx.query?.page ? parseInt(ctx.query?.page?.toString(), 10) : 1
      const offset = (page - 1) * limit || 0

      const todos = await TodoService.getAllTodos(ctx.state.user.id, limit, offset)

      ctx.status = 200
      ctx.body = todos
    } catch (error) {
      const mes = error.message + error.messages.join(', ')
      throw ApiError.badRequestError(mes)
    }
  }

  async getOne(ctx: Context) {
    try {
      const { id } = ctx.params
      const todo = await TodoService.getOneTodo(ctx.state.user.id, id)

      ctx.status = 200
      ctx.body = todo
    } catch (error) {
      const mes = error.message + error.messages.join(', ')
      throw ApiError.badRequestError(mes)
    }
  }

  async create(ctx: Context) {
    try {
      const body = ctx.request.body as ITodoDTO
      const todo = await TodoService.createTodo(ctx.state.user.id, body)

      ctx.status = 200
      ctx.body = todo
    } catch (error) {
      const mes = error.message + error.messages.join(', ')
      throw ApiError.badRequestError(mes)
    }
  }

  async update(ctx: Context) {
    try {
      const { id } = ctx.params
      const { body } = ctx.request
      const todo = await TodoService.updateTodo(ctx.state.user.id, id, body)
      ctx.status = 200
      ctx.body = todo
    } catch (error) {
      const mes = error.message + error.messages.join(', ')
      throw ApiError.badRequestError(mes)
    }
  }

  async delete(ctx: Context) {
    try {
      const { id } = ctx.params
      const todo = await TodoService.deleteTodo(ctx.state.user.id, id)

      ctx.status = 200
      ctx.body = todo
    } catch (error) {
      const mes = error.message + error.messages.join(', ')
      throw ApiError.badRequestError(mes)
    }
  }
}

export default new TodoController()
