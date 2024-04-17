import Fastify, { FastifyInstance } from 'fastify'
import JoiCompiler from 'joi-compiler'
import cors from '@fastify/cors'
import errorHandler from './plugins/errorHandler'
import userRouter from './routes/userRouter'
import todoRouter from './routes/todoRouter'
import { ServerConfig } from './config/config'
import { connectDb } from './services/dbConnector'

async function buildApp() {
  const factory = JoiCompiler()
  const app: FastifyInstance = Fastify({
    logger: true,
    schemaController: {
      bucket: factory.bucket,
      compilersFactory: {
        buildValidator: factory.buildValidator,
      },
    },
  })

  await app.register(cors)

  app.setErrorHandler((error, request, reply) => {
    errorHandler(app, error, request, reply)
  })
  app.register(userRouter, { prefix: '/api/user' })

  app.register(todoRouter, { prefix: '/api/todo' })
  app.get('/', (req, res) => {
    res.status(200).send('It work!')
  })
  await connectDb(ServerConfig.isTest)

  return app
}
export { buildApp }
