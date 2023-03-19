import jwt from 'jsonwebtoken'
import * as uuid from 'uuid'

interface IJWTService {
  generateToken(payload: string): string
  generateRefreshToken(): string
  verifyToken(token: string): string | jwt.JwtPayload
}
class JWTService implements IJWTService {
  generateRefreshToken(): string {
    return uuid.v4()
  }

  generateToken(payload) {
    const secret = process.env.JWT_SECRET || 'Secret'

    return jwt.sign(payload, secret, {
      expiresIn: '24h',
    })
  }

  verifyToken(token) {
    const secret = process.env.JWT_SECRET || 'Secret'
    return jwt.verify(token, secret)
  }
}

export default new JWTService()
