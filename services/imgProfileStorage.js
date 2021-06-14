const multer = require('multer')
const path = require('path')
const date = new Date()

const imgProfileStorage = multer.diskStorage({
    destination: path.join(__dirname + '../../public/assets/images/userProfile'),
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + date.getFullYear() + date.getMonth() + date.getDate() + date.getHours() + date.getMinutes() +
            path.extname(file.originalname));
    }
})

module.exports = imgProfileStorage