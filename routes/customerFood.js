const express = require("express");
const router = express.Router();
const FoodController = require("../controllers/foodController");

router.get("/", FoodController.readAllFoods);
router.get("/:id", FoodController.findFoodById);

module.exports = router;
