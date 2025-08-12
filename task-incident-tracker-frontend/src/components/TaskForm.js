import React, { useState, useEffect } from "react";

const TaskForm = ({ task, onSubmit, onCancel, isOpen, loading = false }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "Open",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || "",
        description: task.description || "",
        status: task.status || "Open",
      });
    } else {
      setFormData({
        title: "",
        description: "",
        status: "Open",
      });
    }
    setErrors({});
  }, [task]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    } else if (formData.title.trim().length < 3) {
      newErrors.title = "Title must be at least 3 characters long";
    } else if (formData.title.trim().length > 100) {
      newErrors.title = "Title must be less than 100 characters";
    }

    if (formData.description.trim().length > 500) {
      newErrors.description = "Description must be less than 500 characters";
    }

    if (!["Open", "In Progress", "Resolved"].includes(formData.status)) {
      newErrors.status = "Please select a valid status";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{task ? "Edit Task" : "Add New Task"}</h2>
          <button className="close-btn" onClick={onCancel}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={`form-group ${errors.title ? "error" : ""}`}>
            <label>Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter task title"
              maxLength="100"
            />
            {errors.title && <div className="form-error">{errors.title}</div>}
          </div>

          <div className={`form-group ${errors.description ? "error" : ""}`}>
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter task description (optional)"
              maxLength="500"
            />
            {errors.description && (
              <div className="form-error">{errors.description}</div>
            )}
          </div>

          <div className={`form-group ${errors.status ? "error" : ""}`}>
            <label>Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
            {errors.status && <div className="form-error">{errors.status}</div>}
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancel}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? "Saving..." : task ? "Update Task" : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
