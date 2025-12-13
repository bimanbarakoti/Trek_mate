import React, { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import './SearchBar.css';
import useScrollReveal from '../../hooks/useScrollReveal';

/**
 * SearchBar Component
 * Search input with auto-complete suggestions, recent searches, and debounced search
 * Provides a smooth user experience with clear and search functionality
 */
const SearchBar = ({
  onSearch,
  onSuggestionSelect,
  placeholder,
  suggestions,
  isFocused,
  debounceDelay
}) => {
  const revealRef = useScrollReveal({ threshold: 0.06 });
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [recentSearches, setRecentSearches] = useState(() => {
    // Load recent searches from localStorage
    try {
      const stored = localStorage.getItem('recentSearches');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const debounceTimer = useRef(null);
  const searchInputRef = useRef(null);
  const activeSuggestionId = highlightedIndex >= 0 ? `search-suggestion-${highlightedIndex}` : undefined;

  /**
   * Debounced search handler
   */
  const handleDebouncedSearch = useCallback(() => {
    if (searchQuery.trim()) {
      onSearch?.(searchQuery);
    }
  }, [searchQuery, onSearch]);

  /**
   * Derived filtered suggestions based on search query
   */
  const filteredSuggestions = useMemo(() => {
    if (searchQuery.trim() === '') return recentSearches;
    const query = searchQuery.toLowerCase();
    return suggestions.filter((s) => s.toLowerCase().includes(query));
  }, [searchQuery, suggestions, recentSearches]);

  /**
   * Debounced effect to execute search callback only
   */
  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      handleDebouncedSearch();
    }, debounceDelay);

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [searchQuery, debounceDelay, handleDebouncedSearch]);

  /**
   * Handle input change
   */
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    setHighlightedIndex(-1);
    setIsOpen(true);
  }; 

  /**
   * Handle suggestion selection
   */
  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setIsOpen(false);
    addToRecentSearches(suggestion);
    onSuggestionSelect?.(suggestion);
    onSearch?.(suggestion);
  };

  /**
   * Add search to recent searches
   */
  const addToRecentSearches = (query) => {
    const filtered = recentSearches.filter(s => s !== query);
    const updated = [query, ...filtered].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  };

  /**
   * Handle keyboard navigation
   */
  const handleKeyDown = (e) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev =>
          prev < filteredSuggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev =>
          prev > 0 ? prev - 1 : filteredSuggestions.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0) {
          handleSuggestionClick(filteredSuggestions[highlightedIndex]);
        } else if (searchQuery.trim()) {
          addToRecentSearches(searchQuery);
          onSearch?.(searchQuery);
          setIsOpen(false);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        break;
      default:
        break;
    }
  };

  /**
   * Clear search input
   */
  const handleClear = () => {
    setSearchQuery('');
    setHighlightedIndex(-1);
    searchInputRef.current?.focus();
  };

  /**
   * Handle focus
   */
  const handleFocus = () => {
    setIsOpen(true);
  };

  /**
   * Handle blur
   */
  const handleBlur = () => {
    setTimeout(() => setIsOpen(false), 100);
  };

  return (
    <div ref={revealRef} data-reveal data-reveal-animation="fade-in-right" className="search-bar">
      {/* Search Input Container */}
      <div className="search-bar__input-wrapper">
        {/* Search Icon */}
        <svg className="search-bar__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>

        {/* Input Field */}
        <input
          ref={searchInputRef}
          type="text"
          className="search-bar__input"
          placeholder={placeholder}
          value={searchQuery}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
          autoFocus={isFocused}
          aria-controls="search-suggestions"
          aria-autocomplete="list"
          aria-activedescendant={activeSuggestionId}
          role="combobox"
        />

        {/* Clear Button */}
        {searchQuery && (
          <button
            className="search-bar__clear-btn"
            onClick={handleClear}
            aria-label="Clear search"
            type="button"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
            </svg>
          </button>
        )}
      </div>

      {/* Suggestions Dropdown */}
      {isOpen && filteredSuggestions.length > 0 && (
        <div className="search-bar__suggestions">
          <ul id="search-suggestions" role="listbox" className="search-bar__suggestions-list">
            {filteredSuggestions.map((suggestion, index) => (
              <li
                id={`search-suggestion-${index}`}
                key={index}
                role="option"
                aria-selected={index === highlightedIndex}
                className={`search-bar__suggestion-item ${
                  index === highlightedIndex ? 'search-bar__suggestion-item--highlighted' : ''
                }`}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <svg className="search-bar__suggestion-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

SearchBar.propTypes = {
  onSearch: PropTypes.func,
  onSuggestionSelect: PropTypes.func,
  placeholder: PropTypes.string,
  suggestions: PropTypes.arrayOf(PropTypes.string),
  isFocused: PropTypes.bool,
  debounceDelay: PropTypes.number
};

SearchBar.defaultProps = {
  onSearch: null,
  onSuggestionSelect: null,
  placeholder: 'Search...',
  suggestions: [],
  isFocused: false,
  debounceDelay: 300
};

export default SearchBar;
