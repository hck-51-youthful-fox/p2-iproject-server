const express = require("express");
const router = express.Router();
const Controller = require("../controllers/user")

router.post("/register", Controller.register)
router.post("/login", Controller.login)
router.post("/google-login", Controller.google)
router.get("/verify/:uniqueStr", Controller.verify)

module.exports = router;
