const express = require("express");
const router = express.Router();
const Controller = require("../controllers/userController");
const { authentication } = require("../middlewares/auth");

router.post("/register", Controller.register);
router.post("/login", Controller.login);
router.post("/google-login", Controller.googleLogin);

// payment
router.use(authentication);
router.get("/payment-test", Controller.subscription);
router.patch("/payment-success", Controller.paymentSuccess);

module.exports = router;
