const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const tasksRoutes = require("./routes/tasks");
const requestLogger = require("./middleware/requestLogger");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(requestLogger);

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/tracker",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
  process.exit(1);
});

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

app.get("/", (req, res) => {
  res.json({ message: "Task & Incident Tracker API" });
});

app.use("/tasks", tasksRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
