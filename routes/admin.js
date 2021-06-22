const admin = require('express').Router()
    // const controler = require('../controller/admin')
const auth = require('../middleware/auth')
    // const barangController = require('../controller/barang')
    // const upload = require('../services/upload')
    // const transaksiController = require('../controller/transaksi')
    // const uploadImgAdmin = require('../services/uploadImgAdmin')


admin.get('/', auth.adminAuth, (req, res) => {
    res.render('admin/index')
})

admin.get('/buatevent', (req, res) => {
    res.render('admin/buatEvent')
})

// admin.get('/login', (req, res) => {
//     res.render('loginAdmin')
// })
// admin.get('/register', (req, res) => {
//     res.render('registerAdmin')
// })
// admin.get('/tables', auth.adminAuth, (req, res) => { res.render('admin/tables') })
// admin.post('/register', controler.create)
// admin.post('/login', controler.login)
// admin.get('/logout', controler.logout)
// admin.get('/:id', auth.adminAuth, controler.admin)
// admin.post('/:id', [auth.adminAuth, uploadImgAdmin.single('foto')], controler.update)
// admin.get('/:id/transaksi', auth.adminAuth, controler.transaksi)
// admin.get('/:id/profile', auth.adminAuth, controler.setting)
// admin.get('/:id/users', auth.adminAuth, controler.getUsers)
// admin.post('/:id/barang', [auth.adminAuth, upload.single('foto')], barangController.create)
// admin.get('/:id/barang', auth.adminAuth, controler.getAllBarang)
// admin.post('/:id/barang/:id', auth.adminAuth, barangController.delete)
// admin.post('/:id/barang/update/:id', [auth.adminAuth, upload.single('foto')], barangController.update)
// admin.post('/:id/transaksi/:id', auth.adminAuth, transaksiController.updateStatus)

module.exports = admin