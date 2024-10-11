require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./db");

const dailyRecordsRoutes = require("./routes/DailyRecordsRoutes");
const expenseRoutes = require("./routes/ExpenseRoutes");
const todoRoutes = require("./routes/TodoRoutes");
const journalEntryRoutes = require("./routes/JournalEntryRoutes");

const app = express();

app.use(express.json());
app.use("/api/daily-records", dailyRecordsRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/todos", todoRoutes);
app.use("/api/journal-entries", journalEntryRoutes);

app.get("/", (req, res) => {
  res.send("Started Working, Express!");
});

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server listening at port", PORT);
  });
});
