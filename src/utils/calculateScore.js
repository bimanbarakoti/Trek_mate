/**
 * Calculate Trek Score
 * Calculates an overall score for a trek based on various factors
 * Used for sorting and recommending treks
 */

/**
 * Calculate a numerical score for a trek
 * Score factors: rating, difficulty, popularity, altitude, duration
 * @param {Object} trek - Trek object
 * @param {Object} userPreferences - User preferences
 * @returns {number} Trek score (0-100)
 */
export const calculateTrekScore = (trek, userPreferences = {}) => {
  let score = 0;

  // Rating score (0-30 points)
  if (trek.rating) {
    score += Math.min((trek.rating / 5) * 30, 30);
  }

  // Popularity score based on reviews (0-20 points)
  if (trek.reviews) {
    score += Math.min((trek.reviews / 500) * 20, 20);
  }

  // Difficulty preference match (0-15 points)
  if (userPreferences.difficulty) {
    const difficultyMap = { Easy: 1, Medium: 2, Hard: 3 };
    const trekDiffValue = difficultyMap[trek.difficulty] || 2;
    const prefDiffValue = difficultyMap[userPreferences.difficulty] || 2;
    const diffMatch = 1 - Math.abs(trekDiffValue - prefDiffValue) / 3;
    score += diffMatch * 15;
  }

  // Duration preference match (0-15 points)
  if (userPreferences.maxDays) {
    const durationMatch = 1 - Math.min(trek.durationInDays / userPreferences.maxDays, 1);
    score += durationMatch * 15;
  }

  // Cost preference match (0-10 points)
  if (userPreferences.maxBudget) {
    const costMatch = 1 - Math.min(trek.costInUSD / userPreferences.maxBudget, 1);
    score += costMatch * 10;
  }

  // Altitude preference match (0-10 points)
  if (userPreferences.maxAltitude) {
    const altitudeMatch = 1 - Math.min(trek.altitudeInMeters / userPreferences.maxAltitude, 1);
    score += altitudeMatch * 10;
  }

  return Math.round(Math.min(score, 100));
};

/**
 * Calculate difficulty multiplier for filtering
 * @param {string} difficulty - Difficulty level
 * @returns {number} Difficulty multiplier
 */
export const getDifficultyMultiplier = (difficulty) => {
  const multipliers = {
    Easy: 1,
    Medium: 2,
    Hard: 3,
    Expert: 4,
  };
  return multipliers[difficulty] || 1;
};

/**
 * Get score color for UI display
 * @param {number} score - Score value (0-100)
 * @returns {string} Color code or class name
 */
export const getScoreColor = (score) => {
  if (score >= 80) return 'bg-green-500'; // Excellent
  if (score >= 60) return 'bg-blue-500'; // Good
  if (score >= 40) return 'bg-yellow-500'; // Fair
  return 'bg-red-500'; // Poor
};

/**
 * Get score label
 * @param {number} score - Score value (0-100)
 * @returns {string} Score label
 */
export const getScoreLabel = (score) => {
  if (score >= 80) return 'Excellent';
  if (score >= 60) return 'Good';
  if (score >= 40) return 'Fair';
  return 'Poor';
};

/**
 * Rate trek based on user feedback
 * @param {Object} trek - Trek object
 * @param {number} rating - User rating (1-5)
 * @param {string} review - User review text
 * @returns {Object} Updated trek with new rating
 */
export const rateTrek = (trek, rating, review) => {
  if (!trek || rating < 1 || rating > 5) {
    throw new Error('Invalid trek or rating');
  }

  const newRating = (trek.rating * trek.reviews + rating) / (trek.reviews + 1);
  const newReviews = trek.reviews + 1;

  return {
    ...trek,
    rating: parseFloat(newRating.toFixed(1)),
    reviews: newReviews,
    lastReview: {
      rating,
      text: review,
      date: new Date(),
    },
  };
};

/**
 * Compare two treks
 * @param {Object} trek1 - First trek
 * @param {Object} trek2 - Second trek
 * @returns {Object} Comparison object
 */
export const compareTreks = (trek1, trek2) => {
  return {
    trek1Name: trek1.name,
    trek2Name: trek2.name,
    ratingDiff: trek1.rating - trek2.rating,
    costDiff: trek1.costInUSD - trek2.costInUSD,
    durationDiff: trek1.durationInDays - trek2.durationInDays,
    altitudeDiff: trek1.altitudeInMeters - trek2.altitudeInMeters,
    difficulty: {
      same: trek1.difficulty === trek2.difficulty,
      difference: trek1.difficulty !== trek2.difficulty,
    },
  };
};

/**
 * Calculate trek completion percentage
 * @param {Object} trekData - Trek data with itinerary
 * @param {number} currentDay - Current day number
 * @returns {number} Completion percentage
 */
export const calculateCompletion = (trekData, currentDay) => {
  if (!trekData.itinerary) return 0;
  return Math.round((currentDay / trekData.itinerary.length) * 100);
};

/**
 * Get difficulty badge for trek
 * @param {string} difficulty - Difficulty level
 * @returns {Object} Badge configuration
 */
export const getDifficultyBadge = (difficulty) => {
  const badges = {
    Easy: { color: 'green', icon: '🟢' },
    Medium: { color: 'yellow', icon: '🟡' },
    Hard: { color: 'red', icon: '🔴' },
    Expert: { color: 'darkred', icon: '🔴🔴' },
  };
  return badges[difficulty] || { color: 'gray', icon: '❓' };
};
