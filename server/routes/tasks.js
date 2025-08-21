const express = require("express");
const router = express.Router();
const {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/tasksController");
const { authenticateToken } = require("../middleware/auth");

// Apply authentication middleware to all routes
router.use(authenticateToken);

// Get all tasks for the authenticated user
router.get("/", getTasks);

// Get a single task by ID
router.get("/:id", getTaskById);

// Create a new task
router.post("/", createTask);

// Update a task by ID
router.put("/:id", updateTask);

// Delete a task by ID
router.delete("/:id", deleteTask);

module.exports = router;
