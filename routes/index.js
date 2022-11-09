const router = require("express").Router();
const authenticate = require("../middlewares/authentication");
const errors = require("../middlewares/errors");
const userRouter = require("./users");
const playerRouter = require("./players");
const positionRouter = require("./positions");

router.use("/users", userRouter);

router.use(authenticate);

router.use("/players", playerRouter);

router.use("/positions", positionRouter);

router.use(errors);

module.exports = router;
