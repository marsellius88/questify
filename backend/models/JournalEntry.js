const mongoose = require("mongoose");

const JournalEntrySchema = new mongoose.Schema({
  dailyRecordId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "DailyRecord",
  },
  grateful: String,
  highlights: String,
  mood: { type: String, required: true },
  sleepDuration: { type: Number, required: true },
  thoughts: String,
  waterIntake: { type: Number, required: true },
});

module.exports = mongoose.model("JournalEntry", JournalEntrySchema);
