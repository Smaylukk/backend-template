import { Sequelize } from 'sequelize'
import { DatabaseConfig } from '../config/config'

let dialectOptions = {}
if (DatabaseConfig.dbSSL === '1') {
  dialectOptions = {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  }
}

const sequelize = new Sequelize(
  DatabaseConfig.dbName,
  DatabaseConfig.dbUser,
  DatabaseConfig.dbPassword,

  {
    dialect: 'mysql',
    host: DatabaseConfig.dbHost,
    port: DatabaseConfig.dbPort,
    dialectOptions,
  },
)
export default sequelize
