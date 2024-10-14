// JournalEntryRoutes.js

const express = require("express");
const router = express.Router();
const JournalEntryController = require("../controllers/JournalEntryController");

// Create a new journal entry
router.post("/", JournalEntryController.createJournalEntry);

// Get all journal entries
router.get("/", JournalEntryController.getJournalEntries);

// Get a single journal entry by ID
router.get("/:id", JournalEntryController.getJournalEntryById);

// Update a journal entry by ID
router.put("/:id", JournalEntryController.updateJournalEntry);

// Delete a journal entry by ID
router.delete("/:id", JournalEntryController.deleteJournalEntry);

module.exports = router;
