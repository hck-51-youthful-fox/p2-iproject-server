const express = require("express");
const router = express.Router();
const petsRouter = require("./petsRoute");
const rentsRouter = require("./rentsRoute");
const reviewsRouter = require("./reviewsRoute");
const usersRouter = require("./usersRoute");
const authentication = require("../middlewares/authentication");
const errorHandler = require("../middlewares/errorHandler");

router.use("/users", usersRouter);
// router.use("/pets", petsRouter);
// router.use("/rents", authentication, rentsRouter);
// router.use("/reviews", authentication, reviewsRouter);
router.use(errorHandler);

module.exports = router;
