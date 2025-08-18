import React from "react";

const TaskItem = ({ task, onEdit, onDelete, disabled = false }) => {
  const getStatusClass = (status) => {
    return status.toLowerCase().replace(" ", "-");
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="task-item">
      <div className="task-content">
        <h3>{task.title}</h3>
        <p>{task.description || "No description provided"}</p>
        <div className="task-meta">
          <span className={`task-status ${getStatusClass(task.status)}`}>
            {task.status}
          </span>
          <div style={{ marginTop: "8px", fontSize: "0.85rem" }}>
            <div>Created: {formatDate(task.createdAt)}</div>
            {task.updatedAt !== task.createdAt && (
              <div>Updated: {formatDate(task.updatedAt)}</div>
            )}
          </div>
        </div>
      </div>
      <div className="task-actions">
        <button
          className="btn btn-edit"
          onClick={() => onEdit(task)}
          disabled={disabled}
        >
          Edit
        </button>
        <button
          className="btn btn-delete"
          onClick={() => onDelete(task._id)}
          disabled={disabled}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
