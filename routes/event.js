const event = require('express').Router()
const controller = require('../controller/event')
const auth = require('../middleware/auth')

event.get('/', controller.showAll)
event.get('/:id', controller.showOne)

//update event
event.get('/:id/edit', auth.adminAuth, controller.editPage)
event.post('/:id', auth.adminAuth, controller.update)

event.post('/', auth.adminAuth, controller.create)
event.get('/:id/delete', auth.adminAuth, controller.delete)

module.exports = event