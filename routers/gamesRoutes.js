const express = require(`express`)
const Controller = require("../controllers/gamesController")
const { loginAuthentication } = require("../middlewares/authentication")
const router = express.Router()

router.get(`/`, Controller.fetchGames)
router.get(`/explore`, loginAuthentication, Controller.exploreGames)
router.get(`/:id`, Controller.fetchGameById)

// router.post(`/explore/:id`,Controller.postGameFromExplore)

module.exports = router