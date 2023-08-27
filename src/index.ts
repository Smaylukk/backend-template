import Koa from 'koa'
import json from 'koa-json'
import cors from 'koa-cors'
import bodyParser from 'koa-bodyparser'
import { createServer } from 'http'
import { ServerConfig } from './config/config'
import router from './routes/index'
import errorMiddleware from './middlewares/errorMiddleware'
import { connectDb } from './services/dbConnector'

const app = new Koa()
// prettier-ignore
app
  .use(errorMiddleware)
  .use(cors())
  .use(bodyParser())
  .use(json())
  .use(router.routes())
  .use(router.allowedMethods())
export const server = createServer(app.callback())

const start = async () => {
  await connectDb(ServerConfig.isTest)

  server.listen(ServerConfig.port, () => console.log(`Server start on port ${ServerConfig.port}!`))
}

start().catch((error) => {
  console.error('start error - ', error)
})
