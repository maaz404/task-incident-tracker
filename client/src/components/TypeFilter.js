import React from "react";

const TypeFilter = ({ currentFilter, onFilterChange }) => {
  const filters = ["All", "Task", "Incident", "Bug", "Feature", "Maintenance"];

  return (
    <div className="type-filter">
      <label>Filter by type: </label>
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

export default TypeFilter;
