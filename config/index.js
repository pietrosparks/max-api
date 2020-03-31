const dotenv = require('dotenv')

dotenv.config({ path: '.env' })

module.exports = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5000,
  secretKey: process.env.SECRET_KEY,
  development: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres'
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres'
  }
}
