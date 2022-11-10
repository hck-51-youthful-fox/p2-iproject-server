const express = require("express");
const Controller = require("../controllers/controller");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");
const router = express.Router();

router.get("/", Controller.getPets);
router.get("/:id", Controller.getPetDetails);
router.post("/:id", authentication, Controller.rentPet);

module.exports = router;
