import { config } from 'dotenv'
import { Sequelize } from 'sequelize'

config()

let dialectOptions = {}
if (process.env.DB_SSL === '1') {
  dialectOptions = {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  }
}

console.log(dialectOptions)

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,

  {
    dialect: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    dialectOptions,
  },
)
export default sequelize
