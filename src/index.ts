import express, { Express } from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import * as http from 'http'
import * as console from 'console'
import router from './routes/index'
import errorMiddleware from './middlewares/errorMiddleware'
import { connectDb } from './db/dbConnector'

const isTest = process.env.NODE_ENV === 'test'
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
export const server = http.createServer(app)

const start = async () => {
  await connectDb(isTest)

  server.listen(port, () => console.log(`Server start on port ${port}!`))
}

start().catch((error) => {
  console.error('start error - ', error)
})
