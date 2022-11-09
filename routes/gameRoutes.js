const express = require("express");
const router = express.Router();
const Controller = require("../controllers/gameController");
const { authorization } = require("../middlewares/auth");

router.get("/", Controller.fetchGames);
router.get("/free-games", Controller.fetchFreeGames);
router.get("/:id", Controller.fetchGameDetail);
router.get("/free-games/:id", Controller.fetchFreeGameDetail);
router.post("/:id", authorization, Controller.addToLibrary);
router.post("/free-games/:id", Controller.addToLibrary);

module.exports = router;
