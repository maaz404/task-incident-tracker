// Simple API configuration
const API_URL = process.env.REACT_APP_API_URL || "/api";

// Simple function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  };
};

// Simple error handler
const handleError = (error) => {
  if (error.status === 401) {
    // User is not logged in anymore
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    throw new Error("Please log in again");
  }

  throw new Error(error.message || "Something went wrong");
};

export const taskService = {
  // Get all tasks for current user
  getAllTasks: async () => {
    try {
      const response = await fetch(`${API_URL}/tasks`, {
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        throw { status: response.status, message: "Failed to fetch tasks" };
      }

      return await response.json();
    } catch (error) {
      handleError(error);
    }
  },

  // Create a new task
  createTask: async (taskData) => {
    try {
      const response = await fetch(`${API_URL}/tasks`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(taskData),
      });

      if (!response.ok) {
        throw { status: response.status, message: "Failed to create task" };
      }

      return await response.json();
    } catch (error) {
      handleError(error);
    }
  },

  // Update an existing task
  updateTask: async (id, taskData) => {
    try {
      const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(taskData),
      });

      if (!response.ok) {
        throw { status: response.status, message: "Failed to update task" };
      }

      return await response.json();
    } catch (error) {
      handleError(error);
    }
  },

  // Delete a task
  deleteTask: async (id) => {
    try {
      const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        throw { status: response.status, message: "Failed to delete task" };
      }

      return await response.json();
    } catch (error) {
      handleError(error);
    }
  },

  // Login user
  login: async (credentials) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const error = await response.json();
        throw { status: response.status, message: error.message || "Login failed" };
      }

      return await response.json();
    } catch (error) {
      handleError(error);
    }
  },

  // Register user
  register: async (userData) => {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw { status: response.status, message: error.message || "Registration failed" };
      }

      return await response.json();
    } catch (error) {
      handleError(error);
    }
  },
};
