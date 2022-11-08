const express = require("express");
const AdminController = require("../controllers/adminController");
const router = express.Router();

router.post("/admin/register", AdminController.adminRegister);
router.post("/admin/login", AdminController.adminLogin);

module.exports = router;
