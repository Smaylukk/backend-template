import express, { Express } from 'express'
import IORedis from 'ioredis'
import * as dotenv from 'dotenv'
import cors from 'cors'
import * as http from 'http'
import router from './routes/index'
import errorMiddleware from './middlewares/errorMiddleware'
import sequelize from './db'
import { StartService } from './services/startService'

const test = process.env.NODE_ENV === 'test'
const envFile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env'
dotenv.config({ path: envFile })

const port = process.env.PORT || 5005

const redisClient = new IORedis()
const app: Express = express()
// prettier-ignore
app
  .use(cors())
  .use(express.json())
  .use(router)
  .use('/static', express.static('static'))
  .use(errorMiddleware)
export const server = http.createServer(app)

const start = async () => {
  await sequelize.authenticate()
  sequelize
    .sync({ force: false, logging: !test })
    .then(async () => {
      if (test) {
        await new StartService().initValue()
      }
    })
    .catch((reason) => {
      throw reason
    })

  server.listen(port, () => console.log(`Server start on port ${port}!`))
}

start().catch((error) => {
  console.error('start error - ', error)
})
