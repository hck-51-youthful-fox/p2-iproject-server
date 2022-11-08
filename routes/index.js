const express = require("express");
const router = express.Router();
const adminRoutes = require("./admin");
const pubRoutes = require("./pub");

router.use("/admin", adminRoutes);
router.use("/pub", pubRoutes);

module.exports = router;
