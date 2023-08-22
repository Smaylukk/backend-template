interface IServerConfig {
  port: number
  nodeEnv: string
}

interface IDatabaseConfig {
  dbName: string
  dbUser: string
  dbPassword: string
  dbHost: string
  dbPort: number
  dbSSL: string
}

interface IJWTConfig {
  jwtAccessSecret: string
  jwtRefreshSecret: string
}

interface IRedisConfig {
  redisHost: string
  redisPort: string
}
export interface IConfig {
  ServerConfig: IServerConfig
  DatabaseConfig: IDatabaseConfig
  JWTConfig: IJWTConfig
  RedisConfig: IRedisConfig
}
