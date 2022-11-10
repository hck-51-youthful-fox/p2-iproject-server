const router = require("express").Router();
const Controller = require("../controllers/apiControllers");

router.get("/leagueData", Controller.viewLeagueData);

router.get("/premier", Controller.viewPremierLeague);

router.get("/search", Controller.searchPlayer);

module.exports = router;
