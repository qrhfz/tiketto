const Event = require('../models/event')
const Joi = require('@hapi/joi')
const { v4: uuidv4 } = require('uuid');

async function uploadGambar(req) {
    return new Promise((resolve, reject) => {
        if (req.files && Object.keys(req.files).length > 0) {
            let fileGambar = req.files.gambar;
            let ext = fileGambar.name.split('.').pop();
            let namaFileGambar = uuidv4() + '.' + ext
            uploadPath = __dirname + '../../public/assets/images/fotoevent/' + namaFileGambar;

            fileGambar.mv(uploadPath, function(err) {
                if (err) {
                    console.log(err)
                    reject(new Error("Server gagal memproses file"))
                }
                console.log('file upload :', namaFileGambar)
                resolve(namaFileGambar)
            })
        } else {
            reject(new Error("File tidak diupload"))
        }
    })
}

module.exports = {
    create: async(req, res) => {
        try {
            gambar = await uploadGambar(req)

            console.log('gambar adalah ', gambar)
            let id_admin = req.cookies.id
            let { nama, lokasi, deskripsi, harga, tanggal } = req.body
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
                    // console.log(result)
                    res.json({ status: 201, message: 'Berhasil Tambah Event', data })
                })
            }
        } catch (error) {
            console.log(error.message)
            res.json({ error: error.message })
        }
    },
    delete: async(req, res) => {
        try {
            Event.destroy({
                    where: { id: await req.params.id }
                }).then(console.log('barang berhasil dihapus'))
                .then(result => {
                    if (result == 1) {
                        res.json({ status: 200, msg: 'Berhasil Hapus Event' })
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
            gambar = await uploadGambar(req)
            let { nama, lokasi, deskripsi, harga, tanggal } = req.body
            let data = { nama, lokasi, deskripsi, harga, tanggal }
            Event.update({
                nama: req.body.nama,
                lokasi: req.body.lokasi,
                deskripsi: req.body.deskripsi,
                harga: req.body.harga,
                tanggal: req.body.tanggal,
                gambar: gambar
            }, {
                where: { id: req.params.id }
            }).then(result => {
                if (result == 1) {
                    res.json({ status: 200, msg: 'berhasil Update Event', data })
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
            await Event.findAll()
                .then(data => {
                    res.render('index', { data })
                })
        } catch (error) {
            console.log(error)
        }
    },
    showOne: async(req, res) => {
        try {
            await Event.findOne({
                    where: {
                        id: req.params.id
                    }
                })
                .then(data => {
                    console.log(data)
                    res.render('eventDetail', { data })
                })
        } catch (error) {
            console.log(error)
        }
    }
}