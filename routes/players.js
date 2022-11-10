const router = require("express").Router();
const Controller = require("../controllers/playerControllers");

router.get("/", Controller.viewAllPlayers);

module.exports = router;
