const express = require("express");
const CategoryController = require("../Controllers/categoryController");
const router = express.Router();

router.get("/", CategoryController.findAllCategories);
router.post("/", CategoryController.createCategory);
router.delete("/:id", CategoryController.deleteCategory);

module.exports = router;
