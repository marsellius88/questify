// MonthlyRecordsController.js

const MonthlyRecord = require("../models/MonthlyRecords");
const DailyRecord = require("../models/DailyRecords");

// Create a new monthly record
exports.createMonthlyRecord = async (req, res) => {
  try {
    const { month, year } = req.body;
    let monthlyRecord = await MonthlyRecord.findOne({ month, year });
    if (monthlyRecord) {
      return res
        .status(200)
        .json({ message: "Monthly record already exists." });
    }
    const monthNumber = month + 1;
    if (monthNumber === 0) {
      return res.status(400).json({ message: "Invalid month name provided." });
    }
    monthlyRecord = new MonthlyRecord({ month, year, dailyRecordIds: [] });
    await monthlyRecord.save();
    const daysInMonth = new Date(parseInt(year), monthNumber, 0).getDate();
    const dailyRecords = [];
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(Date.UTC(parseInt(year), monthNumber - 1, day)); 
      const dailyRecord = new DailyRecord({
        monthlyRecordId: monthlyRecord._id,
        date,
      });
      await dailyRecord.save();
      dailyRecords.push(dailyRecord._id);
    }
    monthlyRecord.dailyRecordIds = dailyRecords;
    await monthlyRecord.save();
    return res.status(200).json({ message: "Monthly record created." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a monthly record by month and year
exports.getMonthlyRecordByMonthAndYear = async (req, res) => {
  try {
    const { month, year } = req.params;

    const monthNumber = month + 1;
    if (monthNumber === 0) {
      return res.status(400).json({ message: "Invalid month name provided." });
    }
    const monthlyRecord = await MonthlyRecord.findOne({ month, year });
    if (!monthlyRecord) {
      return res.status(204).send();
    }
    res.status(200).json({ _id: monthlyRecord._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all monthly records
exports.getMonthlyRecords = async (req, res) => {
  try {
    const monthlyRecords = await MonthlyRecord.find().populate(
      "dailyRecordIds"
    );
    res.status(200).json(monthlyRecords);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single monthly record by ID
exports.getMonthlyRecordById = async (req, res) => {
  try {
    const monthlyRecord = await MonthlyRecord.findById(req.params.id).populate(
      "dailyRecordIds"
    );
    if (!monthlyRecord)
      return res.status(404).json({ message: "Monthly record not found" });
    res.status(200).json(monthlyRecord);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a monthly record by ID
exports.updateMonthlyRecord = async (req, res) => {
  try {
    const { month, year, dailyRecordIds } = req.body;
    const monthlyRecord = await MonthlyRecord.findByIdAndUpdate(
      req.params.id,
      { month, year, dailyRecordIds },
      { new: true }
    );
    if (!monthlyRecord)
      return res.status(404).json({ message: "Monthly record not found" });
    res.status(200).json(monthlyRecord);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a monthly record by ID
exports.deleteMonthlyRecord = async (req, res) => {
  try {
    const monthlyRecord = await MonthlyRecord.findByIdAndDelete(req.params.id);
    if (!monthlyRecord)
      return res.status(404).json({ message: "Monthly record not found" });
    res.status(200).json({ message: "Monthly record deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
