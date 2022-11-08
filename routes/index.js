const express = require('express')
const router = express.Router()
const userRoutes = require('./userRoutes')
const errorHandler = require('../middlewares/errorHandler')

// ! Daftar routes
// ? USERS
router.use('/users', userRoutes)

// ! Error Handler
router.use(errorHandler)

module.exports = router