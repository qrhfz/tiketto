const multer = require('multer')
const imgAdminStorage = require('./imgAdminStorage')

const upload = multer({
    storage: imgAdminStorage
})

module.exports = upload