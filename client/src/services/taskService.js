import axios from "axios";

// Simple API configuration
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

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
  if (error.response?.status === 401) {
    // User is not logged in anymore
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    throw new Error("Please log in again");
  }

  const message =
    error.response?.data?.message || error.message || "Something went wrong";
  throw new Error(message);
};

export const taskService = {
  // Get all tasks for current user
  getAllTasks: async () => {
    try {
      const response = await axios.get(`${API_URL}/tasks`, {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  // Create a new task
  createTask: async (taskData) => {
    try {
      const response = await axios.post(`${API_URL}/tasks`, taskData, {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  // Update an existing task
  updateTask: async (id, taskData) => {
    try {
      const response = await axios.put(`${API_URL}/tasks/${id}`, taskData, {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  // Delete a task
  deleteTask: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/tasks/${id}`, {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },
};
