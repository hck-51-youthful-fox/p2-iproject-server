const express = require("express");
const router = express.Router();
const Controller = require("../controllers/controllers");
const authUser = require("../middlewares/authentification");
const errorsHandler = require("../middlewares/errorHandlers");

router.post("/register", Controller.register);
router.post("/login", Controller.login);
router.post("/google-sign-in", Controller.googleSignIn);

router.use(authUser);

router.use(errorsHandler);

module.exports = router;
