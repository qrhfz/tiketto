const user = require('express').Router()
const controller = require('../controller/user')
const auth = require('../middleware/auth')
const controllerKeranjang = require('../controller/keranjang')
const transaksiController = require('../controller/transaksi')
const uploadProfileImg = require('../services/uploadImgProfile')

// user.get('/register', (req, res) => { res.render('registerUser') })
// user.post('/register', controller.create)
user.get('/login', (req, res) => { res.render('loginUser') })
user.post('/login', controller.login)
user.get('/logout', controller.logout)
user.get('/:id', auth.userAuth, controller.user)
user.post('/:id', [auth.userAuth, uploadProfileImg.single('foto')], controller.update)
    // user.get('/:id/barang', auth.userAuth, controller.etalase)
    // user.get('/:id/transaksi', auth.userAuth, controller.transaksi)
    // user.get('/:id/profile', auth.userAuth, controller.profile)
    // user.post('/:id/keranjang', auth.userAuth, controllerKeranjang.create)
    // user.post('/:id/transaksi', auth.userAuth, controller.createTransaksi)
    // user.post('/:id/transaksi/:id', auth.userAuth, transaksiController.update)


module.exports = user