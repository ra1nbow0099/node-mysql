const Sequelize = require('sequelize')

DB_NAME = 'node-todo'
USER_NAME = 'root'
PASSWORD = '12345678'

const sequelize = new Sequelize(DB_NAME,USER_NAME,PASSWORD, {
    host: 'localhost', 
    dialect: 'mysql',
    
    
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
})
 

module.exports = sequelize