import express, { Express } from 'express'
import cors from 'cors'
import * as http from 'http'
import session from 'express-session'
import { ServerConfig } from './config/config'
import router from './routes/index'
import errorMiddleware from './middlewares/errorMiddleware'
import { connectDb } from './services/dbConnector'

const app: Express = express()
// prettier-ignore
app
  .use(cors())
  .use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  }))
  .use(express.json())
  .use(router)
  .use('/static', express.static('static'))
  .use(errorMiddleware)
export const server = http.createServer(app)

const start = async () => {
  await connectDb(ServerConfig.isTest)

  server.listen(ServerConfig.port, () => console.log(`Server start on port ${ServerConfig.port}!`))
}

start().catch((error) => {
  console.error('start error - ', error)
})
