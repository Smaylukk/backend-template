import sequelize from '../services/db'
import { StartService } from '../services/startService'

const connectDb = async (isTest: boolean) => {
  await sequelize.authenticate()
  sequelize
    .sync({ force: false, logging: !isTest && console.log })
    .then(async () => {
      if (!isTest) {
        await new StartService().initValue()
      }
    })
    .catch((reason) => {
      throw reason
    })
}

export { connectDb }
