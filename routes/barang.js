const barang = require('express').Router()
const controller = require('../controller/barangApi')
const auth = require('../middleware/auth')

barang.get('/getall', controller.showAll)
barang.post('/create', controller.create)
barang.put('/:id', controller.update)
barang.delete('/:id', controller.delete)

module.exports = barang