const express = require("express");
const router = express.Router()

// const logsRoutes = require(`./logsRoutes`)
// const moviesRoutes = require(`./moviesRoutes`)
// const genresRoutes = require(`./genresRoutes`)
const usersRoutes = require(`./usersRoutes`)
// const publicRoutes = require(`./publicRoutes`)
const { errorHandler } = require("../middlewares/errorHandler")

router.post(`/`, Controller.homepage)

// router.use(`/pub`,publicRoutes)
router.use(`/users`, usersRoutes)


// router.use(`/logs`, logsRoutes)
// router.use(`/movies`, moviesRoutes)
// router.use(`/genres`, genresRoutes)

router.use(errorHandler)

module.exports = router

router.use()