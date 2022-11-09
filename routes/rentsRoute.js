const express = require("express");
const Controller = require("../controllers/controller");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");
const router = express.Router();

router.get("/", Controller.getRents);
router.put("/:id", authentication, authorization, Controller.review);

module.exports = router;
