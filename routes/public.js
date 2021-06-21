const public = require('express').Router()
const userController = require('../controller/user')
const eventController = require('../controller/event')
const auth = require('../middleware/auth')

public.get('/', eventController.showAll)
public.get('/register', (req, res) => { res.render('registerUser') })
public.post('/register', userController.create)
public.get('/login', (req, res) => { res.render('loginUser') })
public.post('/login', userController.login)
public.get('/logout', userController.logout)
public.get('/testadminpage', auth.userAuth, (req, res) => { res.json({ kamu: 'admin' }) })

public.get('/about', (req, res) => {
    res.render('public/about')
})

public.get('/jadwal', (req, res) => {
    res.render('/public/jadwal')
})
module.exports = public