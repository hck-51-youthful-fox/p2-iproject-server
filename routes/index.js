const router = require("express").Router();
const userRouter = require("./users");
const playerRouter = require("./players");
const authenticate = require("../middlewares/authentication");
const errors = require("../middlewares/errors");

router.use("/users", userRouter);

router.use(authenticate);

router.use("/players", playerRouter);

router.use(errors);

module.exports = router;
