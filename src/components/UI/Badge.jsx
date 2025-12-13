/**
 * Badge Component
 * Display labels and status indicators
 */

import React from 'react';
import PropTypes from 'prop-types';

const Badge = ({
  children,
  variant = 'primary',
  size = 'md',
  icon = null,
  className = '',
  ...props
}) => {
  // Variant styles
  const variantClasses = {
    primary: 'bg-primary-100 text-primary-800',
    secondary: 'bg-secondary-100 text-secondary-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800',
    gray: 'bg-gray-100 text-gray-800',
  };

  // Size styles
  const sizeClasses = {
    xs: 'px-2 py-0.5 text-xs',
    sm: 'px-2.5 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  const baseClasses =
    'inline-flex items-center gap-1 rounded-full font-medium whitespace-nowrap';

  const classes = `
    ${baseClasses}
    ${variantClasses[variant] || variantClasses.primary}
    ${sizeClasses[size] || sizeClasses.md}
    ${className}
  `;

  return (
    <span
      className={classes.trim()}
      {...props}
    >
      {icon && <span className="flex items-center">{icon}</span>}
      {children}
    </span>
  );
};

Badge.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'gray']),
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  icon: PropTypes.node,
  className: PropTypes.string,
};

export default Badge;
