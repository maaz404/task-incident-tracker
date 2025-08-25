import React, { useState, useEffect } from "react";
import { taskService } from "./services/taskService";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import StatusFilter from "./components/StatusFilter";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

function App() {
  // Simple state for authentication
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [showRegister, setShowRegister] = useState(false);

  // Simple state for tasks
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState("All");
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  // Check if user is already logged in when app starts
  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
      setIsLoggedIn(true);
    }
  }, []);

  // Load tasks when user logs in
  useEffect(() => {
    if (isLoggedIn) {
      loadTasks();
    }
  }, [isLoggedIn]);

  // Load all tasks from server
  const loadTasks = async () => {
    setLoading(true);
    try {
      const data = await taskService.getAllTasks();
      setTasks(data);
    } catch (error) {
      alert("Error loading tasks: " + error.message);
    }
    setLoading(false);
  };

  // Handle successful login
  const handleLogin = (userData, token) => {
    setUser(userData);
    setIsLoggedIn(true);
  };

  // Handle successful registration
  const handleRegister = (userData, token) => {
    setUser(userData);
    setIsLoggedIn(true);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setIsLoggedIn(false);
    setTasks([]);
  };

  // Create new task
  const handleCreateTask = async (taskData) => {
    try {
      const newTask = await taskService.createTask(taskData);
      setTasks([...tasks, newTask]);
      setShowTaskForm(false);
    } catch (error) {
      alert("Error creating task: " + error.message);
    }
  };

  // Update existing task
  const handleUpdateTask = async (taskData) => {
    try {
      const updatedTask = await taskService.updateTask(
        editingTask._id,
        taskData
      );
      setTasks(
        tasks.map((task) => (task._id === editingTask._id ? updatedTask : task))
      );
      setShowTaskForm(false);
      setEditingTask(null);
    } catch (error) {
      alert("Error updating task: " + error.message);
    }
  };

  // Delete task
  const handleDeleteTask = async (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await taskService.deleteTask(taskId);
        setTasks(tasks.filter((task) => task._id !== taskId));
      } catch (error) {
        alert("Error deleting task: " + error.message);
      }
    }
  };

  // Open form to add new task
  const handleAddTask = () => {
    setEditingTask(null);
    setShowTaskForm(true);
  };

  // Open form to edit existing task
  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowTaskForm(true);
  };

  // Submit task form (create or update)
  const handleTaskFormSubmit = (taskData) => {
    if (editingTask) {
      handleUpdateTask(taskData);
    } else {
      handleCreateTask(taskData);
    }
  };

  // Filter tasks by status
  const getFilteredTasks = () => {
    if (statusFilter === "All") {
      return tasks;
    }
    return tasks.filter((task) => task.status === statusFilter);
  };

  // Show login/register forms if not logged in
  if (!isLoggedIn) {
    return (
      <div className="container">
        {showRegister ? (
          <RegisterForm
            onRegisterSuccess={handleRegister}
            onSwitchToLogin={() => setShowRegister(false)}
          />
        ) : (
          <LoginForm
            onLoginSuccess={handleLogin}
            onSwitchToRegister={() => setShowRegister(true)}
          />
        )}
      </div>
    );
  }

  // Show main app when logged in
  return (
    <div className="container">
      <header className="header">
        <h1>Task Tracker Test 1</h1>
        <p>Welcome, {user?.username}!</p>
        <button onClick={handleLogout} className="btn btn-secondary">
          Logout
        </button>
      </header>

      <div className="controls">
        <button onClick={handleAddTask} className="btn btn-primary">
          Add New Task
        </button>

        <StatusFilter
          currentFilter={statusFilter}
          onFilterChange={setStatusFilter}
        />
      </div>

      {loading ? (
        <div className="loading">Loading tasks...</div>
      ) : (
        <TaskList
          tasks={getFilteredTasks()}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
        />
      )}

      {showTaskForm && (
        <TaskForm
          task={editingTask}
          onSubmit={handleTaskFormSubmit}
          onCancel={() => {
            setShowTaskForm(false);
            setEditingTask(null);
          }}
        />
      )}
    </div>
  );
}

export default App;
