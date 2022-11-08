const express = require("express");
const router = express.Router();
const userRotures = require("./userRoutes");
const gameRoutes = require("./gameRoutes");
const libraryRoutes = require("./libraryRoutes");
const errorHandler = require("../middlewares/errorHandler");
const { authentication } = require("../middlewares/auth");

router.use("/users", userRotures);
router.use("/games", gameRoutes);
router.use(authentication);
//! butuh autentikasi juga ini ya!
router.use("/libraries", libraryRoutes);
router.use(errorHandler);

module.exports = router;
