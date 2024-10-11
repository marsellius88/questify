// routes/ExpenseRoutes.js
const express = require('express');
const router = express.Router();
const ExpenseController = require('../controllers/ExpenseController');

// Create a new expense
router.post('/', ExpenseController.createExpense);

// Get all expenses
router.get('/', ExpenseController.getAllExpenses);

// Get a single expense by ID
router.get('/:id', ExpenseController.getExpenseById);

// Update an expense by ID
router.put('/:id', ExpenseController.updateExpense);

// Delete an expense by ID
router.delete('/:id', ExpenseController.deleteExpense);

module.exports = router;
