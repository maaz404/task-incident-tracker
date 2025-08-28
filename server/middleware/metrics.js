const client = require("prom-client");

// Create a Registry which registers the metrics
const register = new client.Registry();

// Add default metrics (CPU, memory, GC, etc.)
client.collectDefaultMetrics({
  app: "task-tracker-api",
  timeout: 10000,
  gcDurationBuckets: [0.001, 0.01, 0.1, 1, 2, 5], // These are in seconds
  register,
});

// Custom metrics
const httpRequestsTotal = new client.Counter({
  name: "http_requests_total",
  help: "Total number of HTTP requests",
  labelNames: ["method", "route", "status_code"],
  registers: [register],
});

const httpRequestDuration = new client.Histogram({
  name: "http_request_duration_ms",
  help: "Duration of HTTP requests in ms",
  labelNames: ["method", "route", "status_code"],
  buckets: [0.1, 5, 15, 50, 100, 500, 1000, 2000, 5000],
  registers: [register],
});

const activeConnections = new client.Gauge({
  name: "active_connections",
  help: "Number of active connections",
  registers: [register],
});

const databaseConnections = new client.Gauge({
  name: "mongodb_connections_active",
  help: "Number of active MongoDB connections",
  registers: [register],
});

const tasksTotal = new client.Gauge({
  name: "tasks_total",
  help: "Total number of tasks in the system",
  labelNames: ["status"],
  registers: [register],
});

// Middleware to collect HTTP metrics
const metricsMiddleware = (req, res, next) => {
  const start = Date.now();

  // Track active connections
  activeConnections.inc();

  res.on("finish", () => {
    const duration = Date.now() - start;
    const route = req.route ? req.route.path : req.url;

    // Record metrics
    httpRequestsTotal.inc({
      method: req.method,
      route: route,
      status_code: res.statusCode,
    });

    httpRequestDuration.observe(
      {
        method: req.method,
        route: route,
        status_code: res.statusCode,
      },
      duration
    );

    // Decrease active connections
    activeConnections.dec();
  });

  next();
};

// Function to update database connection metrics
const updateDatabaseMetrics = (mongoose) => {
  if (mongoose.connection.readyState === 1) {
    databaseConnections.set(mongoose.connections.length);
  }
};

// Function to update task metrics (to be called when tasks change)
const updateTaskMetrics = async (Task) => {
  try {
    const completedTasks = await Task.countDocuments({ completed: true });
    const pendingTasks = await Task.countDocuments({ completed: false });

    tasksTotal.set({ status: "completed" }, completedTasks);
    tasksTotal.set({ status: "pending" }, pendingTasks);
  } catch (error) {
    console.error("Error updating task metrics:", error.message);
  }
};

module.exports = {
  register,
  metricsMiddleware,
  updateDatabaseMetrics,
  updateTaskMetrics,
  httpRequestsTotal,
  httpRequestDuration,
  activeConnections,
  databaseConnections,
  tasksTotal,
};
