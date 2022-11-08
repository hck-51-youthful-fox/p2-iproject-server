const express = require("express");
const AdminController = require("../controllers/adminController");
const router = express.Router();
const { authAdmin } = require("../middleware/authentication");

router.post("/register", AdminController.adminRegister);
router.post("/login", AdminController.adminLogin);

router.use(authAdmin);
const categoryRoutes = require("./categories");
router.use("/category", categoryRoutes);

const foodRoutes = require("./foods");
router.use("/food", foodRoutes);

module.exports = router;
