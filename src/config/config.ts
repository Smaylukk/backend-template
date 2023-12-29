import * as dotenv from 'dotenv'
import { IDatabaseConfig, IJWTConfig, IRedisConfig, IServerConfig } from './config.interface'

const isTest = process.env.NODE_ENV === 'test'
const envFile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env'
dotenv.config({ path: envFile })

export const ServerConfig: IServerConfig = {
  isTest,
  port: +process.env.PORT || 5005,
  nodeEnv: process.env.NODE_ENV,
}

export const DatabaseConfig: IDatabaseConfig = {
  mongoURL: process.env.MONGO_URL,
}

export const JWTConfig: IJWTConfig = {
  jwtAccessSecret: process.env.JWT_ACCESS_SECRET,
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
}

export const RedisConfig: IRedisConfig = {
  redisHost: process.env.REDIS_HOST,
  redisPort: +process.env.REDIS_PORT,
}
