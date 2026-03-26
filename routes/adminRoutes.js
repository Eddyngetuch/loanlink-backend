const express = require("express");
const router = express.Router();

const {
  getAllLoans,
  approveLoan,
  rejectLoan,
} = require("../controllers/loanController");

const protect = require("../middleware/authMiddleware");

// GET ALL LOANS
router.get("/loans", protect, getAllLoans);

// APPROVE LOAN
router.put("/loan/:id/approve", protect, approveLoan);

// REJECT LOAN
router.put("/loan/:id/reject", protect, rejectLoan);

module.exports = router;