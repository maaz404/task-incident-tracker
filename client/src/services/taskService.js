import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
const API_BASE_PATH = process.env.REACT_APP_API_BASE_PATH || "/api";

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    let errorMessage = "An unexpected error occurred";

    if (error.response) {
      // Server responded with error status
      errorMessage =
        error.response.data?.message ||
        `Server error: ${error.response.status}`;
    } else if (error.request) {
      // Network error
      errorMessage =
        "Network error - please check your connection and ensure the backend is running";
    }

    throw new Error(errorMessage);
  }
);

export const taskService = {
  getAllTasks: async () => {
    try {
      const response = await apiClient.get(`${API_BASE_PATH}/tasks`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createTask: async (task) => {
    try {
      const response = await apiClient.post(`${API_BASE_PATH}/tasks`, task);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateTask: async (id, task) => {
    try {
      const response = await apiClient.put(
        `${API_BASE_PATH}/tasks/${id}`,
        task
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteTask: async (id) => {
    try {
      const response = await apiClient.delete(`${API_BASE_PATH}/tasks/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
