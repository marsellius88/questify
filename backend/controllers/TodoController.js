// controllers/TodoController.js
const Todo = require("../models/Todo");
const DailyRecord = require("../models/DailyRecords");

// Create Todo
exports.createTodo = async (req, res) => {
  try {
    const { dailyRecordId, title, due, note, priority, done } = req.body;

    // Check if DailyRecord exists
    const dailyRecord = await DailyRecord.findById(dailyRecordId);
    if (!dailyRecord) {
      return res.status(404).json({ message: "DailyRecord not found" });
    }

    const todo = new Todo({ dailyRecordId, title, due, note, priority, done });
    const savedTodo = await todo.save();

    // Add todo to dailyRecord's todoIds array
    dailyRecord.todoIds.push(savedTodo._id);
    await dailyRecord.save();

    res.status(201).json(savedTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get All Todos
exports.getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find().populate("dailyRecordId");
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Single Todo by ID
exports.getTodoById = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id).populate("dailyRecordId");
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Todo
exports.updateTodo = async (req, res) => {
  try {
    const { dailyRecordId, title, due, note, priority, done } = req.body;

    // Check if DailyRecord exists
    const dailyRecord = await DailyRecord.findById(dailyRecordId);
    if (!dailyRecord) {
      return res.status(404).json({ message: "DailyRecord not found" });
    }

    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { dailyRecordId, title, due, note, priority, done },
      { new: true }
    );
    if (!updatedTodo)
      return res.status(404).json({ message: "Todo not found" });

    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete Todo
exports.deleteTodo = async (req, res) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
    if (!deletedTodo)
      return res.status(404).json({ message: "Todo not found" });

    // Remove the todo from DailyRecord's todoIds array
    await DailyRecord.findByIdAndUpdate(deletedTodo.dailyRecordId, {
      $pull: { todoIds: deletedTodo._id },
    });

    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
