const express = require("express");
const router = express.Router();
const Controller = require("../controllers/controllers");
const authUser = require("../middlewares/authentification");
const errorsHandler = require("../middlewares/errorHandlers");

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/register", Controller.register);
router.post("/login", Controller.login);
router.post("/google-sign-in", Controller.googleSignIn);

router.use(authUser);
router.post("/product", upload.single("img"), Controller.addProduct);

router.use(errorsHandler);

module.exports = router;
