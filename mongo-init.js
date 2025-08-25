// MongoDB initialization script for Task Incident Tracker
console.log("Starting MongoDB initialization...");

// Switch to the task tracker database
db = db.getSiblingDB("task_incident_tracker");

// Create application user with read/write permissions
db.createUser({
  user: "taskapp",
  pwd: "taskapp123",
  roles: [
    {
      role: "readWrite",
      db: "task_incident_tracker",
    },
  ],
});

console.log("Application user created successfully");

// Create basic indexes for better performance
db.tasks.createIndex({ status: 1 });
db.tasks.createIndex({ createdAt: -1 });
db.tasks.createIndex({ userId: 1 }); // Important for user-specific queries

console.log("Database indexes created successfully");
console.log("MongoDB initialization completed!");
