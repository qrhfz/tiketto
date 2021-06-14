const Sequielize = require('sequelize')
const db = require('../config/db')
const { Sequelize } = require('sequelize')

//transaksi's models

const Tiket = db.define('tiket', {
    id: {
        type: Sequielize.INTEGER,
        primaryKey: true
    },
    id_user: {
        type: Sequielize.STRING
    },
    id_event: {
        type: Sequielize.STRING
    },
    status: {
        type: Sequielize.STRING
    },
    pembayaran: {
        type: Sequielize.STRING
    },
    bukti_poembayaran: {
        type: Sequelize.STRING
    }
}, {
    freezeTableName: true
})

module.exports = Tiket