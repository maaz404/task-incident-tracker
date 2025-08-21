import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

// Mock the taskService to avoid actual API calls during testing
jest.mock('./services/taskService', () => ({
  taskService: {
    getAllTasks: jest.fn(() => Promise.resolve([])),
    createTask: jest.fn(() => Promise.resolve({ id: 1, title: 'Test Task', status: 'Pending' })),
    updateTask: jest.fn(() => Promise.resolve({ id: 1, title: 'Updated Task', status: 'Complete' })),
    deleteTask: jest.fn(() => Promise.resolve({}))
  }
}));

// Mock the components to avoid dependency issues
jest.mock('./components/TaskList', () => {
  return function TaskList({ tasks, onEdit, onDelete, loading }) {
    if (loading) return <div data-testid="task-list-loading">Loading tasks...</div>;
    return (
      <div data-testid="task-list">
        {tasks.length === 0 ? (
          <div data-testid="no-tasks">No tasks found</div>
        ) : (
          tasks.map(task => (
            <div key={task.id} data-testid="task-item">
              {task.title}
            </div>
          ))
        )}
      </div>
    );
  };
});

jest.mock('./components/TaskForm', () => {
  return function TaskForm({ isOpen, onSubmit, onCancel, task }) {
    if (!isOpen) return null;
    return (
      <div data-testid="task-form">
        <button onClick={onCancel}>Cancel</button>
        <button onClick={() => onSubmit({ title: 'Test Task', status: 'Pending' })}>
          Submit
        </button>
      </div>
    );
  };
});

jest.mock('./components/StatusFilter', () => {
  return function StatusFilter({ currentFilter, onFilterChange }) {
    return (
      <div data-testid="status-filter">
        <select 
          value={currentFilter} 
          onChange={(e) => onFilterChange(e.target.value)}
          data-testid="filter-select"
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Complete">Complete</option>
        </select>
      </div>
    );
  };
});

// Import the mocked taskService for assertions
const { taskService } = require('./services/taskService');

describe('App Component', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
  });

  test('renders without crashing', async () => {
    render(<App />);
    
    // Wait for the component to finish loading
    await waitFor(() => {
      expect(screen.getByText('Task & Incident Tracker')).toBeInTheDocument();
    });
  });

  test('displays main header and description', async () => {
    render(<App />);
    
    await waitFor(() => {
      expect(screen.getByText('Task & Incident Tracker')).toBeInTheDocument();
    });
    
    expect(screen.getByText('Manage your tasks and track incidents efficiently')).toBeInTheDocument();
  });

  test('shows add task button', async () => {
    render(<App />);
    
    await waitFor(() => {
      const addButton = screen.getByRole('button', { name: /add new task/i });
      expect(addButton).toBeInTheDocument();
    });
  });

  test('calls taskService.getAllTasks on mount', async () => {
    render(<App />);
    
    await waitFor(() => {
      expect(taskService.getAllTasks).toHaveBeenCalledTimes(1);
    });
  });

  test('displays task list component', async () => {
    render(<App />);
    
    await waitFor(() => {
      expect(screen.getByTestId('task-list')).toBeInTheDocument();
    });
  });

  test('displays status filter component', async () => {
    render(<App />);
    
    await waitFor(() => {
      expect(screen.getByTestId('status-filter')).toBeInTheDocument();
    });
  });

  test('opens task form when add button is clicked', async () => {
    render(<App />);
    
    const addButton = await screen.findByRole('button', { name: /add new task/i });
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(screen.getByTestId('task-form')).toBeInTheDocument();
    });
  });

  test('handles API errors gracefully', async () => {
    // Mock taskService to throw an error
    taskService.getAllTasks.mockRejectedValueOnce(new Error('Network error'));

    render(<App />);
    
    await waitFor(() => {
      expect(screen.getByText(/error loading tasks/i)).toBeInTheDocument();
    });
    
    expect(screen.getByText(/network error/i)).toBeInTheDocument();
  });

  test('taskService methods are properly mocked', () => {
    expect(taskService.getAllTasks).toBeDefined();
    expect(taskService.createTask).toBeDefined();
    expect(taskService.updateTask).toBeDefined();
    expect(taskService.deleteTask).toBeDefined();
    
    expect(typeof taskService.getAllTasks).toBe('function');
    expect(typeof taskService.createTask).toBe('function');
    expect(typeof taskService.updateTask).toBe('function');
    expect(typeof taskService.deleteTask).toBe('function');
  });
});
