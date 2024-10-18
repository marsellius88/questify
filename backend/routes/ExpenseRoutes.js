// ExpenseRoutes.js

const express = require("express");
const router = express.Router();
const ExpenseController = require("../controllers/ExpenseController");

// Create a new expense
router.post("/", ExpenseController.createExpense);

// Get all expenses
router.get("/", ExpenseController.getExpenses);

// Get a single expense by ID
router.get("/:id", ExpenseController.getExpenseById);

// Get six month total expenses
router.get("/monthly/total", ExpenseController.getMonthlyExpenses);

// Update an expense by ID
router.put("/:id", ExpenseController.updateExpense);

// Delete an expense by ID
router.delete("/:id", ExpenseController.deleteExpense);

// Get payment distribution
router.get("/payment/distribution", ExpenseController.getPaymentDistribution);

module.exports = router;
