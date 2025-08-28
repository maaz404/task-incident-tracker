const mongoose = require("mongoose");

// Task schema - defines what data we store for each task
const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Complete"],
      default: "Pending",
    },
    type: {
      type: String,
      enum: ["Task", "Incident", "Bug", "Feature", "Maintenance"],
      default: "Task",
    },
    // Which user created this task
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

module.exports = mongoose.model("Task", taskSchema);
