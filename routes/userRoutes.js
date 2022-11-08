const express = require('express')
const router = express.Router()
const UserController = require('../controllers/userController')

router.post('/register', UserController.renderFormRegister)

module.exports = router