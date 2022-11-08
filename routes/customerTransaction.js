const express = require("express");
const router = express.Router();
const TransactionController = require("../controllers/transactionController");

router.post("/", TransactionController.createTransaction);
router.get("/", TransactionController.readAllTransaction);

module.exports = router;
