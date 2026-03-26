const express = require("express");
const router = express.Router();

const {
  createLoan,
  getMyLoans,
} = require("../controllers/loanController");

const protect = require("../middleware/authMiddleware");

// CREATE LOAN
router.post("/create", protect, createLoan);

// GET MY LOANS
router.get("/my-loans", protect, getMyLoans);

module.exports = router;