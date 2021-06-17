const Event = require('../models/event')
const Joi = require('@hapi/joi')
var date = new Date()

module.exports = {
    create: async(req, res) => {
        try {
            let id_admin = req.cookies.id
            let { nama, lokasi, deskripsi, gambar, harga, tanggal } = req.body
            const schema = Joi.object({
                id_admin: Joi.number().required(),
                nama: Joi.string().required(),
                lokasi: Joi.string().required(),
                deskripsi: Joi.string().required(),
                gambar: Joi.string().required(),
                harga: Joi.number().required(),
                tanggal: Joi.date().required(),
            })
            let data = { id_admin, nama, lokasi, deskripsi, gambar, harga, tanggal }
            const result = schema.validate(data)
                // foto = `foto-${date.getFullYear()}${date.getMonth()}${date.getDate()}${date.getHours()}${date.getMinutes()}`
            const { value, error } = result
            const valid = error == null
            if (!valid) {
                res.send('gagal')
                console.log(error)
            } else {
                Event.create({
                    id_admin,
                    nama,
                    lokasi,
                    deskripsi,
                    gambar,
                    harga,
                    tanggal
                }).then((result) => {
                    console.log(result)
                    res.json({ status: 201, message: 'Berhasil Tambah Event', data })
                })
            }
        } catch (error) {
            console.log(error)
        }
    },
    delete: async(req, res) => {
        try {
            Barang.destroy({
                    where: { id_barang: await req.params.id }
                }).then(console.log('barang berhasil dihapus'))
                .then(result => {
                    if (result == 1) {
                        res.json({ status: 200, msg: 'Berhasil Hapus Barang' })
                    } else {
                        res.json({ status: 401, msg: 'Gagal Hapus, Data tidak ada' })
                    }
                })
        } catch (error) {
            console.log(error)
        }
    },
    update: async(req, res) => {
        try {
            let foto = `foto-${date.getFullYear()}${date.getMonth()}${date.getDate()}${date.getHours()}${date.getMinutes()}`
            let { nama_barang, harga_barang, stock } = req.body
            let data = { nama_barang, harga_barang, stock, foto }
            Barang.update({
                nama_barang: req.body.nama_barang,
                harga_barang: req.body.harga_barang,
                stock: req.body.stock,
                foto: foto
            }, {
                where: { id_barang: req.params.id }
            }).then(result => {
                if (result == 1) {
                    res.json({ status: 200, msg: 'berhasil Update Barang', data })
                } else {
                    res.json({ status: 401, msg: 'Gagal update , Barang tidak ditemukan' })
                }
            })
        } catch (error) {
            console.log(error)
        }
    },
    showAll: async(req, res) => {
        try {
            await Barang.findAll()
                .then(data => {
                    res.json(data)
                })
        } catch (error) {
            console.log(error)
        }
    }
}