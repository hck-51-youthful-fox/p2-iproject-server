const express = require(`express`)
const Controller = require("../controllers/usersController")
const { loginAuthentication } = require("../middlewares/authentication")
const router = express.Router()

router.post(`/login`, Controller.userLogin)
router.post(`/register`, Controller.userRegister)
router.post(`/google-login`, Controller.googleLogin)

router.use(loginAuthentication)

router.get(`/details`, Controller.fetchUserDetails)
router.put(`/details`, Controller.editUserDetails)
router.patch('/details/verify', Controller.verifyUser)

module.exports = router