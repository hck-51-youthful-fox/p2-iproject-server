const express = require("express");
const router = express.Router();
const FoodController = require("../Controllers/foodController");

router.get("/", FoodController.findAllFoods);
router.get("/:id", FoodController.findFoodById);
router.post("/", FoodController.createFood);
router.put("/:id", FoodController.editFood);
router.delete("/:id", FoodController.deleteFood);

module.exports = router;
