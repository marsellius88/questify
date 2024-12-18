// DailyRecordsRoutes.js

const express = require("express");
const router = express.Router();
const DailyRecordsController = require("../controllers/DailyRecordsController");

// Create a new daily record
router.post("/", DailyRecordsController.createDailyRecord);

// Get all daily records
router.get("/", DailyRecordsController.getDailyRecords);

// Get a single daily record by date
router.get("/date/:date", DailyRecordsController.getDailyRecordByDate);

// Get a single daily record by monthlyRecordId
router.get("/monthly-record/:monthlyRecordId", DailyRecordsController.getDailyRecordByMonthlyRecordId);

// Get a single daily record by ID
router.get("/:id", DailyRecordsController.getDailyRecordById);

// Update a daily record by ID
router.put("/:id", DailyRecordsController.updateDailyRecord);

// Delete a daily record by ID
router.delete("/:id", DailyRecordsController.deleteDailyRecord);

module.exports = router;
