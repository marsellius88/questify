// routes/TodoRoutes.js
const express = require('express');
const router = express.Router();
const TodoController = require('../controllers/TodoController');

// Create a new todo
router.post('/', TodoController.createTodo);

// Get all todos
router.get('/', TodoController.getAllTodos);

// Get a single todo by ID
router.get('/:id', TodoController.getTodoById);

// Update a todo by ID
router.put('/:id', TodoController.updateTodo);

// Delete a todo by ID
router.delete('/:id', TodoController.deleteTodo);

module.exports = router;
