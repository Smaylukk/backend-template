export interface IServerConfig {
  isTest: boolean
  port: number
  nodeEnv: string
}

export interface IDatabaseConfig {
  mongoURL: string
}

export interface IJWTConfig {
  jwtAccessSecret: string
  jwtRefreshSecret: string
}

export interface IRedisConfig {
  redisHost: string
  redisPort: number
}
