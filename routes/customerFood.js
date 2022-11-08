const express = require("express");
const router = express.Router();
const FoodController = require("../controllers/foodController");

router.get("/", FoodController.readAllFoods);

module.exports = router;
