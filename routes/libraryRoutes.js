const express = require("express");
const router = express.Router();
const Controller = require("../controllers/libraryController");

router.get("/", Controller.fetchMyLibrary);
router.get("/favorite", Controller.fetchFavorites);
router.post("/:id", Controller.addToLibrary);
router.patch("/:id/favorite", Controller.addToFavorites);

module.exports = router;
