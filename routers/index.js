const express = require("express");
const router = express.Router();
const Controller = require("../controllers/controllers");
const authUser = require("../middlewares/authentification");
const errorsHandler = require("../middlewares/errorHandlers");

const multer = require("multer");
const { updateProductStatus } = require("../controllers/controllers");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/register", Controller.register);
router.post("/login", Controller.login);
router.post("/google-sign-in", Controller.googleSignIn);
router.get("/product", Controller.productList);

router.use(authUser);
router.post("/product", upload.single("img"), Controller.addProduct);
router.post("/midtrans", Controller.midtransTransaction);
router.patch("/product", updateProductStatus);

router.use(errorsHandler);

module.exports = router;
