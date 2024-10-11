const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  dailyRecordId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "DailyRecord",
  },
  title: { type: String, required: true },
  due: Date,
  note: String,
  priority: Boolean,
  done: Boolean,
});

module.exports = mongoose.model("Todo", TodoSchema);
