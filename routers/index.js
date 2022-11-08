const express = require("express");
const router = express.Router()

const usersRoutes = require(`./usersRoutes`)
const gamesRoutes = require(`./gamesRoutes`)
const genresRoutes = require(`./genresRoutes`)

// const logsRoutes = require(`./logsRoutes`)
// const publicRoutes = require(`./publicRoutes`)

const { errorHandler } = require("../middlewares/errorHandler")

router.use(`/users`, usersRoutes)
router.use(`/games`,gamesRoutes)
router.use(`/genres`, genresRoutes)
// router.use(`/logs`, logsRoutes)


// router.use(`/movies`, moviesRoutes)

router.use(errorHandler)

module.exports = router

router.use()