const multer = require('multer')
const imgProfileStorage = require('./imgProfileStorage')

const upload = multer({
    storage: imgProfileStorage
})

module.exports = upload