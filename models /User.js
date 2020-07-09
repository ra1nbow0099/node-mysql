const Sequelize = require('sequelize')
const sequelize = require('../utils/db')

const user = sequelize.define('User', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
    },
    name: {
        type: Sequelize.STRING,
    },
    lastname: {
        type: Sequelize.STRING,
    },
    email: {
        type: Sequelize.STRING,
    },
    password: {
        type: Sequelize.STRING,
    },
},
{
    timestamps: false
}
)


module.exports = user