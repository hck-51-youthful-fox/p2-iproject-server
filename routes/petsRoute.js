const express = require("express");
const Controller = require("../controllers/controller");
const router = express.Router();

router.get("/", Controller.getPets);
router.get("/:id", Controller.getPetDetails);

module.exports = router;
