import Koa from 'koa'
import json from 'koa-json'
import cors from 'koa-cors'
import bodyParser from 'koa-bodyparser'
import { createServer } from 'http'
import * as dotenv from 'dotenv'
import * as console from 'console'
import router from './routes/index'
import errorMiddleware from './middlewares/errorMiddleware'
import sequelize from './services/db'
import { StartService } from './services/startService'

const test = process.env.NODE_ENV === 'test'
const envFile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env'
dotenv.config({ path: envFile })

const port = process.env.PORT || 5005

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

  server.listen(port, () => console.log(`Server start on port ${port}!`))
}

start().catch((error) => {
  console.error('start error - ', error)
})
