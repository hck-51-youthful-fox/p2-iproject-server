const express = require("express");
const authUser = require("../middlewares/authentication");
const errorHandler = require("../middlewares/errorHandler");
const user = require("../models/user");
const router = express.Router();

router.use("/users", user)


router.use(authUser)

router.use(errorHandler)