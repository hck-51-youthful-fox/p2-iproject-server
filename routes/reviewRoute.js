const express = require("express");
const Controller = require("../controllers/controller");

const router = express.Router();

router.get("/:id", Controller.getReviews);

module.exports = router;
