// MonthlyRecordsRoutes.js

const express = require("express");
const router = express.Router();
const MonthlyRecordsController = require("../controllers/MonthlyRecordsController");

// Create a new monthly record
router.post("/", MonthlyRecordsController.createMonthlyRecord);

// Get a monthly record by month and year
router.get("/:month/:year", MonthlyRecordsController.getMonthlyRecordByMonthAndYear);

// Get all monthly records
router.get("/", MonthlyRecordsController.getMonthlyRecords);

// Get a single monthly record by ID
router.get("/:id", MonthlyRecordsController.getMonthlyRecordById);

// Update a monthly record by ID
router.put("/:id", MonthlyRecordsController.updateMonthlyRecord);

// Delete a monthly record by ID
router.delete("/:id", MonthlyRecordsController.deleteMonthlyRecord);

module.exports = router;
