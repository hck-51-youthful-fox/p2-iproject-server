const express = require("express");
const router = express.Router();
const Controller = require("../controllers/userController");

router.post("/register", Controller.register);
router.post("/login", Controller.login);
router.post("/google-login", Controller.googleLogin);

// payment
router.get("/payment-test", Controller.subscription);

module.exports = router;
