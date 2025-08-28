const express = require("express");
const Task = require("../models/Task");
const { authenticateToken } = require("../middleware/auth");
const { updateTaskMetrics } = require("../middleware/metrics");

const router = express.Router();

// Apply authentication to all task routes
router.use(authenticateToken);

// Get all tasks for current user
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user._id }).sort({
      createdAt: -1,
    }); // Newest first

    res.json(tasks);
  } catch (error) {
    console.error("Error getting tasks:", error);
    res.status(500).json({ message: "Failed to get tasks" });
  }
});

// Create a new task
router.post("/", async (req, res) => {
  try {
    const { title, description, status } = req.body;

    // Check if title is provided
    if (!title || title.trim() === "") {
      return res.status(400).json({ message: "Task title is required" });
    }

    // Create new task
    const task = new Task({
      title: title.trim(),
      description: description ? description.trim() : "",
      status: status || "Pending",
      userId: req.user._id, // Link task to current user
    });

    const savedTask = await task.save();

    // Update metrics after creating task
    await updateTaskMetrics(Task);

    res.status(201).json(savedTask);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ message: "Failed to create task" });
  }
});

// Update an existing task
router.put("/:id", async (req, res) => {
  try {
    const { title, description, status } = req.body;

    // Check if title is provided
    if (!title || title.trim() === "") {
      return res.status(400).json({ message: "Task title is required" });
    }

    // Find and update task (only if it belongs to current user)
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      {
        title: title.trim(),
        description: description ? description.trim() : "",
        status: status || "Pending",
      },
      { new: true } // Return updated task
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);

    // Update metrics after updating task
    await updateTaskMetrics(Task);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: "Failed to update task" });
  }
});

// Delete a task
router.delete("/:id", async (req, res) => {
  try {
    // Find and delete task (only if it belongs to current user)
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted successfully" });

    // Update metrics after deleting task
    await updateTaskMetrics(Task);
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Failed to delete task" });
  }
});

module.exports = router;
