const mongoose = require("mongoose");

const DailyRecordSchema = new mongoose.Schema({
  date: { type: Date, required: true, unique: true },
  expenseIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Expense" }],
  todoIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Todo" }],
  journalId: { type: mongoose.Schema.Types.ObjectId, ref: "JournalEntry" },
});

module.exports = mongoose.model("DailyRecord", DailyRecordSchema);
