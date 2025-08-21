const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const tasksRoutes = require("./routes/tasks");
const authRoutes = require("./routes/auth");
const requestLogger = require("./middleware/requestLogger");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(requestLogger);

// MongoDB connection with auto-detection
const connectToMongoDB = async () => {
  const dockerURI =
    process.env.MONGODB_URI_DOCKER ||
    "mongodb://taskapp:taskapp123@mongo:27017/task_incident_tracker?authSource=task_incident_tracker";
  const localURI =
    process.env.MONGODB_URI ||
    "mongodb://localhost:27017/task_incident_tracker";

  let mongoURI = localURI;

  try {
    require("dns").lookup("mongo", (err) => {
      if (!err) mongoURI = dockerURI;
    });
  } catch (error) {
    // Use local connection as fallback
  }

  const maxRetries = 3;
  let retries = 0;

  while (retries < maxRetries) {
    try {
      await mongoose.connect(mongoURI);
      console.log(`Connected to MongoDB: ${mongoURI}`);
      break;
    } catch (error) {
      retries++;

      if (retries < maxRetries) {
        mongoURI = mongoURI === dockerURI ? localURI : dockerURI;
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } else {
        console.error(
          "MongoDB connection failed. Please ensure MongoDB is running."
        );
        process.exit(1);
      }
    }
  }
};

connectToMongoDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", tasksRoutes);

// Health check endpoint
app.get("/health", (req, res) => {
  const healthStatus = {
    status: "OK",
    timestamp: new Date().toISOString(),
    mongodb:
      mongoose.connection.readyState === 1 ? "connected" : "disconnected",
  };

  res
    .status(mongoose.connection.readyState === 1 ? 200 : 503)
    .json(healthStatus);
});

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    message: "Task Incident Tracker API",
    endpoints: {
      auth: {
        register: "POST /api/auth/register",
        login: "POST /api/auth/login",
        profile: "GET /api/auth/me",
      },
      tasks: {
        list: "GET /api/tasks",
        get: "GET /api/tasks/:id",
        create: "POST /api/tasks",
        update: "PUT /api/tasks/:id",
        delete: "DELETE /api/tasks/:id"
      }
    },
    note: "All task endpoints require authentication via Bearer token"
  });
});

// Basic error handling
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({ message: "Something went wrong!" });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
