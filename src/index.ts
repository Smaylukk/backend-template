import Fastify, { FastifyInstance } from 'fastify'
import JoiCompiler from 'joi-compiler'
import cors from '@fastify/cors'
import { ServerConfig } from './services/config'
import userRouter from './routes/userRouter'
import errorHandler from './plugins/errorHandler'
import todoRouter from './routes/todoRouter'
import { connectDb } from './db/dbConnector'

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
  await connectDb(ServerConfig.isTest)

  app.listen({ port: ServerConfig.port })
}

start().catch((error) => {
  console.error('start error - ', error)
})
