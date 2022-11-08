const express = require(`express`)
const Controller = require("../controllers/reviewsController")
const router = express.Router()

router.post(`/`, Controller.postReview)
router.get(`/:gameId`, Controller.fetchReviewsByGameId)

module.exports = router