const express = require("express");
const router = express.Router();
const userRoutes = require("./user");
const apisRoutes = require("./apis");
const authentication = require("../middlewares/authentication");

router.use("/", userRoutes);
router.use(authentication);
router.use("/nba", apisRoutes);

module.exports = router;
