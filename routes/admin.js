const express = require("express");
const AdminController = require("../Controllers/adminController");
const router = express.Router();
const { authAdmin } = require("../middleware/authentication");

router.post("/register", AdminController.adminRegister);
router.post("/login", AdminController.adminLogin);

router.use(authAdmin);
const categoryRoutes = require("./adminCategories");
router.use("/category", categoryRoutes);

const foodRoutes = require("./adminFood");
router.use("/food", foodRoutes);

module.exports = router;
