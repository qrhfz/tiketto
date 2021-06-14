const Barang = require('../models/event')
const Joi = require('@hapi/joi')
var date = new Date()

module.exports = {
    create: async(req, res) => {
        try {
            let { nama_barang, harga_barang, stock } = req.body
            parseInt(harga_barang)
            parseInt(stock)
            const barangSchema = Joi.object({
                nama_barang: Joi.string().required(),
                harga_barang: Joi.number().required(),
                stock: Joi.number().required()
            })
            let data = { nama_barang, harga_barang, stock }
            const result = barangSchema.validate(data)
            foto = `foto-${date.getFullYear()}${date.getMonth()}${date.getDate()}${date.getHours()}${date.getMinutes()}`
            const { value, error } = result
            const valid = error == null
            if (!valid) {
                res.send('gagal')
                console.log(error)
            } else {
                Barang.create({
                    nama_barang,
                    harga_barang,
                    stock,
                    foto
                }).then(() => {
                    res.redirect(`/admin/${req.cookies.id_admin}/barang`)
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
                .then(result => res.redirect(`/admin/${req.cookies.id_admin}/barang`))
        } catch (error) {
            console.log(error)
        }
    },
    update: async(req, res) => {
        try {
            let foto = `foto-${date.getFullYear()}${date.getMonth()}${date.getDate()}${date.getHours()}${date.getMinutes()}`
            console.log(req.body.nama_barang)
            Barang.update({
                nama_barang: req.body.nama_barang,
                harga_barang: req.body.harga_barang,
                stock: req.body.stock,
                foto: foto
            }, {
                where: { id_barang: req.params.id }
            }).then(result => {
                res.redirect(`/admin/${req.cookies.id_admin}/barang`)
            })
        } catch (error) {
            console.log(error)
        }
    }
}