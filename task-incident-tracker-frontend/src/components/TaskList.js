import React from "react";
import TaskItem from "./TaskItem";

const TaskList = ({
  tasks,
  onEdit,
  onDelete,
  loading,
  actionLoading = false,
}) => {
  if (loading) {
    return <div className="loading">Loading tasks...</div>;
  }

  if (tasks.length === 0) {
    return (
      <div className="tasks-container">
        <div className="empty-state">
          <h3>No tasks found</h3>
          <p>Create your first task to get started</p>
        </div>
      </div>
    );
  }

  return (
    <div className="tasks-container">
      {actionLoading && (
        <div className="action-loading">
          <div className="loading">Processing...</div>
        </div>
      )}
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          disabled={actionLoading}
        />
      ))}
    </div>
  );
};

export default TaskList;
