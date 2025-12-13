/**
 * Loader Component
 * Loading spinner and skeleton loaders
 */

import React from 'react';
import PropTypes from 'prop-types';

export const Loader = ({ 
  size = 'md', 
  fullPage = false 
}) => {
  // Size styles
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
    xl: 'h-24 w-24',
  };

  if (fullPage) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className={`${sizeClasses[size]} animate-spin`}>
          <svg
            className="h-full w-full text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </div>
      </div>
    );
  }

  return (
    <div className={`${sizeClasses[size]} animate-spin`}>
      <svg
        className="h-full w-full text-primary-600"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </div>
  );
};

Loader.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
  fullPage: PropTypes.bool,
};

/**
 * Skeleton Loader Component
 * Placeholder while content is loading
 */
export const SkeletonLoader = ({ 
  count = 3, 
  type = 'card',
  className = ''
}) => {
  const skeletonBases = Array.from({ length: count }).map((_, i) => (
    <div
      key={i}
      className={`animate-shimmer bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 rounded-lg ${className}`}
      style={{
        backgroundSize: '200% 100%',
        animation: 'shimmer 2s infinite',
      }}
    />
  ));

  if (type === 'card') {
    return (
      <div className="space-y-4">
        {skeletonBases.map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-8 bg-gray-200 rounded" />
            <div className="h-6 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-100 rounded w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (type === 'list') {
    return (
      <div className="space-y-3">
        {skeletonBases.map((_, i) => (
          <div key={i} className="h-12 bg-gray-200 rounded" />
        ))}
      </div>
    );
  }

  return <div>{skeletonBases}</div>;
};

SkeletonLoader.propTypes = {
  count: PropTypes.number,
  type: PropTypes.oneOf(['card', 'list', 'default']),
  className: PropTypes.string,
};

export default Loader;
