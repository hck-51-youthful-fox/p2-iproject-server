const express = require("express");
const Controller = require("../controllers/controller");
const router = express.Router();

router.post("/register", Controller.register);
router.post("/login", Controller.login);
router.post("/google-login", Controller.googleLogin);

module.exports = router;
