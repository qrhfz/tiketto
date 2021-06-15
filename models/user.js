const Sequelize = require('sequelize')
const db = require('../config/db')

//user models
const User = db.define('users', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    nama: {
        type: Sequelize.STRING
    },
    telp: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING,
        min: 6
    },
    alamat: {
        type: Sequelize.TEXT
    },
    password: {
        type: Sequelize.STRING,
        min: 6
    },
    role: {
        type: Sequelize.ENUM('user', 'admin')
    }
}, {
    timestamps: false,
    freezeTableName: true
})

module.exports = User