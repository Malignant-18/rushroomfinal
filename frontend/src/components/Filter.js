import React, { useState } from 'react';
import './Filter.css';

const Filter = ({ onFilterChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState({
    condition: 'all',
    wheelchair_accessible: false,
    baby_changing: false,
    searchQuery: ''
  });

  const handleFilterChange = (key, value) => {
    const newFilters = {
      ...filters,
      [key]: value
    };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  return (
    <div className={`filter-container ${isExpanded ? 'expanded' : ''}`}>
      <button 
        className="filter-toggle"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? 'Hide Filters' : 'Show Filters'}
      </button>

      {isExpanded && (
        <div className="filter-content">
          {/* Search by name or location */}
          <div className="filter-section">
            <h3>Search</h3>
            <input
              type="text"
              placeholder="Search by name or location..."
              value={filters.searchQuery}
              onChange={(e) => handleFilterChange('searchQuery', e.target.value)}
              className="search-input"
            />
          </div>

          {/* Condition Filter */}
          <div className="filter-section">
            <h3>Condition</h3>
            <select
              value={filters.condition}
              onChange={(e) => handleFilterChange('condition', e.target.value)}
            >
              <option value="all">All</option>
              <option value="Good">Good</option>
              <option value="Moderate">Moderate</option>
              <option value="Poor">Poor</option>
            </select>
          </div>

          {/* Facilities Filters */}
          <div className="filter-section">
            <h3>Facilities</h3>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={filters.wheelchair_accessible}
                onChange={(e) => handleFilterChange('wheelchair_accessible', e.target.checked)}
              />
              Wheelchair Accessible
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={filters.baby_changing}
                onChange={(e) => handleFilterChange('baby_changing', e.target.checked)}
              />
              Baby Changing
            </label>
          </div>

          <button 
            className="reset-filters"
            onClick={() => {
              const resetFilters = {
                condition: 'all',
                wheelchair_accessible: false,
                baby_changing: false,
                searchQuery: ''
              };
              setFilters(resetFilters);
              onFilterChange?.(resetFilters);
            }}
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Filter;