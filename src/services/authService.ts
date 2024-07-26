import bcrypt from 'bcrypt'
import Redis from 'ioredis'
import { IUserDTO, UserDTO } from '../models/dto/UserDTO'
import jwtService from './jwtService'
import ApiError from '../errors/ApiError'
import UserRepository from '../repositories/userRepository'
import { RedisConfig } from '../config/config'
import { JwtPayload } from '../interfaces'

class AuthService {
  redis = new Redis({
    host: RedisConfig.redisHost,
    port: RedisConfig.redisPort,
  })

  async registration(email: string, name: string, password: string) {
    const existUser = await UserRepository.getOneUserByEmail(email)
    if (existUser) {
      throw ApiError.badRequestError(`Користувач з email ${email} вже зареєстрований`)
    }
    const hashPassword = bcrypt.hashSync(password, 5)
    const userDTO = new UserDTO({ email, name, password: hashPassword })
    const user = await UserRepository.createUser(userDTO)

    const payload: JwtPayload = {
      id: user.id,
      email,
      name,
    }

    const tokens = jwtService.createTokensPair(payload)
    await this.redis.set(tokens.refreshToken, payload.email, 'EX', 60 * 60 * 24 * 7)
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

    const payload: JwtPayload = {
      id: user.id,
      email: user.email,
      name: user.name,
    }
    const tokens = jwtService.createTokensPair(payload)
    await this.redis.set(tokens.refreshToken, JSON.stringify(payload), 'EX', 60 * 60 * 24 * 7)
    return tokens
  }

  async check(user: IUserDTO) {
    const payload: JwtPayload = {
      id: user.id,
      email: user.email,
      name: user.name,
    }
    return jwtService.generateAccessToken(payload)
  }

  async refreshAccessToken(refreshToken: string) {
    const data = await this.redis.get(refreshToken)
    if (!data) {
      throw ApiError.unauthorizedError('Користувач не авторизований')
    }
    const payload = JSON.parse(data)
    return jwtService.generateAccessToken(payload)
  }
}

export default new AuthService()
