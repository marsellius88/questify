// controllers/JournalEntryController.js
const JournalEntry = require('../models/JournalEntry');
const DailyRecord = require('../models/DailyRecords');

// Create JournalEntry
exports.createJournalEntry = async (req, res) => {
  try {
    const { dailyRecordId, grateful, highlights, mood, sleepDuration, thoughts, waterIntake } = req.body;

    // Check if DailyRecord exists
    const dailyRecord = await DailyRecord.findById(dailyRecordId);
    if (!dailyRecord) {
      return res.status(404).json({ message: 'DailyRecord not found' });
    }

    const journalEntry = new JournalEntry({ dailyRecordId, grateful, highlights, mood, sleepDuration, thoughts, waterIntake });
    const savedJournalEntry = await journalEntry.save();

    // Link journal entry to DailyRecord's journalId
    dailyRecord.journalId = savedJournalEntry._id;
    await dailyRecord.save();

    res.status(201).json(savedJournalEntry);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get All JournalEntries
exports.getAllJournalEntries = async (req, res) => {
  try {
    const journalEntries = await JournalEntry.find().populate('dailyRecordId');
    res.status(200).json(journalEntries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Single JournalEntry by ID
exports.getJournalEntryById = async (req, res) => {
  try {
    const journalEntry = await JournalEntry.findById(req.params.id).populate('dailyRecordId');
    if (!journalEntry) return res.status(404).json({ message: 'JournalEntry not found' });
    res.status(200).json(journalEntry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update JournalEntry
exports.updateJournalEntry = async (req, res) => {
  try {
    const { dailyRecordId, grateful, highlights, mood, sleepDuration, thoughts, waterIntake } = req.body;

    // Check if DailyRecord exists
    const dailyRecord = await DailyRecord.findById(dailyRecordId);
    if (!dailyRecord) {
      return res.status(404).json({ message: 'DailyRecord not found' });
    }

    const updatedJournalEntry = await JournalEntry.findByIdAndUpdate(
      req.params.id,
      { dailyRecordId, grateful, highlights, mood, sleepDuration, thoughts, waterIntake },
      { new: true }
    );
    if (!updatedJournalEntry) return res.status(404).json({ message: 'JournalEntry not found' });

    res.status(200).json(updatedJournalEntry);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete JournalEntry
exports.deleteJournalEntry = async (req, res) => {
  try {
    const deletedJournalEntry = await JournalEntry.findByIdAndDelete(req.params.id);
    if (!deletedJournalEntry) return res.status(404).json({ message: 'JournalEntry not found' });

    // Remove the journal entry reference from DailyRecord's journalId
    await DailyRecord.findByIdAndUpdate(deletedJournalEntry.dailyRecordId, {
      $unset: { journalId: '' }
    });

    res.status(200).json({ message: 'JournalEntry deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
