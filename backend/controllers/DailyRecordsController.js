// DailyRecordsController.js

const DailyRecord = require("../models/DailyRecords");

// Create a new daily record
exports.createDailyRecord = async (req, res) => {
  try {
    const { monthlyRecordId, date, expenseIds, todoIds, journalId } = req.body;
    const dailyRecord = new DailyRecord({ monthlyRecordId, date, expenseIds, todoIds, journalId });
    await dailyRecord.save();
    res.status(201).json(dailyRecord);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all daily records
exports.getDailyRecords = async (req, res) => {
  try {
    const dailyRecords = await DailyRecord.find()
      .populate("monthlyRecordId")
      .populate("expenseIds")
      .populate("todoIds")
      .populate("journalId");
    res.status(200).json(dailyRecords);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single daily record by monthlyRecordId
exports.getDailyRecordByMonthlyRecordId = async (req, res) => {
  try {
    const dailyRecords = await DailyRecord.find({
      monthlyRecordId: req.params.monthlyRecordId,
    }).populate("monthlyRecordId");
    
    res.status(200).json(dailyRecords);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single daily record by ID
exports.getDailyRecordById = async (req, res) => {
  try {
    const dailyRecord = await DailyRecord.findById(req.params.id)
      .populate("monthlyRecordId")
      .populate("expenseIds")
      .populate("todoIds")
      .populate("journalId");
    if (!dailyRecord) return res.status(404).json({ message: "Daily record not found" });
    res.status(200).json(dailyRecord);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a daily record by ID
exports.updateDailyRecord = async (req, res) => {
  try {
    const { monthlyRecordId, date, expenseIds, todoIds, journalId } = req.body;
    const dailyRecord = await DailyRecord.findByIdAndUpdate(
      req.params.id,
      { monthlyRecordId, date, expenseIds, todoIds, journalId },
      { new: true }
    );
    if (!dailyRecord) return res.status(404).json({ message: "Daily record not found" });
    res.status(200).json(dailyRecord);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a daily record by ID
exports.deleteDailyRecord = async (req, res) => {
  try {
    const dailyRecord = await DailyRecord.findByIdAndDelete(req.params.id);
    if (!dailyRecord) return res.status(404).json({ message: "Daily record not found" });
    res.status(200).json({ message: "Daily record deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
