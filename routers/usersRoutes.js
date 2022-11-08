const express = require(`express`)
const Controller = require("../controllers/usersController")
const router = express.Router()

router.post(`/login`, Controller.userLogin)
router.post(`/register`, Controller.userRegister)
router.post(`/google-login`, Controller.googleLogin)

module.exports = router