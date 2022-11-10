const express = require("express");
const router = express.Router();
const Controller = require("../controllers/libraryController");

router.get("/", Controller.fetchMyLibrary);
router.get("/favorite", Controller.fetchFavorites);
router.delete("/favorite/:id", Controller.removeFromLibrary);
router.patch("/favorite/:id", Controller.updateFavorite);
router.put("/favorite/:id", Controller.updateStatus);

module.exports = router;
