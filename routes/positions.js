const router = require("express").Router();
const Controller = require("../controllers/positionControllers");

router.post("/", Controller.addPositions);

// router.get('/', viewPosition)

module.exports = router;
