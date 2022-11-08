const express = require("express");
const AdminController = require("../controllers/adminController");
const router = express.Router();

router.post("/register", AdminController.adminRegister);
router.post("/login", AdminController.adminLogin);

const categoryRoutes = require("./categories");
router.use("/category", categoryRoutes);

module.exports = router;
