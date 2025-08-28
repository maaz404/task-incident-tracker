import React, { useState, useEffect } from "react";

const TaskForm = ({ task, onSubmit, onCancel }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending");
  const [type, setType] = useState("Task");

  // Fill form with task data if editing
  useEffect(() => {
    if (task) {
      setTitle(task.title || "");
      setDescription(task.description || "");
      setStatus(task.status || "Pending");
      setType(task.type || "Task");
    } else {
      setTitle("");
      setDescription("");
      setStatus("Pending");
      setType("Task");
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Please enter a title");
      return;
    }

    onSubmit({
      title: title.trim(),
      description: description.trim(),
      status,
      type,
    });
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>{task ? "Edit Task" : "Add New Task"}</h3>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title"
              required
            />
          </div>

          <div className="form-group">
            <label>Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter task description (optional)"
              rows="4"
            />
          </div>

          <div className="form-group">
            <label>Type:</label>
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="Task">Task</option>
              <option value="Incident">Incident</option>
              <option value="Bug">Bug</option>
              <option value="Feature">Feature</option>
              <option value="Maintenance">Maintenance</option>
            </select>
          </div>

          <div className="form-group">
            <label>Status:</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Complete">Complete</option>
            </select>
          </div>

          <div className="form-buttons">
            <button type="submit" className="btn btn-primary">
              {task ? "Update Task" : "Create Task"}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="btn btn-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
