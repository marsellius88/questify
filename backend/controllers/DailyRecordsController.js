// controllers/DailyRecordsController.js
const DailyRecord = require('../models/DailyRecords');

// Create Daily Record
exports.createDailyRecord = async (req, res) => {
    try {
      const { date } = req.body;
      const dailyRecord = new DailyRecord({
        date,
        expenseIds: [],
        todoIds: [],
        journalId: null
      });
      const savedRecord = await dailyRecord.save();
      res.status(201).json(savedRecord);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

// exports.createDailyRecord = async (req, res) => {
//   try {
//     const { date, expenseIds, todoIds, journalId } = req.body;
//     const dailyRecord = new DailyRecord({ date, expenseIds, todoIds, journalId });
//     const savedRecord = await dailyRecord.save();
//     res.status(201).json(savedRecord);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// Get All Daily Records
exports.getAllDailyRecords = async (req, res) => {
  try {
    const records = await DailyRecord.find()
      .populate('expenseIds')
      .populate('todoIds')
      .populate('journalId');
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Single Daily Record by ID
exports.getDailyRecordById = async (req, res) => {
  try {
    const record = await DailyRecord.findById(req.params.id)
      .populate('expenseIds')
      .populate('todoIds')
      .populate('journalId');
    if (!record) return res.status(404).json({ message: 'Daily Record not found' });
    res.status(200).json(record);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Daily Record
exports.updateDailyRecord = async (req, res) => {
  try {
    const { date, expenseIds, todoIds, journalId } = req.body;
    const updatedRecord = await DailyRecord.findByIdAndUpdate(
      req.params.id,
      { date, expenseIds, todoIds, journalId },
      { new: true }
    );
    if (!updatedRecord) return res.status(404).json({ message: 'Daily Record not found' });
    res.status(200).json(updatedRecord);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete Daily Record
exports.deleteDailyRecord = async (req, res) => {
  try {
    const deletedRecord = await DailyRecord.findByIdAndDelete(req.params.id);
    if (!deletedRecord) return res.status(404).json({ message: 'Daily Record not found' });
    res.status(200).json({ message: 'Daily Record deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
