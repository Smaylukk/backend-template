import { IConfig } from './config.interface'
import * as process from 'process'

export const config = (): IConfig => ({
  ServerConfig: {
    port: +process.env.PORT || 5005,
    nodeEnv: process.env.NODE_ENV,
  },
  DatabaseConfig: {
    dbName: process.env.DB_NAME,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbHost: process.env.DB_HOST,
    dbPort: +process.env.DB_PORT,
    dbSSL: process.env.DB_SSL,
  },
  JWTConfig: {
    jwtAccessSecret: process.env.JWT_ACCESS_SECRET,
    jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
  },
  RedisConfig: {
    redisHost: process.env.REDIS_HOST,
    redisPort: process.env.REDIS_PORT,
  },
})
