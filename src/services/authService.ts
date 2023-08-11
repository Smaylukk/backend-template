import bcrypt from 'bcrypt'
import Redis from 'ioredis'
import { UserDTO } from '../models/dto/UserDTO'
import jwtService from './jwtService'
import ApiError from '../errors/ApiError'
import UserRepository from '../repositories/userRepository'

class AuthService {
  redis = new Redis()

  async registration(email: string, name: string, password: string) {
    const existUser = await UserRepository.getOneUserByEmail(email)
    if (existUser) {
      throw ApiError.badRequestError(`Користувач з email ${email} вже зареєстрований`)
    }
    const userDTO = new UserDTO({ email, name, password })
    const user = await UserRepository.createUser(userDTO)

    const payload = {
      id: user.id,
      email,
      name,
    }

    const tokens = jwtService.createTokensPair(payload)
    this.redis.set(tokens.refreshToken, payload.email, 'EX', 60 * 60 * 24 * 7)
    return tokens
  }

  async login(email: string, password: string) {
    const user = await UserRepository.getOneUserByEmail(email)
    if (!user) {
      throw ApiError.badRequestError('Email чи пароль користувача неправильний')
    }
    const isPassValid = bcrypt.compareSync(password, user.password)
    if (!isPassValid) {
      throw ApiError.badRequestError('Email чи пароль користувача неправильний')
    }

    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
    }
    const tokens = jwtService.createTokensPair(payload)
    this.redis.set(tokens.refreshToken, JSON.stringify(payload), 'EX', 60 * 60 * 24 * 7)
    return tokens
  }

  async check(user) {
    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
    }
    return jwtService.generateAccessToken(payload)
  }

  async refreshAccessToken(refreshToken) {
    const data = await this.redis.get(refreshToken)
    if (!data) {
      throw ApiError.unauthorizedError('Користувач не авторизований')
    }
    const payload = JSON.parse(data)
    return jwtService.generateAccessToken(payload)
  }
}

export default new AuthService()
