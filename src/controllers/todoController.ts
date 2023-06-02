import { NextFunction, Request, Response } from 'express'
import ApiError from '../errors/ApiError'
import TodoService from '../services/todoService'
import { checkValidationError } from '../validation/validation'

class TodoController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const todos = await TodoService.getAllTodos(req.body.user.id)

      return res.status(200).json(todos)
    } catch (error) {
      const mes = error.message + error.messages.join(', ')
      next(ApiError.badRequestError(mes))
    }
  }

  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      let numId = 0
      try {
        numId = parseInt(id, 10)
      } catch (e) {
        next(ApiError.badRequestError('Param id must be number'))
      }
      const todo = await TodoService.getOneTodo(req.body.user.id, numId)

      return res.status(200).json(todo)
    } catch (error) {
      next(ApiError.badRequestError(error.message))
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      checkValidationError(req)

      const { body } = req
      const todo = await TodoService.createTodo(req.body.user.id, body)
      return res.status(200).json(todo)
    } catch (error) {
      next(ApiError.badRequestError(error.message))
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      checkValidationError(req)

      const { id } = req.params
      let numId = 0
      try {
        numId = parseInt(id, 10)
      } catch (e) {
        next(ApiError.badRequestError('Param id must be number'))
      }
      const { body } = req
      const todo = await TodoService.updateTodo(req.body.user.id, numId, body)
      return res.status(200).json(todo)
    } catch (error) {
      next(ApiError.badRequestError(error.message))
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      let numId = 0
      try {
        numId = parseInt(id, 10)
      } catch (e) {
        next(ApiError.badRequestError('Param id must be number'))
      }
      const todo = await TodoService.deleteTodo(req.body.user.id, numId)

      return res.status(200).json(todo)
    } catch (error) {
      next(ApiError.badRequestError(error.message))
    }
  }
}

export default new TodoController()
