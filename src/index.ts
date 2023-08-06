import Hapi from '@hapi/hapi'
import * as HapiJwt from 'hapi-auth-jwt2'
import * as dotenv from 'dotenv'
import * as console from 'console'
import { routes } from './routes'
import sequelize from './services/db'
import { StartService } from './services/startService'
import { validateUser } from './plugins/auth'

const test = process.env.NODE_ENV === 'test'
const envFile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env'
dotenv.config({ path: envFile })

const port = process.env.PORT || 5005

export const server: Hapi.Server<Hapi.ServerApplicationState> = Hapi.server({
  port,
  routes: {
    cors: true,
  },
})

const start = async () => {
  await sequelize.authenticate()
  sequelize
    .sync({ force: false, logging: !test && console.log })
    .then(async () => {
      if (!test) {
        await new StartService().initValue()
      }
    })
    .catch((reason) => {
      throw reason
    })

  await server.register([
    {
      plugin: HapiJwt,
    },
  ])

  server.auth.strategy('jwt', 'jwt', {
    key: process.env.JWT_ACCESS_SECRET,
    validate: validateUser,
  })

  server.route(routes)

  await server.start()
  console.log(`Server start on port ${port}!`)
}

start().catch((error) => {
  console.error('start error - ', error)
})
