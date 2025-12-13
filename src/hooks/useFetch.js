/**
 * useFetch Hook
 * Custom hook for fetching data with loading, error, and caching states
 * Handles API calls with automatic error handling and retry logic
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import axiosInstance from '../api/axiosInstance';

/**
 * Custom hook for data fetching
 * @param {string} url - API endpoint URL
 * @param {Object} options - Options (method, data, dependencies, skip, cache, retry)
 * @returns {Object} { data, loading, error, refetch }
 */
export const useFetch = (url, options = {}) => {
  const {
    method = 'GET',
    data = null,
    dependencies = [],
    skip = false,
    cache = true,
    retry = 3,
  } = options;

  const [state, setState] = useState({
    data: null,
    loading: !skip,
    error: null,
  });

  const retryCount = useRef(0);
  const cacheRef = useRef(new Map());

  /**
   * Perform the actual fetch
   */
  const fetchData = useCallback(async () => {
    async function doFetch() {
      if (skip || !url) {
        setState((prev) => ({ ...prev, loading: false }));
        return;
      }

      // Check cache first
      if (cache && cacheRef.current.has(url)) {
        setState((prev) => ({
          ...prev,
          data: cacheRef.current.get(url),
          loading: false,
        }));
        return;
      }

      setState((prev) => ({ ...prev, loading: true, error: null }));

      try {
        let response;

        if (method === 'GET') {
          response = await axiosInstance.get(url);
        } else if (method === 'POST') {
          response = await axiosInstance.post(url, data);
        } else if (method === 'PUT') {
          response = await axiosInstance.put(url, data);
        } else if (method === 'DELETE') {
          response = await axiosInstance.delete(url);
        } else if (method === 'PATCH') {
          response = await axiosInstance.patch(url, data);
        }

        // Cache the data
        if (cache && response?.data) {
          cacheRef.current.set(url, response.data);
        }

        setState({
          data: response?.data ?? null,
          loading: false,
          error: null,
        });

        retryCount.current = 0;
      } catch (err) {
        console.error('[useFetch] Error fetching data:', err);

        // Retry logic
        if (retryCount.current < retry) {
          retryCount.current += 1;
          // Exponential backoff: wait before retrying
          setTimeout(() => {
            doFetch();
          }, Math.pow(2, retryCount.current) * 1000);
        } else {
          setState({
            data: null,
            loading: false,
            error: err.response?.data?.message || err.message || 'An error occurred',
          });
        }
      }
    }

    return doFetch();
  }, [url, method, data, skip, cache, retry]);

  /**
   * Effect to fetch data when URL or dependencies change
   */
  useEffect(() => {
    // Generate a stable string key for the dependencies so we don't spread dynamic arrays in deps
    const depsKey = JSON.stringify(dependencies);
    // Call fetchData when the URL or the computed depsKey changes
    fetchData();
    // The fetchData callback already includes all relevant variables in its dependency array
  }, [url, fetchData, depsKey, skip]);

  /**
   * Refetch function to manually trigger a new request
   */
  const refetch = useCallback(() => {
    // Clear cache for this URL
    cacheRef.current.delete(url);
    retryCount.current = 0;
    fetchData();
  }, [url, fetchData]);

  return {
    ...state,
    refetch,
  };
};

/**
 * Hook to use cached data with localStorage fallback
 * @param {string} key - Cache key
 * @param {*} initialValue - Initial value if no cache
 * @returns {[any, Function]} [value, setValue]
 */
export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('[useLocalStorage] Error reading from localStorage:', error);
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.error('[useLocalStorage] Error writing to localStorage:', error);
      }
    },
    [key, storedValue]
  );

  return [storedValue, setValue];
};

/**
 * Hook for debounced values (useful for search, filters)
 * @param {*} value - Value to debounce
 * @param {number} delay - Debounce delay in milliseconds
 * @returns {*} Debounced value
 */
export const useDebounce = (value, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

/**
 * Hook for previous value
 * @param {*} value - Current value
 * @returns {*} Previous value
 */
export const usePrevious = (value) => {
  const ref = useRef();
  const [previous, setPrevious] = useState();

  useEffect(() => {
    setPrevious(ref.current);
    ref.current = value;
  }, [value]);

  return previous;
};

export default useFetch;
