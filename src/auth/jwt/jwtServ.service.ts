import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'

export interface UserPaylod {
  id: number
  email: string
  name: string
}
@Injectable()
export class JwtServ {
  constructor(private readonly jwtService: JwtService, private readonly configService: ConfigService) {}

  generateAccessToken(payload: UserPaylod) {
    const secret = this.configService.get('JWTConfig.jwtAccessSecret')

    return this.jwtService.sign(payload, { secret, expiresIn: '15m' })
  }

  generateRefreshToken(payload: UserPaylod) {
    const secret = this.configService.get('JWTConfig.jwtRefreshSecret')

    return this.jwtService.sign(payload, { secret })
  }

  verifyToken(token: string) {
    const secret = this.configService.get('JWTConfig.jwtAccessSecret')
    return this.jwtService.verify<UserPaylod>(token, { secret })
  }

  verifyRefreshToken(token: string) {
    const secret = this.configService.get('JWTConfig.jwtRefreshSecret')
    return this.jwtService.verify<UserPaylod>(token, { secret })
  }

  createTokensPair(payload: UserPaylod) {
    return {
      accessToken: this.generateAccessToken(payload),
      refreshToken: this.generateRefreshToken(payload),
    }
  }
}
