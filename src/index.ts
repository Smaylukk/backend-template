import express, { Express } from 'express'
import Hapi from '@hapi/hapi'
import * as dotenv from 'dotenv'
import cors from 'cors'
import * as http from 'http'
import * as console from 'console'
import router from './routes/index'
import errorMiddleware from './middlewares/errorMiddleware'
import sequelize from './services/db'
import { StartService } from './services/startService'

const test = process.env.NODE_ENV === 'test'
const envFile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env'
dotenv.config({ path: envFile })

const port = process.env.PORT || 5005

const app: Express = express()
// prettier-ignore
app
  .use(cors())
  .use(express.json())
  .use(router)
  .use('/static', express.static('static'))
  .use(errorMiddleware)
export const server = Hapi.server({
  port,
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

  await server.start()
  console.log(`Server start on port ${port}!`)
}

start().catch((error) => {
  console.error('start error - ', error)
})
