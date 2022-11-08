const express = require("express");
const errorHandler = require("../middlewares/errorHandler");
const user = require("../models/user");
const router = express.Router();

router.use("/users", user)




router.use(errorHandler)