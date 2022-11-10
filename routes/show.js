const express = require("express");
const Controller = require("../controllers/show");
const router = express.Router();

router.get("/", Controller.fetchShows);
router.get("/search", Controller.searchShows)
router.get("/:showId", Controller.fetchShowById);

module.exports = router;
