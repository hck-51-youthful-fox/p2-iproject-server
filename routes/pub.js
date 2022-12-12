const express = require("express");
const CustomerController = require("../Controllers/customerController");
const router = express.Router();
const foodRoutes = require("./customerFood");
const cartRoutes = require("./customerCart");
const transactionRoutes = require("./customerTransaction");
const { authCustomer } = require("../middleware/authentication");
const CategoryController = require("../Controllers/categoryController");

router.post("/register", CustomerController.customerRegister);
router.post("/login", CustomerController.customerLogin);
router.use("/food", foodRoutes);
router.get("/categories", CategoryController.findAllCategories);

router.use(authCustomer);

router.use("/cart", cartRoutes);
router.use("/transaction", transactionRoutes);

module.exports = router;
