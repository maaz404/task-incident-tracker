const Task = require("../models/Task");

// Get all tasks with optional status filter
const getTasks = async (req, res) => {
  try {
    const { status } = req.query;
    let filter = {};

    if (status) {
      filter.status = status;
    }

    const tasks = await Task.find(filter);
    res.json(tasks);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching tasks", error: error.message });
  }
};

// Create a new task
const createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    // Check if title is provided
    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const newTask = new Task({
      title,
      description,
      status,
    });

    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating task", error: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;

    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (status !== undefined) task.status = status;

    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid task ID" });
    }
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    await Task.findByIdAndDelete(id);
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid task ID" });
    }
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};
