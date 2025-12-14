import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import './TrekFilters.css';
import Button from '../UI/Button';
import regions from '../../data/regions';
import difficultyLevels from '../../data/difficultylevels';
import useScrollReveal from '../../hooks/useScrollReveal';

/**
 * TrekFilters Component
 * Provides filtering options for treks including region, difficulty, duration, cost, and rating
 * Features include range sliders, dropdowns, and reset functionality
 */
const TrekFilters = ({
  onChange,
  onFiltersChange,
  onApplyFilters,
  onResetFilters
}) => {
  const revealRef = useScrollReveal({ threshold: 0.12 });
  // Filter State
  const [filters, setFilters] = useState({
    region: '',
    difficulty: [],
    durationMin: 1,
    durationMax: 20,
    costMin: 100,
    costMax: 2000,
    ratingMin: 0,
    searchQuery: ''
  });

  const [isExpanded, setIsExpanded] = useState(true);

  /**
   * Handle region change
   */
  const handleRegionChange = useCallback((e) => {
    const newFilters = {
      ...filters,
      region: e.target.value
    };
    setFilters(newFilters);
    onChange?.(newFilters);
  }, [filters, onChange]);

  /**
   * Handle difficulty checkbox change
   */
  const handleDifficultyChange = useCallback((difficulty) => {
    const newDifficulties = filters.difficulty.includes(difficulty)
      ? filters.difficulty.filter(d => d !== difficulty)
      : [...filters.difficulty, difficulty];
    
    const newFilters = {
      ...filters,
      difficulty: newDifficulties
    };
    setFilters(newFilters);
    onChange?.(newFilters);
  }, [filters, onChange]);

  /**
   * Handle duration range change
   */
  const handleDurationChange = useCallback((type, value) => {
    const newFilters = {
      ...filters,
      [type]: parseInt(value)
    };
    setFilters(newFilters);
    onChange?.(newFilters);
  }, [filters, onChange]);

  /**
   * Handle cost range change
   */
  const handleCostChange = useCallback((type, value) => {
    const newFilters = {
      ...filters,
      [type]: parseInt(value)
    };
    setFilters(newFilters);
    onChange?.(newFilters);
  }, [filters, onChange]);

  /**
   * Handle rating filter change
   */
  const handleRatingChange = useCallback((e) => {
    const newFilters = {
      ...filters,
      ratingMin: parseInt(e.target.value)
    };
    setFilters(newFilters);
    onChange?.(newFilters);
  }, [filters, onChange]);

  /**
   * Handle search query change
   */
  const handleSearchChange = useCallback((e) => {
    const newFilters = {
      ...filters,
      searchQuery: e.target.value
    };
    setFilters(newFilters);
    onChange?.(newFilters);
  }, [filters, onChange]);

  /**
   * Reset all filters to defaults
   */
  const handleResetFilters = useCallback(() => {
    const defaultFilters = {
      region: '',
      difficulty: [],
      durationMin: 1,
      durationMax: 20,
      costMin: 100,
      costMax: 2000,
      ratingMin: 0,
      searchQuery: ''
    };
    setFilters(defaultFilters);
    onChange?.(defaultFilters);
  }, [onResetFilters]);

  /**
   * Apply filters
   */
  const handleApplyFilters = useCallback(() => {
    onApplyFilters?.(filters);
  }, [filters, onApplyFilters]);

  return (
    <div ref={revealRef} data-reveal className="trek-filters">
      {/* Filter Header */}
      <div className="trek-filters__header">
        <h3 className="trek-filters__title">Filters</h3>
        <button 
          className="trek-filters__toggle"
          onClick={() => setIsExpanded(!isExpanded)}
          aria-label="Toggle filters"
        >
          {isExpanded ? '−' : '+'}
        </button>
      </div>

      {/* Filters Container */}
      {isExpanded && (
        <div className="trek-filters__container">
          
          {/* Search Input */}
          <div className="trek-filters__group">
            <label className="trek-filters__label">Search Trek</label>
            <input
              type="text"
              className="trek-filters__input"
              placeholder="Search by name..."
              value={filters.searchQuery}
              onChange={handleSearchChange}
            />
          </div>

          {/* Region Filter */}
          <div className="trek-filters__group">
            <label className="trek-filters__label">Region</label>
            <select
              className="trek-filters__select"
              value={filters.region}
              onChange={handleRegionChange}
            >
              <option value="">All Regions</option>
              {regions.map(region => (
                <option key={region.id} value={region.name}>
                  {region.name}
                </option>
              ))}
            </select>
          </div>

          {/* Difficulty Filter */}
          <div className="trek-filters__group">
            <label className="trek-filters__label">Difficulty</label>
            <div className="trek-filters__checkboxes">
              {difficultyLevels.map(level => (
                <label key={level.id} className="trek-filters__checkbox-label">
                  <input
                    type="checkbox"
                    className="trek-filters__checkbox"
                    checked={filters.difficulty.includes(level.name)}
                    onChange={() => handleDifficultyChange(level.name)}
                  />
                  <span>{level.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Duration Range Slider */}
          <div className="trek-filters__group">
            <label className="trek-filters__label">
              Duration: {filters.durationMin} - {filters.durationMax} days
            </label>
            <div className="trek-filters__range-inputs">
              <div className="range-input-group">
                <label>Min: {filters.durationMin} days</label>
                <input
                  type="range"
                  min="1"
                  max="30"
                  value={filters.durationMin}
                  onChange={(e) => handleDurationChange('durationMin', e.target.value)}
                  className="trek-filters__range-slider"
                />
              </div>
              <div className="range-input-group">
                <label>Max: {filters.durationMax} days</label>
                <input
                  type="range"
                  min="1"
                  max="30"
                  value={filters.durationMax}
                  onChange={(e) => handleDurationChange('durationMax', e.target.value)}
                  className="trek-filters__range-slider"
                />
              </div>
            </div>
          </div>

          {/* Cost Range Slider */}
          <div className="trek-filters__group">
            <label className="trek-filters__label">
              Budget: ${filters.costMin} - ${filters.costMax}
            </label>
            <div className="trek-filters__range-inputs">
              <div className="range-input-group">
                <label>Min: ${filters.costMin}</label>
                <input
                  type="range"
                  min="100"
                  max="5000"
                  step="100"
                  value={filters.costMin}
                  onChange={(e) => handleCostChange('costMin', e.target.value)}
                  className="trek-filters__range-slider"
                />
              </div>
              <div className="range-input-group">
                <label>Max: ${filters.costMax}</label>
                <input
                  type="range"
                  min="100"
                  max="5000"
                  step="100"
                  value={filters.costMax}
                  onChange={(e) => handleCostChange('costMax', e.target.value)}
                  className="trek-filters__range-slider"
                />
              </div>
            </div>
          </div>

          {/* Rating Filter */}
          <div className="trek-filters__group">
            <label className="trek-filters__label">Minimum Rating</label>
            <select
              className="trek-filters__select"
              value={filters.ratingMin}
              onChange={handleRatingChange}
            >
              <option value="0">All Ratings</option>
              <option value="1">1+ Stars</option>
              <option value="2">2+ Stars</option>
              <option value="3">3+ Stars</option>
              <option value="4">4+ Stars</option>
              <option value="5">5 Stars</option>
            </select>
          </div>

          {/* Action Buttons */}
          <div className="trek-filters__actions">
            <Button
              className="trek-filters__reset-btn"
              onClick={handleResetFilters}
              variant="secondary"
            >
              Reset
            </Button>
            <Button
              className="trek-filters__apply-btn"
              onClick={handleApplyFilters}
              variant="primary"
            >
              Apply Filters
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

TrekFilters.propTypes = {
  onFiltersChange: PropTypes.func,
  onApplyFilters: PropTypes.func,
  onResetFilters: PropTypes.func
};

TrekFilters.defaultProps = {
  onFiltersChange: null,
  onApplyFilters: null,
  onResetFilters: null
};

export default TrekFilters;
