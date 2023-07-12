import Fastify, { FastifyInstance } from 'fastify'
import JoiCompiler from 'joi-compiler'
import * as dotenv from 'dotenv'
import * as console from 'console'
import cors from '@fastify/cors'
import sequelize from './services/db'
import { StartService } from './services/startService'
import userRouter from './routes/userRouter'
import errorHandler from './plugins/errorHandler'
import todoRouter from './routes/todoRouter'

const test = process.env.NODE_ENV === 'test'
const envFile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env'
dotenv.config({ path: envFile })

const port = parseInt(process.env.PORT, 10) || 5005
const factory = JoiCompiler()
export const app: FastifyInstance = Fastify({
  logger: true,
  schemaController: {
    bucket: factory.bucket,
    compilersFactory: {
      buildValidator: factory.buildValidator,
    },
  },
})
// export const server = http.createServer(app.server)

const start = async () => {
  await app.register(cors)

  app.setErrorHandler((error, request, reply) => {
    errorHandler(app, error, request, reply)
  })
  app.register(userRouter, { prefix: '/api/user' })

  app.register(todoRouter, { prefix: '/api/todo' })
  app.get('/', (req, res) => {
    res.status(200).send('It work!')
  })
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

  app.listen({ port })
}

start().catch((error) => {
  console.error('start error - ', error)
})
