const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const tasksRoutes = require("./routes/tasks");
const requestLogger = require("./middleware/requestLogger");

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = (
      process.env.CORS_ORIGINS || "http://localhost:3000"
    ).split(",");

    if (!origin) return callback(null, true);

    const trimmedOrigins = allowedOrigins.map((o) => o.trim());

    if (trimmedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
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
      await mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      });
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

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

// Routes
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
      health: "/health",
      tasks: "/api/tasks",
    },
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
