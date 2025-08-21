const Task = require("../models/Task");

// Get all tasks for the logged-in user
const getTasks = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = { createdBy: req.user._id };
    
    if (status) {
      filter.status = status;
    }

    const tasks = await Task.find(filter)
      .populate('createdBy', 'username email')
      .sort({ createdAt: -1 });
    
    res.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
};

// Get single task by ID (only if owned by user)
const getTaskById = async (req, res) => {
  try {
    const task = await Task.findOne({ 
      _id: req.params.id, 
      createdBy: req.user._id 
    }).populate('createdBy', 'username email');

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    console.error("Error fetching task:", error);
    if (error.name === 'CastError') {
      return res.status(400).json({ message: "Invalid task ID" });
    }
    res.status(500).json({ message: "Failed to fetch task" });
  }
};

// Create new task
const createTask = async (req, res) => {
  try {
    const { title, description, status, priority } = req.body;

    // Basic validation
    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const task = new Task({
      title,
      description,
      status: status || 'pending',
      priority: priority || 'medium',
      createdBy: req.user._id
    });

    const savedTask = await task.save();
    const populatedTask = await Task.findById(savedTask._id)
      .populate('createdBy', 'username email');

    res.status(201).json(populatedTask);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ message: "Failed to create task" });
  }
};

// Update task (only if owned by user)
const updateTask = async (req, res) => {
  try {
    const { title, description, status, priority } = req.body;

    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user._id },
      { title, description, status, priority },
      { new: true, runValidators: true }
    ).populate('createdBy', 'username email');

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    console.error("Error updating task:", error);
    if (error.name === 'CastError') {
      return res.status(400).json({ message: "Invalid task ID" });
    }
    res.status(500).json({ message: "Failed to update task" });
  }
};

// Delete task (only if owned by user)
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ 
      _id: req.params.id, 
      createdBy: req.user._id 
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted successfully", task });
  } catch (error) {
    console.error("Error deleting task:", error);
    if (error.name === 'CastError') {
      return res.status(400).json({ message: "Invalid task ID" });
    }
    res.status(500).json({ message: "Failed to delete task" });
  }
};

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
