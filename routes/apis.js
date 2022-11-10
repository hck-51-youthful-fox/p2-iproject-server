const express = require("express");
const router = express.Router();
const Controller = require("../controllers/controller");

router.get("/live-score", Controller.getLiveScore);
router.get("/nba-league", Controller.getNBA);
router.get("/standings", Controller.getStanding);
router.post("/payment", Controller.payment);
router.patch("/update", Controller.statusUpdate);

module.exports = router;
