# Task & Incident Tracker

A full-stack task management application with CRUD operations, built with React frontend and Node.js/Express backend.

##  Live Demo
- **Frontend**: [https://task-incident-tracker-frontend.vercel.app](https://task-incident-tracker-frontend.vercel.app)
- **Backend API**: [https://task-incident-tracker-backend.onrender.com](https://task-incident-tracker-backend.onrender.com)

## ✨ Features
- Create, view, update, and delete tasks
- Status filtering (Open, In Progress, Resolved)
- Color-coded status indicators
- Form validation and error handling
- Responsive design

## �️ Tech Stack
- **Frontend**: React 18, Axios, CSS3
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Deployment**: Docker, AWS EC2, Vercel, Render

## � Installation

### Prerequisites
- Node.js 16+
- MongoDB Atlas account

### Quick Start
```bash
# Clone repository
git clone https://github.com/maaz404/task-incident-tracker.git
cd task-incident-tracker

# Backend setup
cd task-incident-tracker-backend
npm install
cp .env.example .env
# Add your MongoDB connection string to .env
npm start

# Frontend setup (new terminal)
cd ../task-incident-tracker-frontend  
npm install
cp .env.example .env
# Set REACT_APP_API_URL=http://localhost:5000 in .env
npm start
```

Frontend: `http://localhost:3001` | Backend: `http://localhost:5000`

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Get all tasks |
| POST | `/api/tasks` | Create new task |
| PUT | `/api/tasks/:id` | Update task |
| DELETE | `/api/tasks/:id` | Delete task |

**Task Schema**: `{ title, description, status, createdAt, updatedAt }`  
**Status Options**: `Open`, `In Progress`, `Resolved`

## 🚀 Deployment

### Docker (Recommended)
```bash
docker-compose up --build -d
```

### Separate Services
- **Backend**: Render/Railway/Heroku
- **Frontend**: Vercel/Netlify  
- **Database**: MongoDB Atlas

## 🤖 AI Usage Note

This project was developed as part of an internship program. AI tools were used for:
- Deployment guidance and troubleshooting
- Documentation creation
- Code structure optimization

Core application logic, database design, and UI/UX were developed independently.

##  Author

**Maaz Sheikh** - [GitHub](https://github.com/maaz404)

---
*Built with ❤️ for learning full-stack development*
