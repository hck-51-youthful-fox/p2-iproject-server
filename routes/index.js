const router = require("express").Router();
const userRouter = require("./user");
const authenticate = require("../middlewares/authentication");
const errors = require("../middlewares/errors");

router.use("/user", userRouter);

router.use(authenticate);

router.use(errors);

module.exports = router;
