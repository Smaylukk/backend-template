import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

export interface UserPaylod {
  id: number
  email: string
  name: string
}
@Injectable()
export class JwtServ {
  constructor(private readonly jwtService: JwtService) {}

  generateAccessToken(payload: UserPaylod) {
    const secret = process.env.JWT_ACCESS_SECRET

    return this.jwtService.sign(payload, { secret, expiresIn: '15m' })
  }

  generateRefreshToken(payload: UserPaylod) {
    const secret = process.env.JWT_REFRESH_SECRET

    return this.jwtService.sign(payload, { secret })
  }

  verifyToken(token: string) {
    const secret = process.env.JWT_ACCESS_SECRET
    return this.jwtService.verify<UserPaylod>(token, { secret })
  }

  verifyRefreshToken(token: string) {
    const secret = process.env.JWT_REFRESH_SECRET
    return this.jwtService.verify<UserPaylod>(token, { secret })
  }

  createTokensPair(payload: UserPaylod) {
    return {
      accessToken: this.generateAccessToken(payload),
      refreshToken: this.generateRefreshToken(payload),
    }
  }
}
