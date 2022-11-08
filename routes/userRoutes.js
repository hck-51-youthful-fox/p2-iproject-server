const express = require('express')
const router = express.Router()
const UserController = require('../controllers/userController')

router.post('/register', UserController.renderFormRegister)

router.post('/login', UserController.renderFormLogin)

module.exports = router