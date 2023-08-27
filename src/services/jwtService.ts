import jwt from 'jsonwebtoken'
import { JWTConfig } from '../config/config'

class JWTService {
  generateAccessToken(payload) {
    const secret = JWTConfig.jwtAccessSecret

    return jwt.sign(payload, secret, {
      expiresIn: '15m',
    })
  }

  generateRefreshToken(payload) {
    const secret = JWTConfig.jwtRefreshSecret

    return jwt.sign(payload, secret, {})
  }

  verifyToken(token: string) {
    const secret = JWTConfig.jwtAccessSecret
    return jwt.verify(token, secret)
  }

  verifyRefreshToken(token: string) {
    const secret = JWTConfig.jwtRefreshSecret
    return jwt.verify(token, secret)
  }

  createTokensPair(payload) {
    return {
      accessToken: this.generateAccessToken(payload),
      refreshToken: this.generateRefreshToken(payload),
    }
  }
}

export default new JWTService()
