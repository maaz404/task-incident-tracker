import React, { useState, useEffect, useCallback } from "react";
import { taskService } from "./services/taskService";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import StatusFilter from "./components/StatusFilter";

function App() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [statusFilter, setStatusFilter] = useState("All");
  const [actionLoading, setActionLoading] = useState(false);

  const filterTasks = useCallback(() => {
    if (statusFilter === "All") {
      setFilteredTasks(tasks);
    } else {
      setFilteredTasks(tasks.filter((task) => task.status === statusFilter));
    }
  }, [tasks, statusFilter]);

  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(() => {
    filterTasks();
  }, [filterTasks]);

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await taskService.getAllTasks();
      setTasks(data);
    } catch (error) {
      console.error("Error loading tasks:", error);
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
      console.error("Error saving task:", error);
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
        console.error("Error deleting task:", error);
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

  if (error && !loading) {
    return (
      <div className="container">
        <header className="header">
          <h1>Task & Incident Tracker</h1>
          <p>Manage your tasks and track incidents efficiently</p>
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

  return (
    <div className="container">
      <header className="header">
        <h1>Task & Incident Tracker</h1>
        <p>Manage your tasks and track incidents efficiently</p>
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
