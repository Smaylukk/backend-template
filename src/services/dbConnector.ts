import * as mongoose from 'mongoose'
import { StartService } from './startService'
import { DatabaseConfig } from '../config/config'

const connectDb = async (isTest: boolean) => {
  await mongoose.connect(DatabaseConfig.mongoURL)
  if (!isTest) {
    await new StartService().initValue()
  }
}
const disconnectDb = async () => {
  await mongoose.disconnect()
}

export { connectDb, disconnectDb }
