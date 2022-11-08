const express = require(`express`)
const Controller = require("../controllers/reviewsController")
const { loginAuthentication } = require("../middlewares/authentication")
const router = express.Router()

router.get(`/:gameId`, Controller.fetchReviewsByGameId)

router.use(loginAuthentication)

router.post(`/:gameId`, Controller.postReview)

module.exports = router