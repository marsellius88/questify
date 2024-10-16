// ExpenseController.js

const DailyRecords = require("../models/DailyRecords");
const Expense = require("../models/Expense");

// Create a new expense
exports.createExpense = async (req, res) => {
  try {
    const dailyRecord = await DailyRecords.findById(req.body.dailyRecordId);
    if (!dailyRecord) {
      return res.status(404).json({ message: "Daily record not found" });
    }

    const { dailyRecordId, name, platform, payment, price, amount } = req.body;
    const expense = new Expense({
      dailyRecordId,
      name,
      platform,
      payment,
      price,
      amount,
    });

    const savedExpense = await expense.save();
    const expenseId = savedExpense._id;
    dailyRecord.expenseIds.push(expenseId);
    await dailyRecord.save();

    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all expenses
exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find().populate("dailyRecordId");
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single expense by ID
exports.getExpenseById = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id).populate(
      "dailyRecordId"
    );
    if (!expense) return res.status(404).json({ message: "Expense not found" });
    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an expense by ID
exports.updateExpense = async (req, res) => {
  try {
    const { dailyRecordId, name, platform, payment, price, amount } = req.body;
    const expense = await Expense.findByIdAndUpdate(
      req.params.id,
      { dailyRecordId, name, platform, payment, price, amount },
      { new: true }
    );
    if (!expense) return res.status(404).json({ message: "Expense not found" });
    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete an expense by ID
exports.deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findByIdAndDelete(req.params.id);
    if (!expense) return res.status(404).json({ message: "Expense not found" });
    await DailyRecords.findByIdAndUpdate(expense.dailyRecordId, {
      $pull: { expenseIds: expense._id },
    });
    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
