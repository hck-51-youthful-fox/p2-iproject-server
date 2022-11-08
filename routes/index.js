const express = require("express");
const router = express.Router();
const userRotures = require("./userRoutes");
const gameRoutes = require("./gameRoutes");
const libraryRoutes = require("./libraryRoutes");
const errorHandler = require("../middlewares/errorHandler");

router.use("/users", userRotures);
router.use("/games", gameRoutes);
router.use("/library", libraryRoutes);
router.use(errorHandler);

module.exports = router;
