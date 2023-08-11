import Hapi from '@hapi/hapi'
import * as HapiJwt from 'hapi-auth-jwt2'
import { JWTConfig, ServerConfig } from './services/config'
import { routes } from './routes'
import { validateUser } from './plugins/auth'
import { connectDb } from './services/dbConnector'

export const server: Hapi.Server<Hapi.ServerApplicationState> = Hapi.server({
  port: ServerConfig.port,
  routes: {
    cors: true,
  },
})

const start = async () => {
  await connectDb(ServerConfig.isTest)

  await server.register([
    {
      plugin: HapiJwt,
    },
  ])

  server.auth.strategy('jwt', 'jwt', {
    key: JWTConfig.jwtAccessSecret,
    validate: validateUser,
  })

  server.route(routes)

  await server.start()
  console.log(`Server start on port ${ServerConfig.port}!`)
}

start().catch((error) => {
  console.error('start error - ', error)
})
