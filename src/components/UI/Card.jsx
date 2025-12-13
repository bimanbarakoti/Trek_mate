/**
 * Card Component
 * Reusable card container for content organization
 */

import React from 'react';
import PropTypes from 'prop-types';

const Card = ({
  children,
  className = '',
  padding = 'md',
  shadow = 'base',
  border = false,
  hoverable = false,
  onClick,
  ...props
}) => {
  // Padding variants
  const paddingClasses = {
    none: 'p-0',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
    xl: 'p-8',
  };

  // Shadow variants
  const shadowClasses = {
    none: 'shadow-none',
    xs: 'shadow-xs',
    sm: 'shadow-sm',
    base: 'shadow-base',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
  };

  const baseClasses =
    'bg-white rounded-lg transition-all duration-200';

  const classes = `
    ${baseClasses}
    ${paddingClasses[padding] || paddingClasses.md}
    ${shadowClasses[shadow] || shadowClasses.base}
    ${border ? 'border border-dark-200' : ''}
    ${hoverable ? 'hover:shadow-lg cursor-pointer transform hover:-translate-y-1' : ''}
    ${className}
  `;

  return (
    <div
      className={classes.trim()}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  padding: PropTypes.oneOf(['none', 'sm', 'md', 'lg', 'xl']),
  shadow: PropTypes.oneOf(['none', 'xs', 'sm', 'base', 'md', 'lg', 'xl']),
  border: PropTypes.bool,
  hoverable: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Card;
