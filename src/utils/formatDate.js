/**
 * Date Formatting Utility
 * Utility functions for formatting and manipulating dates
 */

/**
 * Format date to readable string
 * @param {Date|string} date - Date to format
 * @param {string} format - Format string (dd/mm/yyyy, yyyy-mm-dd, etc)
 * @returns {string} Formatted date
 */
export const formatDate = (date, format = 'MMM dd, yyyy') => {
  if (!date) return '';

  const d = new Date(date);
  if (isNaN(d.getTime())) return '';

  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  const monthName = getMonthName(d.getMonth());
  const dayName = getDayName(d.getDay());

  const replacements = {
    'dd': day,
    'd': String(d.getDate()),
    'mm': month,
    'm': String(d.getMonth() + 1),
    'MMM': monthName.substring(0, 3),
    'MMMM': monthName,
    'yyyy': String(year),
    'yy': String(year).slice(-2),
    'DDD': dayName.substring(0, 3),
    'DDDD': dayName,
  };

  let formatted = format;
  Object.keys(replacements).forEach((key) => {
    formatted = formatted.replace(new RegExp(key, 'g'), replacements[key]);
  });

  return formatted;
};

/**
 * Get day name from day number
 * @param {number} dayNum - Day number (0-6)
 * @returns {string} Day name
 */
const getDayName = (dayNum) => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[dayNum] || '';
};

/**
 * Get month name from month number
 * @param {number} monthNum - Month number (0-11)
 * @returns {string} Month name
 */
const getMonthName = (monthNum) => {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  return months[monthNum] || '';
};

/**
 * Format date as relative time (e.g., "2 days ago")
 * @param {Date|string} date - Date to format
 * @returns {string} Relative time string
 */
export const formatRelativeTime = (date) => {
  const now = new Date();
  const d = new Date(date);
  const seconds = Math.floor((now - d) / 1000);

  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + ' years ago';

  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + ' months ago';

  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + ' days ago';

  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + ' hours ago';

  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + ' minutes ago';

  return 'just now';
};

/**
 * Format time duration (e.g., "2h 30m")
 * @param {number} minutes - Duration in minutes
 * @returns {string} Formatted duration
 */
export const formatDuration = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hours === 0) return `${mins}m`;
  if (mins === 0) return `${hours}h`;
  return `${hours}h ${mins}m`;
};

/**
 * Get current date formatted
 * @param {string} format - Format string
 * @returns {string} Today's date formatted
 */
export const getCurrentDate = (format = 'MMM dd, yyyy') => {
  return formatDate(new Date(), format);
};

/**
 * Get date with offset days
 * @param {number} days - Number of days to offset
 * @param {string} format - Format string
 * @returns {string} Formatted date
 */
export const getDateWithOffset = (days, format = 'MMM dd, yyyy') => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return formatDate(date, format);
};

/**
 * Calculate days between two dates
 * @param {Date|string} date1 - Start date
 * @param {Date|string} date2 - End date
 * @returns {number} Number of days
 */
export const daysBetween = (date1, date2) => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diffTime = Math.abs(d2 - d1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

/**
 * Check if date is in the past
 * @param {Date|string} date - Date to check
 * @returns {boolean} True if date is in the past
 */
export const isPastDate = (date) => {
  return new Date(date) < new Date();
};

/**
 * Check if date is in the future
 * @param {Date|string} date - Date to check
 * @returns {boolean} True if date is in the future
 */
export const isFutureDate = (date) => {
  return new Date(date) > new Date();
};

/**
 * Check if date is today
 * @param {Date|string} date - Date to check
 * @returns {boolean} True if date is today
 */
export const isToday = (date) => {
  const d = new Date(date);
  const today = new Date();
  return (
    d.getDate() === today.getDate() &&
    d.getMonth() === today.getMonth() &&
    d.getFullYear() === today.getFullYear()
  );
};

/**
 * Format date range
 * @param {Date|string} startDate - Start date
 * @param {Date|string} endDate - End date
 * @returns {string} Formatted date range
 */
export const formatDateRange = (startDate, endDate) => {
  const start = formatDate(startDate, 'MMM dd');
  const end = formatDate(endDate, 'MMM dd, yyyy');
  return `${start} - ${end}`;
};

/**
 * Get season from date
 * @param {Date|string} date - Date to check
 * @returns {string} Season name
 */
export const getSeason = (date) => {
  const d = new Date(date);
  const month = d.getMonth();

  if (month >= 2 && month <= 4) return 'Spring';
  if (month >= 5 && month <= 7) return 'Summer';
  if (month >= 8 && month <= 10) return 'Autumn';
  return 'Winter';
};

/**
 * Format time
 * @param {Date|string} date - Date to format
 * @param {boolean} includeSeconds - Include seconds
 * @returns {string} Formatted time (HH:mm or HH:mm:ss)
 */
export const formatTime = (date, includeSeconds = false) => {
  const d = new Date(date);
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const seconds = String(d.getSeconds()).padStart(2, '0');

  if (includeSeconds) return `${hours}:${minutes}:${seconds}`;
  return `${hours}:${minutes}`;
};

/**
 * Format date and time
 * @param {Date|string} date - Date to format
 * @returns {string} Formatted date and time
 */
export const formatDateTime = (date) => {
  return `${formatDate(date, 'MMM dd, yyyy')} at ${formatTime(date)}`;
};

/**
 * Parse date string to Date object
 * @param {string} dateString - Date string
 * @param {string} format - Format of the date string
 * @returns {Date} Parsed date
 */
export const parseDate = (dateString, format = 'yyyy-mm-dd') => {
  // Simple parser for common formats
  if (format === 'yyyy-mm-dd') {
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
  }
  return new Date(dateString);
};

/**
 * Get start of day
 * @param {Date|string} date - Date
 * @returns {Date} Start of day (00:00:00)
 */
export const getStartOfDay = (date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

/**
 * Get end of day
 * @param {Date|string} date - Date
 * @returns {Date} End of day (23:59:59)
 */
export const getEndOfDay = (date) => {
  const d = new Date(date);
  d.setHours(23, 59, 59, 999);
  return d;
};
