/**
 * Gemini Service
 * Handles all Gemini API interactions for real-time data
 * Features:
 *  - Real-time weather forecasts
 *  - Route condition updates
 *  - Safety alerts and closures
 *  - Live altitude and temperature data
 *  - Route optimization suggestions
 */

import axiosInstance, { getCachedData, setCachedData } from './axiosInstance';

const GEMINI_API_URL = import.meta.env.VITE_GEMINI_API_URL || '/api/ai/gemini';
const CACHE_KEY_PREFIX = 'gemini_';
const WEATHER_CACHE_DURATION = 30 * 60 * 1000; // 30 minutes for weather data

/**
 * Gemini Service class for real-time trek and weather information
 */
class GeminiService {
  /**
   * Get real-time weather forecast for a trek
   * @param {Object} trekLocation - Trek location (name, lat, lng, altitude)
   * @returns {Promise} Weather forecast data
   */
  static async getWeatherForecast(trekLocation) {
    try {
      const cacheKey = `${CACHE_KEY_PREFIX}weather_${trekLocation.id || trekLocation.name}`;
      const cached = getCachedData(cacheKey);
      if (cached) {
        return cached;
      }

      const response = await axiosInstance.post(`${GEMINI_API_URL}/weather`, {
        location: trekLocation,
        timeframe: 'next_14_days',
      });

      if (response.data) {
        setCachedData(cacheKey, response.data, WEATHER_CACHE_DURATION);
      }

      return response.data;
    } catch (error) {
      console.error('[Gemini Service] Get weather forecast error:', error);
      // Return mock data as fallback
      return {
        forecast: [
          { day: 'Today', condition: 'Sunny', temp: 20, humidity: 50 },
          { day: 'Tomorrow', condition: 'Cloudy', temp: 18, humidity: 60 },
        ],
        isMockData: true,
      };
    }
  }

  /**
   * Get real-time route conditions
   * @param {Object} trekInfo - Trek information
   * @returns {Promise} Route condition data
   */
  static async getRouteConditions(trekInfo) {
    try {
      const cacheKey = `${CACHE_KEY_PREFIX}route_${trekInfo.id}`;
      const cached = getCachedData(cacheKey);
      if (cached) {
        return cached;
      }

      const response = await axiosInstance.post(`${GEMINI_API_URL}/route-conditions`, {
        trek: trekInfo,
      });

      if (response.data) {
        setCachedData(cacheKey, response.data, WEATHER_CACHE_DURATION);
      }

      return response.data;
    } catch (error) {
      console.error('[Gemini Service] Get route conditions error:', error);
      // Return mock data as fallback
      return {
        conditions: {
          trailStatus: 'Open',
          difficulty: 'Moderate',
          crowdLevel: 'Medium',
          lastUpdated: new Date(),
        },
        isMockData: true,
      };
    }
  }

  /**
   * Get safety alerts for a trek area
   * @param {Object} location - Trek location
   * @returns {Promise} Safety alerts
   */
  static async getSafetyAlerts(location) {
    try {
      const cacheKey = `${CACHE_KEY_PREFIX}alerts_${location.id || location.name}`;
      const cached = getCachedData(cacheKey);
      if (cached) {
        return cached;
      }

      const response = await axiosInstance.post(`${GEMINI_API_URL}/safety-alerts`, {
        location,
      });

      if (response.data) {
        setCachedData(cacheKey, response.data, WEATHER_CACHE_DURATION);
      }

      return response.data;
    } catch (error) {
      console.error('[Gemini Service] Get safety alerts error:', error);
      // Return mock data as fallback
      return {
        alerts: [],
        closures: [],
        warnings: [
          {
            type: 'Weather',
            message: 'Possible afternoon thunderstorms',
            severity: 'Medium',
          },
        ],
        isMockData: true,
      };
    }
  }

  /**
   * Get current atmospheric conditions (temperature, pressure, wind)
   * @param {number} altitude - Altitude in meters
   * @param {Object} location - Location coordinates
   * @returns {Promise} Atmospheric data
   */
  static async getAtmosphericConditions(altitude, location) {
    try {
      const cacheKey = `${CACHE_KEY_PREFIX}atmosphere_${altitude}_${location.lat}_${location.lng}`;
      const cached = getCachedData(cacheKey);
      if (cached) {
        return cached;
      }

      const response = await axiosInstance.post(`${GEMINI_API_URL}/atmospheric-conditions`, {
        altitude,
        location,
      });

      if (response.data) {
        setCachedData(cacheKey, response.data, 10 * 60 * 1000); // 10 min cache
      }

      return response.data;
    } catch (error) {
      console.error('[Gemini Service] Get atmospheric conditions error:', error);
      return {
        temperature: 15,
        pressure: 1013,
        windSpeed: 10,
        windDirection: 'N',
        visibility: 50,
        isMockData: true,
      };
    }
  }

  /**
   * Analyze route and suggest optimizations
   * @param {Object} routeData - Route information
   * @returns {Promise} Route analysis and suggestions
   */
  static async analyzeRoute(routeData) {
    try {
      const response = await axiosInstance.post(`${GEMINI_API_URL}/route-analysis`, {
        route: routeData,
      });

      return response.data;
    } catch (error) {
      console.error('[Gemini Service] Analyze route error:', error);
      return {
        suggestions: [
          'Consider starting early to avoid afternoon traffic',
          'Water sources available at camps',
        ],
        estimatedDuration: routeData.distance / 4,
        difficulty: 'Moderate',
        isMockData: true,
      };
    }
  }

  /**
   * Get live location-based recommendations
   * @param {Object} userLocation - User current location
   * @param {string} category - Recommendation category (camps, water, viewpoints, etc)
   * @returns {Promise} Location-based recommendations
   */
  static async getLocationBasedRecommendations(userLocation, category = 'all') {
    try {
      const response = await axiosInstance.post(`${GEMINI_API_URL}/location-recommendations`, {
        userLocation,
        category,
      });

      return response.data;
    } catch (error) {
      console.error('[Gemini Service] Get recommendations error:', error);
      return {
        recommendations: [],
        isMockData: true,
      };
    }
  }

  /**
   * Get emergency services nearby
   * @param {Object} location - Current location
   * @param {number} radius - Search radius in km
   * @returns {Promise} Emergency services data
   */
  static async getEmergencyServices(location, radius = 50) {
    try {
      const response = await axiosInstance.post(`${GEMINI_API_URL}/emergency-services`, {
        location,
        radius,
      });

      return response.data;
    } catch (error) {
      console.error('[Gemini Service] Get emergency services error:', error);
      return {
        services: [],
        nearestHospital: null,
        isMockData: true,
      };
    }
  }

  /**
   * Get cultural and historical information for the trek area
   * @param {Object} location - Trek location
   * @returns {Promise} Cultural information
   */
  static async getCulturalInfo(location) {
    try {
      const cacheKey = `${CACHE_KEY_PREFIX}culture_${location.id || location.name}`;
      const cached = getCachedData(cacheKey);
      if (cached) {
        return cached;
      }

      const response = await axiosInstance.post(`${GEMINI_API_URL}/cultural-info`, {
        location,
      });

      if (response.data) {
        setCachedData(cacheKey, response.data);
      }

      return response.data;
    } catch (error) {
      console.error('[Gemini Service] Get cultural info error:', error);
      return {
        history: '',
        culture: '',
        localTips: [],
        isMockData: true,
      };
    }
  }

  /**
   * Stream real-time updates for active trek
   * @param {string} trekId - Trek ID
   * @param {Function} onUpdate - Callback for updates
   * @returns {Function} Unsubscribe function
   */
  static subscribeToLiveUpdates(trekId, onUpdate) {
    // Simulate live updates in development
    const interval = setInterval(() => {
      onUpdate({
        timestamp: new Date(),
        trekId,
        data: {
          temperature: Math.random() * 30 - 10,
          humidity: Math.random() * 100,
          windSpeed: Math.random() * 20,
        },
      });
    }, 30000); // Update every 30 seconds

    // Return unsubscribe function
    return () => clearInterval(interval);
  }
}

export default GeminiService;
