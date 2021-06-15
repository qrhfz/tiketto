const public = require('express').Router()
const userController = require('../controller/user')

public.get('/', (req, res) => {
    res.render('index')
})
public.get('/register', (req, res) => { res.render('registerUser') })
public.post('/register', userController.create)
public.get('/makanan', (req, res) => {
    res.render('public/')
})

public.get('/about', (req, res) => {
    res.render('public/about')
})
public.get('/makanan/:id', (req, res) => {
    res.render('/public/detail')
})
public.get('/jadwal', (req, res) => {
    res.render('/public/jadwal')
})
module.exports = public