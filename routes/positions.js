const router = require("express").Router();
const Controller = require("../controllers/positionControllers");

router.post("/", Controller.addPositions);

router.get("/", Controller.viewPositions);

module.exports = router;
