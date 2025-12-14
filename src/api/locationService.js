/**
 * Location Service
 * Handles location-based trek recommendations and data fetching
 */

import GeminiService from './geminiService';
import treks from '../data/treks';

class LocationService {
  /**
   * Get trek recommendations based on user location
   * @param {Object} userLocation - User's current location {lat, lng, name}
   * @param {Object} preferences - User preferences for filtering
   * @returns {Promise} Location-based trek recommendations
   */
  static async getLocationBasedTreks(userLocation, preferences = {}) {
    try {
      // Use Gemini to get location-based recommendations
      const geminiRecommendations = await GeminiService.getLocationBasedRecommendations(
        userLocation, 
        'treks'
      );

      // Filter local treks based on location and preferences
      const localTreks = this.filterTreksByLocation(userLocation, preferences);

      return {
        aiRecommendations: geminiRecommendations.recommendations || [],
        localTreks,
        userLocation,
        isMockData: geminiRecommendations.isMockData
      };
    } catch (error) {
      console.error('[Location Service] Get location-based treks error:', error);
      
      // Fallback to local filtering
      const localTreks = this.filterTreksByLocation(userLocation, preferences);
      
      return {
        aiRecommendations: [],
        localTreks,
        userLocation,
        isMockData: true,
        error: error.message
      };
    }
  }

  /**
   * Filter treks based on proximity to user location
   * @param {Object} userLocation - User location
   * @param {Object} preferences - Filtering preferences
   * @returns {Array} Filtered treks with distance calculations
   */
  static filterTreksByLocation(userLocation, preferences = {}) {
    if (!userLocation || (!userLocation.lat && !userLocation.name)) {
      return treks.slice(0, 6); // Return first 6 treks if no location
    }

    // Calculate distances and sort by proximity
    const treksWithDistance = treks.map(trek => {
      const distance = this.calculateDistance(userLocation, trek);
      return { ...trek, distance };
    });

    // Sort by distance (closest first)
    treksWithDistance.sort((a, b) => a.distance - b.distance);

    // Apply additional filters
    let filtered = treksWithDistance;

    if (preferences.maxDistance) {
      filtered = filtered.filter(trek => trek.distance <= preferences.maxDistance);
    }

    if (preferences.difficulty) {
      filtered = filtered.filter(trek => trek.difficulty === preferences.difficulty);
    }

    if (preferences.maxDuration) {
      filtered = filtered.filter(trek => 
        parseInt(trek.duration) <= preferences.maxDuration
      );
    }

    return filtered.slice(0, 10); // Return top 10 closest treks
  }

  /**
   * Calculate approximate distance between user location and trek
   * @param {Object} userLocation - User location
   * @param {Object} trek - Trek data
   * @returns {number} Distance in kilometers (approximate)
   */
  static calculateDistance(userLocation, trek) {
    // If user location is just a name, use region-based approximation
    if (!userLocation.lat || !userLocation.lng) {
      if (userLocation.name && trek.region) {
        // Simple text matching for region proximity
        const userLocationLower = userLocation.name.toLowerCase();
        const trekRegionLower = trek.region.toLowerCase();
        
        if (trekRegionLower.includes(userLocationLower) || 
            userLocationLower.includes(trekRegionLower)) {
          return Math.random() * 50; // 0-50km for same region
        }
      }
      return Math.random() * 500 + 100; // 100-600km for different regions
    }

    // Use Haversine formula for lat/lng coordinates
    const R = 6371; // Earth's radius in kilometers
    const dLat = this.toRadians(trek.coordinates?.lat - userLocation.lat || 0);
    const dLng = this.toRadians(trek.coordinates?.lng - userLocation.lng || 0);
    
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(this.toRadians(userLocation.lat)) * 
              Math.cos(this.toRadians(trek.coordinates?.lat || userLocation.lat)) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }

  /**
   * Convert degrees to radians
   */
  static toRadians(degrees) {
    return degrees * (Math.PI / 180);
  }

  /**
   * Get weather and conditions for user's current location
   * @param {Object} userLocation - User location
   * @returns {Promise} Weather and safety information
   */
  static async getLocationWeatherAndSafety(userLocation) {
    try {
      const [weather, safety] = await Promise.all([
        GeminiService.getWeatherForecast(userLocation),
        GeminiService.getSafetyAlerts(userLocation)
      ]);

      return {
        weather,
        safety,
        location: userLocation
      };
    } catch (error) {
      console.error('[Location Service] Get weather and safety error:', error);
      return {
        weather: { isMockData: true, forecast: [] },
        safety: { isMockData: true, alerts: [], warnings: [] },
        location: userLocation,
        error: error.message
      };
    }
  }
}

export default LocationService;