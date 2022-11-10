const express = require("express");
const router = express.Router()

const usersRoutes = require(`./usersRoutes`)
const gamesRoutes = require(`./gamesRoutes`)
const genresRoutes = require(`./genresRoutes`)
const reviewsRoutes = require(`./reviewsRoutes`)
const { errorHandler } = require("../middlewares/errorHandler")

router.use(`/users`, usersRoutes)
router.use(`/games`, gamesRoutes)
router.use(`/genres`, genresRoutes)
router.use(`/reviews`, reviewsRoutes)

router.use(errorHandler)

module.exports = router