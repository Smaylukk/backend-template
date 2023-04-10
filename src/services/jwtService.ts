import jwt from 'jsonwebtoken'

class JWTService {
  generateAccessToken(payload) {
    const secret = process.env.JWT_ACCESS_SECRET

    return jwt.sign(payload, secret, {
      expiresIn: '15m',
    })
  }

  generateRefreshToken(payload) {
    const secret = process.env.JWT_REFRESH_SECRET

    return jwt.sign(payload, secret, {})
  }

  verifyToken(token: string) {
    const secret = process.env.JWT_ACCESS_SECRET
    return jwt.verify(token, secret)
  }

  verifyRefreshToken(token: string) {
    const secret = process.env.JWT_REFRESH_SECRET
    return jwt.verify(token, secret)
  }

  createTokensPair(payload) {
    return { accessToken: this.generateAccessToken(payload), refreshToken: this.generateRefreshToken(payload) }
  }
}

export default new JWTService()
