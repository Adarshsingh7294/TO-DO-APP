

const express = require("express");
const todoController = require("../Controllers/todoController.js");

const router = express.Router();

// API Routes
router.get("/todos", todoController.getAllTodos);
router.post("/todos", todoController.addNewTodo);
router.get("/todos/:id", todoController.getSingleData);
router.put("/todos/:id", todoController.updateTodo);
router.delete("/todos/:id", todoController.deleteTodo);

module.exports = router;
