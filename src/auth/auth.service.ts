import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRedis, Redis } from '@nestjs-modules/ioredis'
import * as bcrypt from 'bcrypt'
import { JwtServ } from './jwt/jwtServ.service'
import { UserService } from '../user/user.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtServ,
    @InjectRedis() private readonly redis: Redis,
    private readonly userService: UserService,
  ) {}

  async registration(email: string, name: string, password: string) {
    const user = await this.userService.createUser({ email, name, password })

    const payload = {
      id: user.id,
      email,
      name,
    }

    const tokens = this.jwtService.createTokensPair(payload)
    this.redis.set(tokens.refreshToken, payload.email, 'EX', 60 * 60 * 24 * 7)
    return tokens
  }

  async login(email: string, password: string) {
    const user = await this.userService.getOneUserByEmail(email)
    if (!user) {
      throw new HttpException('Email чи пароль користувача неправильний', HttpStatus.BAD_REQUEST)
    }
    const isPassValid = bcrypt.compareSync(password, user.password)
    if (!isPassValid) {
      throw new HttpException('Email чи пароль користувача неправильний', HttpStatus.BAD_REQUEST)
    }

    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
    }
    const tokens = this.jwtService.createTokensPair(payload)
    this.redis.set(tokens.refreshToken, JSON.stringify(payload), 'EX', 60 * 60 * 24 * 7)
    return tokens
  }

  async check(user) {
    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
    }
    return this.jwtService.generateAccessToken(payload)
  }

  async refreshAccessToken(refreshToken) {
    const data = await this.redis.get(refreshToken)
    if (!data) {
      throw new HttpException('Користувач не авторизований', HttpStatus.FORBIDDEN)
    }
    const payload = JSON.parse(data)
    return this.jwtService.generateAccessToken(payload)
  }
}
