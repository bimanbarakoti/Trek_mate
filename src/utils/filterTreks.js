/**
 * Filter Treks Utility
 * Advanced filtering functions for trek listing and discovery
 */

/**
 * Filter treks by multiple criteria
 * @param {Array} treks - Array of trek objects
 * @param {Object} filters - Filter criteria
 * @returns {Array} Filtered treks
 */
export const filterTreks = (treks, filters = {}) => {
  const {
    searchQuery = '',
    search = '',
    region = '',
    difficulty = [],
    durationMin = 0,
    durationMax = 30,
    costMin = 0,
    costMax = 10000,
    ratingMin = 0,
    sortBy = 'rating',
  } = filters;
  
  const query = searchQuery || search;

  // Apply filters
  let filtered = treks.filter((trek) => {
    // Search query filter
    if (query) {
      const searchTerm = query.toLowerCase();
      if (
        !trek.name.toLowerCase().includes(searchTerm) &&
        !trek.description.toLowerCase().includes(searchTerm) &&
        !trek.region.toLowerCase().includes(searchTerm) &&
        !trek.difficulty.toLowerCase().includes(searchTerm)
      ) {
        return false;
      }
    }

    // Region filter
    if (region && region !== '' && trek.region !== region) {
      return false;
    }

    // Difficulty filter (array)
    if (difficulty && difficulty.length > 0 && !difficulty.includes(trek.difficulty)) {
      return false;
    }

    // Duration filters
    const trekDuration = parseInt(trek.duration) || trek.durationInDays || 0;
    if (durationMax && trekDuration > durationMax) {
      return false;
    }
    if (durationMin && trekDuration < durationMin) {
      return false;
    }

    // Altitude filters
    if (maxAltitude && trek.altitudeInMeters > maxAltitude) {
      return false;
    }
    if (minAltitude && trek.altitudeInMeters < minAltitude) {
      return false;
    }

    // Cost filters
    const trekCost = trek.costInUSD || parseInt(trek.cost?.replace(/[^0-9]/g, '')) || 0;
    if (costMax && trekCost > costMax) {
      return false;
    }
    if (costMin && trekCost < costMin) {
      return false;
    }

    // Rating filter
    if (ratingMin && ratingMin > 0 && trek.rating < ratingMin) {
      return false;
    }

    // Season filter
    if (season && !trek.bestTime.includes(season)) {
      return false;
    }

    return true;
  });

  // Sort results
  filtered = sortTreks(filtered, sortBy);

  return filtered;
};

/**
 * Sort treks by specified criteria
 * @param {Array} treks - Array of trek objects
 * @param {string} sortBy - Sort criteria (rating, price, duration, difficulty, name)
 * @returns {Array} Sorted treks
 */
export const sortTreks = (treks, sortBy = 'rating') => {
  const treksCopy = [...treks];

  switch (sortBy) {
    case 'rating':
      return treksCopy.sort((a, b) => b.rating - a.rating);

    case 'price-asc':
      return treksCopy.sort((a, b) => a.costInUSD - b.costInUSD);

    case 'price-desc':
      return treksCopy.sort((a, b) => b.costInUSD - a.costInUSD);

    case 'duration-asc':
      return treksCopy.sort((a, b) => a.durationInDays - b.durationInDays);

    case 'duration-desc':
      return treksCopy.sort((a, b) => b.durationInDays - a.durationInDays);

    case 'altitude-asc':
      return treksCopy.sort((a, b) => a.altitudeInMeters - b.altitudeInMeters);

    case 'altitude-desc':
      return treksCopy.sort((a, b) => b.altitudeInMeters - a.altitudeInMeters);

    case 'name':
      return treksCopy.sort((a, b) => a.name.localeCompare(b.name));

    case 'popularity':
      return treksCopy.sort((a, b) => b.reviews - a.reviews);

    case 'newest':
      return treksCopy.reverse();

    default:
      return treksCopy;
  }
};

/**
 * Filter treks by difficulty level
 * @param {Array} treks - Array of trek objects
 * @param {string} difficulty - Difficulty level
 * @returns {Array} Filtered treks
 */
export const filterByDifficulty = (treks, difficulty) => {
  return treks.filter((trek) => trek.difficulty === difficulty);
};

/**
 * Filter treks by region
 * @param {Array} treks - Array of trek objects
 * @param {string} region - Region name
 * @returns {Array} Filtered treks
 */
export const filterByRegion = (treks, region) => {
  return treks.filter((trek) => trek.region === region);
};

/**
 * Filter treks by duration range
 * @param {Array} treks - Array of trek objects
 * @param {number} minDays - Minimum duration
 * @param {number} maxDays - Maximum duration
 * @returns {Array} Filtered treks
 */
export const filterByDuration = (treks, minDays, maxDays) => {
  return treks.filter(
    (trek) => trek.durationInDays >= minDays && trek.durationInDays <= maxDays
  );
};

/**
 * Filter treks by altitude range
 * @param {Array} treks - Array of trek objects
 * @param {number} minAltitude - Minimum altitude in meters
 * @param {number} maxAltitude - Maximum altitude in meters
 * @returns {Array} Filtered treks
 */
export const filterByAltitude = (treks, minAltitude, maxAltitude) => {
  return treks.filter(
    (trek) =>
      trek.altitudeInMeters >= minAltitude && trek.altitudeInMeters <= maxAltitude
  );
};

/**
 * Filter treks by cost range
 * @param {Array} treks - Array of trek objects
 * @param {number} minCost - Minimum cost in USD
 * @param {number} maxCost - Maximum cost in USD
 * @returns {Array} Filtered treks
 */
export const filterByCost = (treks, minCost, maxCost) => {
  return treks.filter(
    (trek) => trek.costInUSD >= minCost && trek.costInUSD <= maxCost
  );
};

/**
 * Filter treks by minimum rating
 * @param {Array} treks - Array of trek objects
 * @param {number} minRating - Minimum rating
 * @returns {Array} Filtered treks
 */
export const filterByRating = (treks, minRating) => {
  return treks.filter((trek) => trek.rating >= minRating);
};

/**
 * Filter treks by season
 * @param {Array} treks - Array of trek objects
 * @param {string} season - Season name (month)
 * @returns {Array} Filtered treks
 */
export const filterBySeason = (treks, season) => {
  return treks.filter((trek) => trek.bestTime.includes(season));
};

/**
 * Search treks by query
 * @param {Array} treks - Array of trek objects
 * @param {string} query - Search query
 * @returns {Array} Search results
 */
export const searchTreks = (treks, query) => {
  const lowerQuery = query.toLowerCase();
  return treks.filter(
    (trek) =>
      trek.name.toLowerCase().includes(lowerQuery) ||
      trek.description.toLowerCase().includes(lowerQuery) ||
      trek.region.toLowerCase().includes(lowerQuery) ||
      trek.difficulty.toLowerCase().includes(lowerQuery)
  );
};

/**
 * Get trending treks (top rated, most reviewed)
 * @param {Array} treks - Array of trek objects
 * @param {number} limit - Number of treks to return
 * @returns {Array} Trending treks
 */
export const getTrendingTreks = (treks, limit = 5) => {
  return treks
    .sort((a, b) => {
      // Sort by rating and reviews
      const aScore = a.rating * Math.log(a.reviews + 1);
      const bScore = b.rating * Math.log(b.reviews + 1);
      return bScore - aScore;
    })
    .slice(0, limit);
};

/**
 * Get budget-friendly treks
 * @param {Array} treks - Array of trek objects
 * @param {number} maxBudget - Maximum budget in USD
 * @returns {Array} Budget-friendly treks
 */
export const getBudgetFriendlyTreks = (treks, maxBudget = 1000) => {
  return treks
    .filter((trek) => trek.costInUSD <= maxBudget)
    .sort((a, b) => b.rating - a.rating);
};

/**
 * Get easy treks for beginners
 * @param {Array} treks - Array of trek objects
 * @returns {Array} Easy treks
 */
export const getBeginnerFriendlyTreks = (treks) => {
  return treks.filter((trek) => trek.difficulty === 'Easy');
};

/**
 * Get adventure treks (hard/expert)
 * @param {Array} treks - Array of trek objects
 * @returns {Array} Adventure treks
 */
export const getAdventureTreks = (treks) => {
  return treks.filter((trek) => trek.difficulty === 'Hard' || trek.difficulty === 'Expert');
};

/**
 * Calculate filter statistics
 * @param {Array} treks - Array of trek objects
 * @returns {Object} Statistics
 */
export const getFilterStatistics = (treks) => {
  return {
    totalCount: treks.length,
    byDifficulty: {
      Easy: treks.filter((t) => t.difficulty === 'Easy').length,
      Medium: treks.filter((t) => t.difficulty === 'Medium').length,
      Hard: treks.filter((t) => t.difficulty === 'Hard').length,
      Expert: treks.filter((t) => t.difficulty === 'Expert').length,
    },
    byRegion: treks.reduce((acc, trek) => {
      acc[trek.region] = (acc[trek.region] || 0) + 1;
      return acc;
    }, {}),
    priceRange: {
      min: Math.min(...treks.map((t) => t.costInUSD)),
      max: Math.max(...treks.map((t) => t.costInUSD)),
      avg: Math.round(
        treks.reduce((sum, t) => sum + t.costInUSD, 0) / treks.length
      ),
    },
    durationRange: {
      min: Math.min(...treks.map((t) => t.durationInDays)),
      max: Math.max(...treks.map((t) => t.durationInDays)),
      avg: Math.round(
        treks.reduce((sum, t) => sum + t.durationInDays, 0) / treks.length
      ),
    },
    altitudeRange: {
      min: Math.min(...treks.map((t) => t.altitudeInMeters)),
      max: Math.max(...treks.map((t) => t.altitudeInMeters)),
      avg: Math.round(
        treks.reduce((sum, t) => sum + t.altitudeInMeters, 0) / treks.length
      ),
    },
    averageRating: (treks.reduce((sum, t) => sum + t.rating, 0) / treks.length).toFixed(1),
  };
};
