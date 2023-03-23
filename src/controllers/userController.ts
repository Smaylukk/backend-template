import { NextFunction, Request, Response } from 'express'
import bcrypt from 'bcrypt'
import ApiError from '../errors/ApiError'
import UserService from '../services/userService'
import { checkValidationError } from '../validation/validation'
import jwtService from '../services/jwtService'
import { IUserDTO, UserDTO } from '../models/dto/UserDTO'

interface IUserController {
  registration(req: Request, res: Response, next: NextFunction): Promise<Response>
  login(req: Request, res: Response, next: NextFunction): Promise<Response>
  check(req: Request, res: Response, next: NextFunction): Promise<Response>
}

class UserController implements IUserController {
  async registration(req: Request, res: Response, next: NextFunction) {
    try {
      checkValidationError(req)
      const { email, name, password } = req.body

      const userDTO = new UserDTO({ email, name, password })
      const user = await UserService.createUser(userDTO)

      const payload = {
        id: user.id,
        email,
        name,
      }
      const token = jwtService.generateToken(payload)

      return res.status(200).json(token)
    } catch (error) {
      const mes = !(error.message + error.errors) ? '' : error.errors.map((item) => JSON.stringify(item)).join(', ')
      next(ApiError.badRequestError(mes))
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      checkValidationError(req)

      const { email, password } = req.body
      const user = await UserService.getOneUserByEmail(email)
      if (!user) {
        next(ApiError.badRequestError('Email чи пароль користувача неправильний'))
        return
      }
      const isPassValid = bcrypt.compareSync(password, user.password)
      if (!isPassValid) {
        next(ApiError.badRequestError('Email чи пароль користувача неправильний'))
        return
      }

      const payload = {
        id: user.id,
        email: user.email,
        name: user.name,
      }
      const token = jwtService.generateToken(payload)

      return res.status(200).json(token)
    } catch (error) {
      console.log(error)
      next(ApiError.badRequestError(error.message))
    }
  }

  async check(req: Request, res: Response, next: NextFunction) {
    try {
      checkValidationError(req)

      const user = req.body.user as IUserDTO
      const payload = {
        id: user.id,
        email: user.email,
        name: user.name,
      }
      const token = jwtService.generateToken(payload)

      return res.status(200).json(token)
    } catch (error) {
      next(ApiError.badRequestError(error.message))
    }
  }
}

export default new UserController()
