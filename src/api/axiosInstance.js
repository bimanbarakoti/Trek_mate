/**
 * Axios Instance Configuration
 * Centralized API configuration with interceptors
 * All API calls should use this instance for consistency
 */

import axios from 'axios';

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.trekmate.app/v1';
const TIMEOUT = 10000; // 10 seconds

/**
 * Create and configure the axios instance
 */
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

/**
 * Request Interceptor
 * Adds authorization token and logs requests
 */
axiosInstance.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem('authToken');
    
    // Add token to Authorization header if it exists
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Add request timestamp for debugging
    config.metadata = { startTime: new Date() };

    // Log request in development
    if (import.meta.env.DEV) {
      console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`);
    }

    return config;
  },
  (error) => {
    // Log request error
    console.error('[API Request Error]', error);
    return Promise.reject(error);
  }
);

/**
 * Response Interceptor
 * Handles successful responses, errors, and token refresh
 */
axiosInstance.interceptors.response.use(
  (response) => {
    // Calculate and log request duration
    if (response.config.metadata) {
      const duration = new Date() - response.config.metadata.startTime;
      if (import.meta.env.DEV) {
        console.log(
          `[API Response] ${response.status} ${response.config.url} (${duration}ms)`
        );
      }
    }

    return response;
  },
  (error) => {
    // Handle different error types
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;

      console.error(`[API Error] ${status}:`, data);

      // Handle 401 Unauthorized (token expired)
      if (status === 401) {
        // Clear token and redirect to login
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
        // Could dispatch action or navigate to login here
        window.location.href = '/login';
      }

      // Handle 403 Forbidden
      if (status === 403) {
        console.error('[API Error] Access forbidden');
      }

      // Handle 404 Not Found
      if (status === 404) {
        console.error('[API Error] Resource not found');
      }

      // Handle 429 Rate Limited
      if (status === 429) {
        console.error('[API Error] Rate limited, please try again later');
      }

      // Handle 500 Server Error
      if (status >= 500) {
        console.error('[API Error] Server error, please try again later');
      }
    } else if (error.request) {
      // Request made but no response
      console.error('[API Error] No response from server:', error.request);
    } else {
      // Error in request setup
      console.error('[API Error]', error.message);
    }

    return Promise.reject(error);
  }
);

/**
 * Utility function to get cached data from localStorage
 * @param {string} key - Cache key
 * @returns {any} Cached data or null
 */
export const getCachedData = (key) => {
  try {
    const cached = localStorage.getItem(`cache_${key}`);
    if (!cached) return null;

    const { data, timestamp } = JSON.parse(cached);
    const isExpired = Date.now() - timestamp > 5 * 60 * 1000; // 5 minute cache

    return isExpired ? null : data;
  } catch (error) {
    console.error('[Cache Error]', error);
    return null;
  }
};

/**
 * Utility function to set cached data in localStorage
 * @param {string} key - Cache key
 * @param {any} data - Data to cache
 */
export const setCachedData = (key, data) => {
  try {
    localStorage.setItem(
      `cache_${key}`,
      JSON.stringify({
        data,
        timestamp: Date.now(),
      })
    );
  } catch (error) {
    console.error('[Cache Error]', error);
  }
};

/**
 * Utility function to clear specific cache
 * @param {string} key - Cache key to clear
 */
export const clearCache = (key) => {
  try {
    localStorage.removeItem(`cache_${key}`);
  } catch (error) {
    console.error('[Cache Error]', error);
  }
};

/**
 * Utility function to set auth token
 * @param {string} token - Authentication token
 */
export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('authToken', token);
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
};

/**
 * Utility function to remove auth token
 */
export const removeAuthToken = () => {
  localStorage.removeItem('authToken');
  delete axiosInstance.defaults.headers.common['Authorization'];
};

export default axiosInstance;
