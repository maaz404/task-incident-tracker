# Task Incident Tracker

A simple task management app built for beginners to learn full-stack development.

## What You'll Learn

- **React**: Building user interfaces with components
- **Node.js/Express**: Creating REST APIs
- **MongoDB**: Database operations
- **JWT**: User authentication
- **Docker**: Containerization basics

## Features

- ✅ User registration and login
- ✅ Create, edit, and delete tasks
- ✅ Filter tasks by status
- ✅ Mobile-friendly design

## Quick Start

### Option 1: Docker (Easiest)

1. Clone this project
2. Run these commands:

```bash
git clone [your-repo-url]
cd task-incident-tracker
docker-compose up
```

3. Open http://localhost:3000

### Option 2: Manual Setup

1. Install Node.js and MongoDB
2. Run the backend:

```bash
cd server
npm install
npm start
```

3. Run the frontend (new terminal):

```bash
cd client
npm install
npm start
```

## Project Structure

```
task-incident-tracker/
├── client/          # React frontend
│   ├── src/
│   │   ├── App.js           # Main app component
│   │   └── components/      # UI components
│   └── package.json         # Dependencies
├── server/          # Express backend
│   ├── app.js              # Server setup
│   ├── models/             # Database schemas
│   └── routes/             # API endpoints
└── docker-compose.yml      # Docker setup
```

## Environment Setup

Create these files:

**server/.env**

```
MONGODB_URI=mongodb://localhost:27017/task_incident_tracker
JWT_SECRET=your-secret-key
```

## Learning Resources

- [React Docs](https://reactjs.org/docs)
- [Express Guide](https://expressjs.com/guide)
- [MongoDB Tutorial](https://www.mongodb.com/docs)

## License

MIT - Feel free to use this for learning!
