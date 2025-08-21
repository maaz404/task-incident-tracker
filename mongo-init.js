// MongoDB initialization script for Task Incident Tracker
// This script runs when MongoDB container starts for the first time

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

// Create tasks collection with sample data for testing
db.tasks.insertMany([
  {
    title: "Setup Development Environment",
    description: "Configure Docker containers and development tools",
    status: "Resolved",
    createdAt: new Date("2025-08-15T10:00:00Z"),
    updatedAt: new Date("2025-08-15T14:30:00Z"),
  },
  {
    title: "Implement User Authentication",
    description: "Add JWT-based authentication system",
    status: "In Progress",
    createdAt: new Date("2025-08-16T09:15:00Z"),
    updatedAt: new Date("2025-08-16T16:45:00Z"),
  },
  {
    title: "Design Database Schema",
    description: "Create MongoDB collections and relationships",
    status: "Open",
    createdAt: new Date("2025-08-17T11:30:00Z"),
    updatedAt: new Date("2025-08-17T11:30:00Z"),
  },
  {
    title: "Fix Frontend Responsive Issues",
    description: "Ensure mobile compatibility across all components",
    status: "Open",
    createdAt: new Date("2025-08-18T08:20:00Z"),
    updatedAt: new Date("2025-08-18T08:20:00Z"),
  },
]);

console.log("Sample tasks inserted successfully");

// Create indexes for better query performance
db.tasks.createIndex({ status: 1 });
db.tasks.createIndex({ createdAt: -1 });
db.tasks.createIndex({ updatedAt: -1 });
db.tasks.createIndex(
  {
    title: "text",
    description: "text",
  },
  {
    name: "task_search_index",
    weights: { title: 10, description: 5 },
  }
);

console.log("Database indexes created successfully");

// Create a collection for storing application metadata
db.app_metadata.insertOne({
  version: "1.0.0",
  initialized_at: new Date(),
  environment: "docker",
  features: ["task_management", "status_tracking", "search"],
});

console.log("Application metadata stored successfully");

console.log("MongoDB initialization completed successfully!");
console.log("Database: task_incident_tracker");
console.log("Collections: tasks, app_metadata");
console.log("Users: taskapp (readWrite)");
console.log("Indexes: status, createdAt, updatedAt, text_search");
