const event = require('express').Router()
const controller = require('../controller/eventApi')
const auth = require('../middleware/auth')

event.get('/', controller.showAll)
event.post('/', auth.adminAuth, controller.create)
event.patch('/:id', auth.adminAuth, controller.update)
event.delete('/:id', auth.adminAuth, controller.delete)

module.exports = event