const express = require("express");
const router = express.Router();
const gameRoutes = require("./gameRoutes");
const userRotures = require("./userRoutes");
const libraryRoutes = require("./libraryRoutes");

router.use("/users", userRotures);
router.use("/games", gameRoutes);
router.use("/library", libraryRoutes);

module.exports = router;
