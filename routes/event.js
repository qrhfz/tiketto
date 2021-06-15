const event = require('express').Router()
const controller = require('../controller/eventApi')
const auth = require('../middleware/auth')

event.get('/', controller.showAll)
event.post('/', auth.adminAuth, controller.create)
event.put('/:id', controller.update)
event.delete('/:id', controller.delete)

module.exports = event