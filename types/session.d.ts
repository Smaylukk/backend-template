import session from 'express-session'
import jwt from 'jsonwebtoken'

declare module 'express-session' {
  interface SessionData {
    user: jwt.JwtPayload
  }
}
