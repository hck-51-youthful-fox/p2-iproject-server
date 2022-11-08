const router = require("express").Router();
const Controller = require("../controllers/controller");
const authentication = require("../middleware/authentication");

router.post("/register", Controller.registrasi);
router.post("/login", Controller.login);

router.use(authentication);
router.post("/payments", Controller.payment);
router.patch("/payments/:id", Controller.premium);

module.exports = router;
