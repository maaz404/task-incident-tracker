import React from "react";

const StatusFilter = ({ currentFilter, onFilterChange }) => {
  const filters = ["All", "Open", "In Progress", "Resolved"];

  return (
    <div className="filters">
      <span style={{ fontWeight: "bold", marginRight: "10px" }}>
        Filter by status:
      </span>
      {filters.map((filter) => (
        <button
          key={filter}
          className={`filter-button ${
            currentFilter === filter ? "active" : ""
          }`}
          onClick={() => onFilterChange(filter)}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};

export default StatusFilter;
