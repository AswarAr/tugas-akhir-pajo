require('dotenv').config()
module.exports = {
  "development": {
    "username": process.env.PROD_DB_USERNAME,
    "password": process.env.PROD_DB_PASSWORD,
    "database": process.env.PROD_DB_NAME,
    "host": process.env.PROD_DB_HOSTNAME,
    "dialect": "postgres",
    /*"username": "postgres",
    "password": "123",
    "database": "test-toko-online",
    "host": "127.0.0.1",
    "dialect": "postgres"*/
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "pakanternak",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}