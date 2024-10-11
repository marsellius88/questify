// controllers/ExpenseController.js
const Expense = require('../models/Expense');
const DailyRecord = require('../models/DailyRecords');

// Create Expense
exports.createExpense = async (req, res) => {
  try {
    const { dailyRecordId, name, platform, payment, price, amount } = req.body;

    // Check if DailyRecord exists
    const dailyRecord = await DailyRecord.findById(dailyRecordId);
    if (!dailyRecord) {
      return res.status(404).json({ message: 'DailyRecord not found' });
    }

    const expense = new Expense({ dailyRecordId, name, platform, payment, price, amount });
    const savedExpense = await expense.save();

    // Add expense to dailyRecord's expenseIds array
    dailyRecord.expenseIds.push(savedExpense._id);
    await dailyRecord.save();

    res.status(201).json(savedExpense);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get All Expenses
exports.getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find().populate('dailyRecordId');
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Single Expense by ID
exports.getExpenseById = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id).populate('dailyRecordId');
    if (!expense) return res.status(404).json({ message: 'Expense not found' });
    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Expense
exports.updateExpense = async (req, res) => {
  try {
    const { dailyRecordId, name, platform, payment, price, amount } = req.body;

    // Check if DailyRecord exists
    const dailyRecord = await DailyRecord.findById(dailyRecordId);
    if (!dailyRecord) {
      return res.status(404).json({ message: 'DailyRecord not found' });
    }

    const updatedExpense = await Expense.findByIdAndUpdate(
      req.params.id,
      { dailyRecordId, name, platform, payment, price, amount },
      { new: true }
    );
    if (!updatedExpense) return res.status(404).json({ message: 'Expense not found' });

    res.status(200).json(updatedExpense);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete Expense
exports.deleteExpense = async (req, res) => {
  try {
    const deletedExpense = await Expense.findByIdAndDelete(req.params.id);
    if (!deletedExpense) return res.status(404).json({ message: 'Expense not found' });

    // Remove the expense from DailyRecord's expenseIds array
    await DailyRecord.findByIdAndUpdate(deletedExpense.dailyRecordId, {
      $pull: { expenseIds: deletedExpense._id }
    });

    res.status(200).json({ message: 'Expense deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
