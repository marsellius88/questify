// JournalEntryController.js

const JournalEntry = require("../models/JournalEntry");

// Create a new journal entry
exports.createJournalEntry = async (req, res) => {
  try {
    const { dailyRecordId, grateful, highlights, mood, sleepDuration, thoughts, waterIntake } = req.body;
    const journalEntry = new JournalEntry({
      dailyRecordId,
      grateful,
      highlights,
      mood,
      sleepDuration,
      thoughts,
      waterIntake
    });
    await journalEntry.save();
    res.status(201).json(journalEntry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all journal entries
exports.getJournalEntries = async (req, res) => {
  try {
    const journalEntries = await JournalEntry.find().populate("dailyRecordId");
    res.status(200).json(journalEntries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single journal entry by ID
exports.getJournalEntryById = async (req, res) => {
  try {
    const journalEntry = await JournalEntry.findById(req.params.id).populate("dailyRecordId");
    if (!journalEntry) return res.status(404).json({ message: "Journal entry not found" });
    res.status(200).json(journalEntry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a journal entry by ID
exports.updateJournalEntry = async (req, res) => {
  try {
    const { dailyRecordId, grateful, highlights, mood, sleepDuration, thoughts, waterIntake } = req.body;
    const journalEntry = await JournalEntry.findByIdAndUpdate(
      req.params.id,
      { dailyRecordId, grateful, highlights, mood, sleepDuration, thoughts, waterIntake },
      { new: true }
    );
    if (!journalEntry) return res.status(404).json({ message: "Journal entry not found" });
    res.status(200).json(journalEntry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a journal entry by ID
exports.deleteJournalEntry = async (req, res) => {
  try {
    const journalEntry = await JournalEntry.findByIdAndDelete(req.params.id);
    if (!journalEntry) return res.status(404).json({ message: "Journal entry not found" });
    res.status(200).json({ message: "Journal entry deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
