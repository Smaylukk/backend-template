import { Sequelize } from 'sequelize'
import { DatabaseConfig } from './config'

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
    dialect: 'postgres',
    host: DatabaseConfig.dbHost,
    port: parseInt(DatabaseConfig.dbPort, 10),
    dialectOptions,
  },
)
export default sequelize
