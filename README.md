# Task & Incident Tracker API

A Node.js REST API for managing tasks with Express.js and MongoDB.

## Setup Instructions

### Local Setup

1. Clone the repository and navigate to the project folder
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with:
   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/tracker
   ```
4. Start MongoDB locally
5. Run the application:
   ```bash
   npm run dev
   ```

### Docker Setup

1. Build and start both services:
   ```bash
   docker-compose up --build
   ```
2. API will be available at `http://localhost:3000`

## API Endpoints

### GET /tasks

Get all tasks with optional status filter

```bash
GET /tasks
GET /tasks?status=Open
```

**Response:**

```json
[
  {
    "_id": "64b5f8a1234567890abcdef0",
    "title": "Fix login bug",
    "description": "Resolve authentication issue",
    "status": "In Progress",
    "createdAt": "2025-08-08T10:30:00.000Z",
    "updatedAt": "2025-08-08T10:30:00.000Z"
  }
]
```

### POST /tasks

Create a new task

```bash
POST /tasks
Content-Type: application/json

{
  "title": "New task",
  "description": "Task description",
  "status": "Open"
}
```

### PUT /tasks/:id

Update an existing task

```bash
PUT /tasks/64b5f8a1234567890abcdef0
Content-Type: application/json

{
  "status": "Resolved"
}
```

### DELETE /tasks/:id

Delete a task

```bash
DELETE /tasks/64b5f8a1234567890abcdef0
```

## Database Schema

### Task Model

- **title** (String, required) - Task title
- **description** (String, optional) - Task description
- **status** (Enum: 'Open', 'In Progress', 'Resolved', default: 'Open')
- **createdAt** (Date) - Auto-generated timestamp
- **updatedAt** (Date) - Auto-updated timestamp

## Screenshots

### API Testing with Postman

<img width="593" height="344" alt="Initial_tasklist(empty)" src="https://github.com/user-attachments/assets/7b1a8a9f-2b17-429e-9cae-2f6bf352bf3d" />

*GET /tasks endpoint showing all tasks with status filtering*

<img width="622" height="497" alt="postman testing" src="https://github.com/user-attachments/assets/626c9d99-67dd-453f-a4bf-dcf0a81f861f" />

*POST /tasks endpoint creating a new task*

### Docker Containers Running

<img width="959" height="562" alt="docker" src="https://github.com/user-attachments/assets/76a8651c-864f-4361-8e0f-627609dfa06c" />

*Both backend and MongoDB containers running successfully*

## Taking Screenshots

### API Endpoint Output

1. Start the server (local or Docker)
2. Open browser or Postman to `http://localhost:3000/tasks`
3. Take screenshot of the JSON response

### Docker Containers

1. Run `docker-compose up` in terminal
2. Open another terminal and run `docker ps`
3. Take screenshot showing both containers running

## Reflection Note

This project demonstrates building a complete REST API backend using modern Node.js practices. Key learning outcomes include:

- **Express.js Framework**: Implemented modular routing and middleware architecture
- **MongoDB Integration**: Used Mongoose for data modeling and database operations
- **Error Handling**: Added comprehensive validation and error responses
- **Docker Containerization**: Created multi-service setup with docker-compose
- **API Design**: Followed RESTful conventions for CRUD operations
- **Logging**: Implemented custom middleware for request tracking

The modular structure separates concerns effectively, making the codebase maintainable and scalable. Docker setup ensures consistent deployment across different environments.
