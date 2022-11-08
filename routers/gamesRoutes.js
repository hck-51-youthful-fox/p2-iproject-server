const express = require(`express`)
const Controller = require("../controllers/gamesController")
const router = express.Router()

router.get(`/`, Controller.fetchGames)
router.get(`/explore`, Controller.exploreGames)
router.post(`/explore`,Controller.postGameFromExplore)

module.exports = router