const express = require("express");
const router = express.Router();
const petsRouter = require("./petsRoute");
const rentsRouter = require("./rentsRoute");
const typesRouter = require("./typesRoute");
const usersRouter = require("./usersRoute");
const reviewRouter = require("./reviewRoute");
const authentication = require("../middlewares/authentication");
const errorHandler = require("../middlewares/errorHandler");

router.use("/users", usersRouter);
router.use("/pets", petsRouter);
router.use("/types", typesRouter);
router.use("/reviews", reviewRouter);
router.use("/rents", authentication, rentsRouter);
router.use(errorHandler);

module.exports = router;
