const express = require(`express`)
const Controller = require("../controllers/genresController")
const router = express.Router()

router.get(`/`, Controller.fetchGenres)

module.exports = router