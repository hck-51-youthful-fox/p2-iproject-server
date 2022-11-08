const express = require("express");
const AdminController = require("../controllers/adminController");
const router = express.Router();

router.post("/admin/register", AdminController.adminRegister);

module.exports = router;
