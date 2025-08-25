# Task Incident Tracker

A full-stack task management application with user authentication and real-time updates.

## Features

- 🔐 **User Authentication** - Secure registration and login with JWT
- 📝 **Task Management** - Create, edit, delete, and organize tasks
- 🔍 **Status Filtering** - Filter tasks by Pending, In Progress, or Complete
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile
- ⚡ **Real-time Updates** - Instant task updates across the application

## Tech Stack

- **Frontend:** React 18, Axios, CSS3
- **Backend:** Node.js, Express.js, JWT Authentication
- **Database:** MongoDB with Mongoose
- **Deployment:** Docker, GitHub Actions, AWS EC2

## Quick Start

### Using Docker (Recommended)

```bash
git clone https://github.com/maaz404/task-incident-tracker.git
cd task-incident-tracker
docker-compose up -d
```

Visit `http://localhost` to use the application.

### Manual Setup

**Prerequisites:** Node.js 18+, MongoDB

1. **Backend Setup:**

```bash
cd server
npm install
npm start
```

2. **Frontend Setup:**

```bash
cd client
npm install
npm start
```

3. **Visit:** `http://localhost:3000`

## Environment Configuration

**server/.env:**

```env
MONGODB_URI=mongodb://localhost:27017/task_incident_tracker
JWT_SECRET=your_secure_jwt_secret
PORT=5000
```

**client/.env:**

```env
REACT_APP_API_URL=/api
```

## API Endpoints

| Method | Endpoint             | Description       |
| ------ | -------------------- | ----------------- |
| POST   | `/api/auth/register` | User registration |
| POST   | `/api/auth/login`    | User login        |
| GET    | `/api/tasks`         | Get user tasks    |
| POST   | `/api/tasks`         | Create new task   |
| PUT    | `/api/tasks/:id`     | Update task       |
| DELETE | `/api/tasks/:id`     | Delete task       |
| GET    | `/api/health`        | Health check      |

## Deployment

This project includes automated deployment to AWS EC2 via GitHub Actions.

**Required Secrets:**

- `EC2_SSH_KEY` - Private SSH key for EC2 access
- `EC2_HOST` - EC2 public IP address
- `EC2_USERNAME` - EC2 username (ubuntu)

Push to `main` branch triggers automatic deployment.

## Development

```bash
# Install dependencies
npm install

# Run tests
npm test

# Build for production
npm run build

# Run with Docker
docker-compose up --build
```

## Project Structure

```
├── client/                 # React frontend
│   ├── src/components/    # React components
│   ├── src/services/      # API services
│   └── nginx.conf         # Nginx configuration
├── server/                # Express backend
│   ├── routes/           # API routes
│   ├── models/           # MongoDB schemas
│   └── middleware/       # Auth middleware
├── .github/workflows/    # CI/CD pipeline
└── docker-compose.yml    # Docker services
```

## License

MIT License - See [LICENSE](LICENSE) for details.
