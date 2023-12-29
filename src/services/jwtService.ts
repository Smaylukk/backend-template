import jwt from 'jsonwebtoken'
import { JWTConfig } from '../config/config'
import { JwtPayload, JwtTokenPair } from '../interfaces'

class JWTService {
  generateAccessToken(payload: JwtPayload) {
    const secret = JWTConfig.jwtAccessSecret

    return jwt.sign(payload, secret, {
      expiresIn: '15m',
    })
  }

  generateRefreshToken(payload: JwtPayload) {
    const secret = JWTConfig.jwtRefreshSecret

    return jwt.sign(payload, secret, {})
  }

  verifyToken(token: string) {
    const secret = JWTConfig.jwtAccessSecret
    return jwt.verify(token, secret) as jwt.JwtPayload
  }

  verifyRefreshToken(token: string) {
    const secret = JWTConfig.jwtRefreshSecret
    return jwt.verify(token, secret) as jwt.JwtPayload
  }

  createTokensPair(payload: JwtPayload): JwtTokenPair {
    return { accessToken: this.generateAccessToken(payload), refreshToken: this.generateRefreshToken(payload) }
  }
}

export default new JWTService()
