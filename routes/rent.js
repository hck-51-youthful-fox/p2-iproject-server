const express = require("express");
const router = express.Router();
const Controller = require("../controllers/rent");
const authorization = require("../middlewares/authorize");

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get("/myrent", Controller.getRented);
router.post("/:ShowId", upload.single("image"), Controller.addRent);
router.delete("/:id", authorization, Controller.removeRent);

module.exports = router;
