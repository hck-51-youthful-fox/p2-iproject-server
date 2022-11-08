const express = require("express");
const router = express.Router();
const Controller = require("../controllers/gameController");

router.get("/", Controller.fetchGames);
router.get("/free-games", Controller.fetchFreeGames);
router.get("/:id", Controller.fetchGameDetail);
router.get("/free-games/:id", Controller.fetchFreeGameDetail);

module.exports = router;
