import React from "react";

const StatusFilter = ({ currentFilter, onFilterChange }) => {
  const filters = ["All", "Pending", "In Progress", "Complete"];

  return (
    <div className="status-filter">
      <label>Filter by status: </label>
      <select
        value={currentFilter}
        onChange={(e) => onFilterChange(e.target.value)}
      >
        {filters.map((filter) => (
          <option key={filter} value={filter}>
            {filter}
          </option>
        ))}
      </select>
    </div>
  );
};

export default StatusFilter;
