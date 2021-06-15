const Sequelize = require('sequelize')
const db = require('../config/db')

const Event = db.define('event', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    id_admin: {
        type: Sequelize.INTEGER,
    },
    nama: {
        type: Sequelize.STRING
    },
    lokasi: {
        type: Sequelize.TEXT
    },
    deskripsi: {
        type: Sequelize.TEXT
    },
    gambar: {
        type: Sequelize.TEXT
    },
    harga: {
        type: Sequelize.INTEGER
    },
    tanggal: {
        type: Sequelize.DATE
    }
}, {
    freezeTableName: true,
    timestamps: false
})

module.exports = Event