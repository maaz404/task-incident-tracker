// MongoDB initialization script for local development
db = db.getSiblingDB('task-incident-tracker');

// Create a collection and insert sample data
db.tasks.insertMany([
    {
        title: "Sample Task 1",
        description: "This is a sample task for development",
        status: "Open",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        title: "Sample Task 2", 
        description: "Another sample task",
        status: "In Progress",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        title: "Sample Task 3",
        description: "Completed sample task",
        status: "Resolved",
        createdAt: new Date(),
        updatedAt: new Date()
    }
]);

print("Database initialized with sample tasks");
