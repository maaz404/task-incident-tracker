import React, { useState, useEffect, useCallback } from "react";
import { taskService } from "./services/taskService";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import StatusFilter from "./components/StatusFilter";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

function App() {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [showRegister, setShowRegister] = useState(false);

  // Task state
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [statusFilter, setStatusFilter] = useState("All");
  const [actionLoading, setActionLoading] = useState(false);

  // Check authentication on app load
  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    
    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  // Load tasks when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      loadTasks();
    }
  }, [isAuthenticated]);

  const filterTasks = useCallback(() => {
    if (statusFilter === "All") {
      setFilteredTasks(tasks);
    } else {
      setFilteredTasks(tasks.filter((task) => task.status === statusFilter));
    }
  }, [tasks, statusFilter]);

  useEffect(() => {
    filterTasks();
  }, [filterTasks]);

  // Authentication handlers
  const handleLoginSuccess = (userData, token) => {
    setUser(userData);
    setIsAuthenticated(true);
    setError(null);
  };

  const handleRegisterSuccess = (userData, token) => {
    setUser(userData);
    setIsAuthenticated(true);
    setError(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
    setTasks([]);
    setFilteredTasks([]);
  };

  const handleSwitchToRegister = () => {
    setShowRegister(true);
  };

  const handleSwitchToLogin = () => {
    setShowRegister(false);
  };

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await taskService.getAllTasks();
      setTasks(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = () => {
    setEditingTask(null);
    setShowForm(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleFormSubmit = async (formData) => {
    try {
      setActionLoading(true);
      setError(null);
      if (editingTask) {
        await taskService.updateTask(editingTask._id, formData);
      } else {
        await taskService.createTask(formData);
      }
      await loadTasks();
      setShowForm(false);
      setEditingTask(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        setActionLoading(true);
        setError(null);
        await taskService.deleteTask(taskId);
        await loadTasks();
      } catch (error) {
        setError(error.message);
      } finally {
        setActionLoading(false);
      }
    }
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  const handleFilterChange = (filter) => {
    setStatusFilter(filter);
  };

  const handleRetry = () => {
    loadTasks();
  };

  // Show loading screen on initial load
  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div>Loading...</div>
      </div>
    );
  }

  // Show authentication forms if not logged in
  if (!isAuthenticated) {
    if (showRegister) {
      return (
        <RegisterForm 
          onRegisterSuccess={handleRegisterSuccess}
          onSwitchToLogin={handleSwitchToLogin}
        />
      );
    } else {
      return (
        <LoginForm 
          onLoginSuccess={handleLoginSuccess}
          onSwitchToRegister={handleSwitchToRegister}
        />
      );
    }
  }

  // Error handling for authenticated users
  if (error && !loading) {
    return (
      <div className="container">
        <header className="header">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1>Task & Incident Tracker</h1>
              <p>Welcome, {user?.username}!</p>
            </div>
            <button onClick={handleLogout} style={{ background: '#dc3545', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}>
              Logout
            </button>
          </div>
        </header>

        <div className="error-container">
          <div className="error-message">
            <h3>❌ Error Loading Tasks</h3>
            <p>{error}</p>
            <button className="btn btn-primary" onClick={handleRetry}>
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Main authenticated app
  return (
    <div className="container">
      <header className="header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1>Task & Incident Tracker</h1>
            <p>Welcome, {user?.username}! Manage your tasks and track incidents efficiently</p>
          </div>
          <button onClick={handleLogout} style={{ background: '#dc3545', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}>
            Logout
          </button>
        </div>
      </header>

      {error && (
        <div className="error-banner">
          <span>⚠️ {error}</span>
          <button onClick={() => setError(null)}>×</button>
        </div>
      )}

      <StatusFilter
        currentFilter={statusFilter}
        onFilterChange={handleFilterChange}
      />

      <div style={{ marginBottom: "20px" }}>
        <button
          className="add-task-btn"
          onClick={handleAddTask}
          disabled={actionLoading}
        >
          {actionLoading ? "Loading..." : "+ Add New Task"}
        </button>
      </div>

      <TaskList
        tasks={filteredTasks}
        onEdit={handleEditTask}
        onDelete={handleDeleteTask}
        loading={loading}
        actionLoading={actionLoading}
      />

      <TaskForm
        task={editingTask}
        onSubmit={handleFormSubmit}
        onCancel={handleFormCancel}
        isOpen={showForm}
        loading={actionLoading}
      />
    </div>
  );
}

export default App;
