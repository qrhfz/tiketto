const User = require('../models/user')
const bcrypt = require('bcryptjs')
const generateToken = require('../services/generateToken')
const Joi = require('@hapi/joi')


module.exports = {
    create: async(req, res) => {
        try {
            let { nama, telp, email, alamat, password } = await req.body
            let userRegisterSchema = Joi.object({
                nama: Joi.string().min(5).required(),
                telp: Joi.number().min(10).required(),
                email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
                alamat: Joi.string().min(10),
                password: Joi.string().min(6).required(),
                role: Joi.string()
            })
            let role = 'user'
            let data = { nama, telp, email, alamat, password, role }

            const result = userRegisterSchema.validate(data)
                //hash password
            const salt = bcrypt.genSaltSync(10)
                // id_user = uuid.v4()
            password = bcrypt.hashSync(password, salt)
            const { value, error } = result
            const valid = error == null
            if (!valid) {
                res.render('registerUser', { success: false })
            } else {
                User.create({
                    nama,
                    telp,
                    email,
                    alamat,
                    password,
                    role
                }).then(res.render('registerUser', { success: true }))
            }
        } catch (error) {
            console.log(error)
        }
    },
    update: async(req, res) => {
        try {
            let { nama, email, telp, alamat, password } = req.body
            await User.update({
                nama,
                email,
                telp,
                alamat,
                password
            }, {
                where: { id_user: req.params.id }
            }).then(result => {
                // res.redirect(`/user/${req.cookies.id_user}/profile`)
                //TODO: redirect yang benar ya
                res.redirect(`/`)
            })
        } catch (error) {
            console.log(error)
        }
    },
    login: async(req, res) => {
        try {
            const { email, password } = await req.body
            let user
            let userLoginSchema = Joi.object({
                email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
                password: Joi.string().min(6).required()
            })
            const data = { email, password }
            const result = userLoginSchema.validate(data)
            const { value, error } = result
            const valid = error == null
            if (!valid) {
                console.log(error)
            } else {
                User.findOne({
                    where: { email: email }
                }).then(dataValues => {
                    user = dataValues
                    console.log(user)
                    return bcrypt.compare(password, dataValues.password)
                }).then((ress) => {
                    if (ress) {
                        let token
                        token = generateToken()
                        if (ress) {
                            return token
                        }
                    }
                }).then(token => {
                    if (token) {
                        res.cookie('id', user.id)
                        res.cookie('email', user.email)
                        res.cookie('nama', user.nama)
                        res.cookie('telp', user.telp)
                        res.cookie('alamat', user.alamat)
                        res.cookie('role', user.role)
                        res.cookie('token', token, { expire: 600000 + Date.now() })
                    }
                    //TODO : redirect yang bener ya gays
                    res.redirect(`/`)
                })
            }
        } catch (error) {
            console.log(error)
        }
    },
    logout: (req, res) => {

        res.clearCookie("alamat")
        res.clearCookie("email")
        res.clearCookie("id")
        res.clearCookie("nama")
        res.clearCookie("role")
        res.clearCookie("telp")
        res.clearCookie("token")
            // TODO: Redirect yang benar ya
        res.redirect('/')
    },
    user: async(req, res) => {
        try {
            const id_user = await req.cookies.id_user
            await User.findOne({
                where: { id_user: id_user }
            }).then(data => {
                let profile = data.dataValues
                res.render('user', { profile })
            })
        } catch (error) {
            console.log(error)
        }
    },

    // etalase: async(req, res) => {
    //     try {
    //         const profile = req.cookies
    //         await Barang.findAll()
    //             .then(data => {
    //                 res.render('user/list_barang', { profile, data })
    //             })
    //     } catch (error) {
    //         console.log(error)
    //     }
    // },
    // transaksi: async(req, res) => {
    //     try {
    //         const profile = req.cookies
    //         let data, array = [],
    //             sts
    //         const transaksi = await db.query(
    //             `SELECT User.username,Keranjang.jumlah,Barang.nama_barang,Barang.harga_barang,Transaksi.status,Transaksi.id_transaksi,Transaksi.tanggal_sewa,Transaksi.tanggal_kembali,Transaksi.pembayaran,Transaksi.kirim_barang FROM Transaksi INNER JOIN User ON Transaksi.id_user = User.id_user INNER JOIN Keranjang ON Transaksi.id_keranjang = keranjang.id_keranjang INNER JOIN Barang ON Keranjang.id_barang = Barang.id_barang WHERE user.id_user='${profile.id_user}'`, { type: QueryTypes.SELECT })
    //         data = await db.query(
    //             `SELECT * FROM Keranjang INNER JOIN Barang ON Keranjang.id_barang = Barang.id_barang WHERE Keranjang.id_user='${req.cookies.id_user}'`, { type: QueryTypes.SELECT })
    //         array.push(data, transaksi)

    //         transaksi.forEach(element => {
    //             switch (element.status.toLocaleLowerCase()) {
    //                 case 'Menunggu Konfirmasi'.toLocaleLowerCase():
    //                     element.isDisable = false
    //                     break;
    //                 default:
    //                     element.isDisable = true
    //             }
    //         });
    //         console.log(transaksi)

    //         res.render('user/transaksi', { array, transaksi, profile })
    //     } catch (error) {
    //         console.log(error)
    //     }
    // },
    // profile: async(req, res) => {
    //     try {
    //         const id_user = await req.cookies.id_user
    //         await User.findOne({
    //             where: { id_user: id_user }
    //         }).then(data => {
    //             let profile = data.dataValues
    //             res.render('user/profile', { profile })
    //         })
    //     } catch (error) {
    //         console.log(error)
    //     }
    // },

    // createTransaksi: async(req, res) => {
    //     try {
    //         let { id_keranjang, kirim_barang, pembayaran, pengembalian, tanggal_sewa, tanggal_kembali } = req.body
    //         let id_user = req.cookies.id_user,
    //             status = "Menunggu Konfirmasi",
    //             id_admin = '223034e6-e1e5-49f4-94fb-33ac407c0748'
    //         kirim_barang = kirim_barang.concat('/', ' ', pengembalian)
    //         await Transaksi.create({
    //             id_keranjang,
    //             id_user,
    //             id_admin,
    //             status,
    //             tanggal_sewa,
    //             tanggal_kembali,
    //             pembayaran,
    //             kirim_barang
    //         }).then(result => {
    //             res.redirect(`/user/${id_user}/transaksi`)
    //         })
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
}