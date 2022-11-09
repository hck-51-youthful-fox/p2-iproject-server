const express = require("express");
const authUser = require("../middlewares/authentication");
const errorHandler = require("../middlewares/errorHandler");
const user = require("./user");
const show = require("./show");
const rent = require("./rent")
const router = express.Router();

router.use("/", show);
router.use("/users", user);

router.use(authUser);
router.use("/rents", rent)

router.use(errorHandler);


module.exports = router;
