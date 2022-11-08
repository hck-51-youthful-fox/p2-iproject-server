const express = require("express");
const CustomerController = require("../controllers/customerController");
const router = express.Router();

router.post("/register", CustomerController.customerRegister);
router.post("/login", CustomerController.customerLogin);

module.exports = router;
