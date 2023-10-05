const express = require('express')

const router = express.Router()

const Auth = require('../controllers/auth')

router.get('/', Auth.beranda)

router.get('/login', Auth.viewLogin)
router.post('/login', Auth.postLogin)
router.get('/register', Auth.viewRegister)
router.post('/register', Auth.postRegister)
router.get('/logout', Auth.actionLogOut)

module.exports = router
