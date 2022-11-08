const express = require(`express`)
const Controller = require("../controllers/gamesController")
const { loginAuthentication } = require("../middlewares/authentication")
const router = express.Router()

router.get(`/`, Controller.fetchGames)

router.use(loginAuthentication)

router.get(`/explore`, Controller.exploreGames)
router.post(`/explore`,Controller.postGameFromExplore)

module.exports = router