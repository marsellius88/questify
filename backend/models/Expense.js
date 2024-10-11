const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema({
  dailyRecordId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "DailyRecord",
  },
  name: { type: String, required: true },
  platform: { type: String, required: true },
  payment: { type: String, required: true },
  price: { type: Number, required: true },
  amount: { type: Number, required: true },
});

module.exports = mongoose.model("Expense", ExpenseSchema);
