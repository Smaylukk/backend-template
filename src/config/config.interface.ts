export interface IServerConfig {
  isTest: boolean
  port: number
  nodeEnv: string
}

export interface IDatabaseConfig {
  dbName: string
  dbUser: string
  dbPassword: string
  dbHost: string
  dbPort: number
  dbSSL: string
}

export interface IJWTConfig {
  jwtAccessSecret: string
  jwtRefreshSecret: string
}

export interface IRedisConfig {
  redisHost: string
  redisPort: number
}
