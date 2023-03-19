import { NextFunction, Request, Response } from 'express'
import ApiError from '../errors/ApiError'
import PostService from '../services/postService'
import { checkValidationError } from '../validation/validation'

class PostController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const limit = req.query?.limit ? parseInt(req.query?.limit?.toString(), 10) : 25
      const page = req.query?.page ? parseInt(req.query?.page?.toString(), 10) : 1
      const offset = page * limit || 0

      const posts = await PostService.getAllPosts(limit, offset)

      return res.status(200).json(posts)
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
      const post = await PostService.getOnePost(numId)

      return res.status(200).json(post)
    } catch (error) {
      next(ApiError.badRequestError(error.message))
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      checkValidationError(req)

      const { body } = req
      const post = await PostService.createPost(body)
      return res.status(200).json(post)
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
      const post = await PostService.updatePost(numId, body)
      return res.status(200).json(post)
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
      const post = await PostService.deletePost(numId)

      return res.status(200).json(post)
    } catch (error) {
      next(ApiError.badRequestError(error.message))
    }
  }
}

export default new PostController()
