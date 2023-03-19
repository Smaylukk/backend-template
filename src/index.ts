import express, { Express } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import * as http from 'http'
import router from './routes/index'
import errorMiddleware from './middlewares/errorMiddleware'
import sequelize from './db'
import { StartService } from './services/startService'

dotenv.config()

const port = process.env.PORT || 5000

const app: Express = express()
app
  .use(cors())
  .use(express.json())
  .use(router)
  .use('/static', express.static('static'))
  .use(errorMiddleware)
const server = http.createServer(app)

const start = async () => {
  await sequelize.authenticate()
  sequelize
    .sync({ force: false })
    .then(async () => {
      await new StartService().initValue()
    })
    .catch((reason) => {
      throw new Error(JSON.stringify(reason))
    })

  server.listen(port, () => console.log(`Server start on port ${port}!`))
}

start().catch((error) => {
  console.log('start error - ', error)
})
