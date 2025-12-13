/**
 * useGemini Hook
 * Custom hook for real-time Gemini data (weather, route conditions, safety alerts)
 * Handles live subscriptions, caching, and fallback to mock data
 */

import { useState, useCallback, useEffect, useRef } from 'react';
import GeminiService from '../api/geminiService';

/**
 * Custom hook for Gemini integration
 * @param {Object} options - Configuration options
 * @returns {Object} Gemini data interface with weather, conditions, alerts
 */
export const useGemini = (options = {}) => {
  const {
    enableLive = false,
    cacheExpiry = 5 * 60 * 1000, // 5 minutes
  } = options;

  const [weather, setWeather] = useState(null);
  const [routeConditions, setRouteConditions] = useState(null);
  const [safetyAlerts, setSafetyAlerts] = useState(null);
  const [atmosphere, setAtmosphere] = useState(null);
  const [recommendations, setRecommendations] = useState(null);
  const [emergencyServices, setEmergencyServices] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const cacheRef = useRef(new Map());
  const subscriptionsRef = useRef(new Map());

  /**
   * Check if cached data is still valid
   */
  const isCacheValid = useCallback((key) => {
    if (!cacheRef.current.has(key)) return false;

    const { timestamp } = cacheRef.current.get(key);
    return Date.now() - timestamp < cacheExpiry;
  }, [cacheExpiry]);

  /**
   * Get cached data
   */
  const getCachedData = useCallback((key) => {
    if (isCacheValid(key)) {
      return cacheRef.current.get(key).data;
    }
    cacheRef.current.delete(key);
    return null;
  }, [isCacheValid]);

  /**
   * Set cached data
   */
  const setCachedData = useCallback((key, data) => {
    cacheRef.current.set(key, {
      data,
      timestamp: Date.now(),
    });
  }, []);

  /**
   * Fetch weather forecast
   */
  const fetchWeather = useCallback(async (trekLocation) => {
    if (!trekLocation) return;

    const cacheKey = `weather_${trekLocation.id || trekLocation.name}`;
    const cached = getCachedData(cacheKey);

    if (cached) {
      setWeather(cached);
      return cached;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await GeminiService.getWeatherForecast(trekLocation);
      setWeather(data);
      setCachedData(cacheKey, data);
      return data;
    } catch (err) {
      console.error('[useGemini] Fetch weather error:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [getCachedData, setCachedData]);

  /**
   * Fetch route conditions
   */
  const fetchRouteConditions = useCallback(async (trekInfo) => {
    if (!trekInfo) return;

    const cacheKey = `conditions_${trekInfo.id}`;
    const cached = getCachedData(cacheKey);

    if (cached) {
      setRouteConditions(cached);
      return cached;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await GeminiService.getRouteConditions(trekInfo);
      setRouteConditions(data);
      setCachedData(cacheKey, data);
      return data;
    } catch (err) {
      console.error('[useGemini] Fetch route conditions error:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [getCachedData, setCachedData]);

  /**
   * Fetch safety alerts
   */
  const fetchSafetyAlerts = useCallback(async (location) => {
    if (!location) return;

    const cacheKey = `alerts_${location.id || location.name}`;
    const cached = getCachedData(cacheKey);

    if (cached) {
      setSafetyAlerts(cached);
      return cached;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await GeminiService.getSafetyAlerts(location);
      setSafetyAlerts(data);
      setCachedData(cacheKey, data);
      return data;
    } catch (err) {
      console.error('[useGemini] Fetch safety alerts error:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [getCachedData, setCachedData]);

  /**
   * Fetch atmospheric conditions
   */
  const fetchAtmosphere = useCallback(async (altitude, location) => {
    if (!location) return;

    const cacheKey = `atmosphere_${altitude}_${location.lat}_${location.lng}`;
    const cached = getCachedData(cacheKey);

    if (cached) {
      setAtmosphere(cached);
      return cached;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await GeminiService.getAtmosphericConditions(altitude, location);
      setAtmosphere(data);
      setCachedData(cacheKey, data);
      return data;
    } catch (err) {
      console.error('[useGemini] Fetch atmosphere error:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [getCachedData, setCachedData]);

  /**
   * Fetch location-based recommendations
   */
  const fetchRecommendations = useCallback(async (userLocation, category = 'all') => {
    if (!userLocation) return;

    try {
      setLoading(true);
      setError(null);
      const data = await GeminiService.getLocationBasedRecommendations(
        userLocation,
        category
      );
      setRecommendations(data);
      return data;
    } catch (err) {
      console.error('[useGemini] Fetch recommendations error:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Fetch emergency services
   */
  const fetchEmergencyServices = useCallback(async (location, radius = 50) => {
    if (!location) return;

    try {
      setLoading(true);
      setError(null);
      const data = await GeminiService.getEmergencyServices(location, radius);
      setEmergencyServices(data);
      return data;
    } catch (err) {
      console.error('[useGemini] Fetch emergency services error:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Subscribe to live updates
   */
  const subscribeLiveUpdates = useCallback(
    (trekId, onUpdate) => {
      if (!enableLive) return () => {};

      const unsubscribe = GeminiService.subscribeToLiveUpdates(trekId, (update) => {
        onUpdate(update);
      });

      subscriptionsRef.current.set(trekId, unsubscribe);
      return unsubscribe;
    },
    [enableLive]
  );

  /**
   * Unsubscribe from live updates
   */
  const unsubscribeLiveUpdates = useCallback((trekId) => {
    if (subscriptionsRef.current.has(trekId)) {
      subscriptionsRef.current.get(trekId)();
      subscriptionsRef.current.delete(trekId);
    }
  }, []);

  /**
   * Clear all cached data
   */
  const clearCache = useCallback(() => {
    cacheRef.current.clear();
  }, []);

  /**
   * Clear error
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  /**
   * Cleanup subscriptions on unmount
   */
  useEffect(() => {
    return () => {
      const subs = Array.from(subscriptionsRef.current.values());
      subs.forEach((unsubscribe) => {
        unsubscribe();
      });
      subscriptionsRef.current.clear();
    };
  }, []);

  return {
    // State
    weather,
    routeConditions,
    safetyAlerts,
    atmosphere,
    recommendations,
    emergencyServices,
    loading,
    error,

    // Methods
    fetchWeather,
    fetchRouteConditions,
    fetchSafetyAlerts,
    fetchAtmosphere,
    fetchRecommendations,
    fetchEmergencyServices,
    subscribeLiveUpdates,
    unsubscribeLiveUpdates,
    clearCache,
    clearError,
  };
};

export default useGemini;
