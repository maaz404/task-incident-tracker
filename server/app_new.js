const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const tasksRoutes = require("./routes/tasks");

const app = express();
const PORT = process.env.PORT || 5000;

// Simple middleware setup
app.use(cors());
app.use(express.json());

// Simple MongoDB connection
const connectDB = async () => {
  try {
    const mongoURI =
      process.env.MONGODB_URI || "mongodb://localhost:27017/task_tracker";
    await mongoose.connect(mongoURI);
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

// Connect to database
connectDB();

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", tasksRoutes);

// Welcome message
app.get("/", (req, res) => {
  res.json({
    message: "Task Tracker API",
    version: "1.0.0",
    endpoints: {
      Register: "POST /api/auth/register",
      Login: "POST /api/auth/login",
      "Get Tasks": "GET /api/tasks",
      "Create Task": "POST /api/tasks",
      "Update Task": "PUT /api/tasks/:id",
      "Delete Task": "DELETE /api/tasks/:id",
    },
  });
});

// Simple error handler
app.use((error, req, res, next) => {
  console.error("Error:", error.message);
  res.status(500).json({ message: "Server error occurred" });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({ message: "API route not found" });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

module.exports = app;
