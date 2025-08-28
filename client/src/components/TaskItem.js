import React from "react";

const TaskItem = ({ task, onEdit, onDelete }) => {
  // Simple function to get type color
  const getTypeColor = (type) => {
    switch (type) {
      case "Incident":
        return "#dc3545";
      case "Bug":
        return "#fd7e14";
      case "Feature":
        return "#20c997";
      case "Maintenance":
        return "#6f42c1";
      default:
        return "#007bff"; // Task
    }
  };

  // Simple function to get status color
  const getStatusColor = (status) => {
    if (status === "Complete") return "#28a745";
    if (status === "In Progress") return "#ffc107";
    return "#6c757d"; // Pending
  };

  return (
    <div className="task-item">
      <div className="task-content">
        <h4>{task.title}</h4>
        {task.description && <p>{task.description}</p>}

        <div className="task-badges">
          <span
            className="type-badge"
            style={{ backgroundColor: getTypeColor(task.type || "Task") }}
          >
            {task.type || "Task"}
          </span>
          <span
            className="status-badge"
            style={{ backgroundColor: getStatusColor(task.status) }}
          >
            {task.status}
          </span>
        </div>
      </div>

      <div className="task-actions">
        <button onClick={() => onEdit(task)} className="btn btn-edit">
          Edit
        </button>
        <button onClick={() => onDelete(task._id)} className="btn btn-delete">
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
