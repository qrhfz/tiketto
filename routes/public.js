const public = require('express').Router()
const userController = require('../controller/user')

public.get('/', (req, res) => {
    res.render('index')
})
public.get('/register', (req, res) => { res.render('registerUser') })
public.post('/register', userController.create)
public.get('/login', (req, res) => { res.render('loginUser') })
public.post('/login', userController.login)
public.get('/logout', userController.logout)


public.get('/about', (req, res) => {
    res.render('public/about')
})

public.get('/jadwal', (req, res) => {
    res.render('/public/jadwal')
})
module.exports = public