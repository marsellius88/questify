// TodoController.js

const DailyRecords = require("../models/DailyRecords");
const Todo = require("../models/Todo");

// Create a new todo
exports.createTodo = async (req, res) => {
  try {
    const dailyRecord = await DailyRecords.findById(req.body.dailyRecordId);
    if (!dailyRecord) {
      return res.status(404).json({ message: "Daily record not found" });
    }

    const { dailyRecordId, title, due, note, priority, done } = req.body;
    const todo = new Todo({
      dailyRecordId,
      title,
      due,
      note,
      priority,
      done,
    });

    const savedTodo = await todo.save();
    const todoId = savedTodo._id;
    dailyRecord.todoIds.push(todoId);
    await dailyRecord.save();

    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all todos
exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find().populate("dailyRecordId");
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single todo by ID
exports.getTodoById = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id).populate("dailyRecordId");
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a todo by ID
exports.updateTodo = async (req, res) => {
  try {
    const { dailyRecordId, title, due, note, priority, done } = req.body;
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      { dailyRecordId, title, due, note, priority, done },
      { new: true }
    );
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a todo by ID
exports.deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    await DailyRecords.findByIdAndUpdate(todo.dailyRecordId, {
      $pull: { todoIds: todo._id },
    });
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
