const user = require('express').Router()
const controller = require('../controller/user')
const auth = require('../middleware/auth')
const uploadProfileImg = require('../services/uploadImgProfile')

user.get('/:id', auth.userAuth, controller.user)
user.post('/:id', [auth.userAuth, uploadProfileImg.single('foto')], controller.update)



module.exports = user