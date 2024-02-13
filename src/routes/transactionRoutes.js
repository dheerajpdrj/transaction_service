const express = require("express");
const { addNumbers } = require("../controllers/transactionController");

const router = express.Router();

router.post("/add", addNumbers);

module.exports = router;
