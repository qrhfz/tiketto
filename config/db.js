const Sequelize = require('sequelize')

const { CLEARDB_DATABASE_URL } = process.env
const configuration = {
    connectionLimit: 100,
    host: 'localhost',
    username: 'root',
    dialect: 'mysql',
    database: 'db_tiketto',
    port: 3306,
    operatorsAlias: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        evict: 15000,
        idle: 20000,
    },
    dialectOptions: {
        connectTimeout: 60000,
    },
}

//configure database
const db = new Sequelize(configuration)
console.log({ configuration, db })

module.exports = db