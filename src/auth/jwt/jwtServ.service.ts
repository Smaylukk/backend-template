import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class JwtServ {
  constructor(private readonly jwtService: JwtService) {}

  generateAccessToken(payload) {
    const secret = process.env.JWT_ACCESS_SECRET

    return this.jwtService.sign(payload, { secret, expiresIn: '15m' })
  }

  generateRefreshToken(payload) {
    const secret = process.env.JWT_REFRESH_SECRET

    return this.jwtService.sign(payload, { secret })
  }

  verifyToken(token: string) {
    const secret = process.env.JWT_ACCESS_SECRET
    return this.jwtService.verify(token, { secret })
  }

  verifyRefreshToken(token: string) {
    const secret = process.env.JWT_REFRESH_SECRET
    return this.jwtService.verify(token, { secret })
  }

  createTokensPair(payload) {
    return { accessToken: this.generateAccessToken(payload), refreshToken: this.generateRefreshToken(payload) }
  }
}
