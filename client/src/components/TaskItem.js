import React from "react";

const TaskItem = ({ task, onEdit, onDelete }) => {
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
        
        <div className="task-status">
          <span 
            className="status-badge"
            style={{ backgroundColor: getStatusColor(task.status) }}
          >
            {task.status}
          </span>
        </div>
      </div>
      
      <div className="task-actions">
        <button 
          onClick={() => onEdit(task)} 
          className="btn btn-edit"
        >
          Edit
        </button>
        <button 
          onClick={() => onDelete(task._id)} 
          className="btn btn-delete"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
