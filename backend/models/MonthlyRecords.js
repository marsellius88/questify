const mongoose = require("mongoose");

const MonthlyRecordSchema = new mongoose.Schema({
  month: { type: String, required: true },
  year: { type: Number, required: true },
  dailyRecordIds: [
    { type: mongoose.Schema.Types.ObjectId, ref: "DailyRecord" },
  ],
});

module.exports = mongoose.model("MonthlyRecord", MonthlyRecordSchema);
