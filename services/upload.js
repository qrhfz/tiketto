const multer = require('multer')
const imgProdukStorage = require('./imgProdukStorage')

const upload = multer({
    storage: imgProdukStorage
})

module.exports = upload