const Loan = require("../models/Loan");

// CREATE LOAN
const createLoan = async (req, res) => {
  try {
    const { name, amount } = req.body;

    const loan = await Loan.create({
      user: req.user.id,
      name,
      amount,
      status: "pending",
    });

    res.status(201).json({
      message: "Loan created",
      loan,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET USER LOANS
const getMyLoans = async (req, res) => {
  try {
    const loans = await Loan.find({ user: req.user.id });

    res.json(loans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ADMIN: GET ALL LOANS
const getAllLoans = async (req, res) => {
  try {
    const loans = await Loan.find().populate("user", "fullName email");

    res.json(loans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// APPROVE LOAN
const approveLoan = async (req, res) => {
  try {
    const loan = await Loan.findById(req.params.id);

    if (!loan) {
      return res.status(404).json({ message: "Loan not found" });
    }

    loan.status = "approved";
    await loan.save();

    res.json({
      message: "Loan approved",
      loan,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// REJECT LOAN
const rejectLoan = async (req, res) => {
  try {
    const loan = await Loan.findById(req.params.id);

    if (!loan) {
      return res.status(404).json({ message: "Loan not found" });
    }

    loan.status = "rejected";
    await loan.save();

    res.json({
      message: "Loan rejected",
      loan,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createLoan,
  getMyLoans,
  getAllLoans,
  approveLoan,
  rejectLoan,
};