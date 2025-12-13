/**
 * Difficulty Levels Data
 * Defines trek difficulty categories and their characteristics
 */

export const difficultyLevels = [
  {
    id: 1,
    level: 'Easy',
    description: 'Suitable for beginners and families. Low altitude, well-maintained trails.',
    icon: '🟢',
    characteristics: [
      'Short duration (1-3 days)',
      'Low altitude (under 2,000m)',
      'Well-marked trails',
      'Minimal technical skills required',
      'Suitable for all fitness levels',
    ],
    requirements:
      'Basic fitness, comfortable walking shoes, sun protection',
    examples: ['Local nature walks', 'Day hikes', 'Forest trails'],
  },
  {
    id: 2,
    level: 'Medium',
    description: 'Moderate challenges with some elevation gain. Requires basic fitness.',
    icon: '🟡',
    characteristics: [
      'Medium duration (4-7 days)',
      'Moderate altitude (2,000-3,500m)',
      'Some steep sections',
      'May require acclimatization',
      'Physical fitness beneficial',
    ],
    requirements:
      'Good fitness level, proper trekking boots, weather gear, 2-3 weeks training',
    examples: ['Mont Blanc Tour', 'Milford Track', 'Inca Trail'],
  },
  {
    id: 3,
    level: 'Hard',
    description: 'Challenging terrain with high altitude. Requires significant fitness.',
    icon: '🔴',
    characteristics: [
      'Long duration (8+ days)',
      'High altitude (above 3,500m)',
      'Steep climbs and technical sections',
      'Altitude acclimatization essential',
      'High fitness level required',
    ],
    requirements:
      'Excellent fitness, specialized gear, months of training, mountain experience',
    examples: ['Everest Base Camp', 'Kilimanjaro', 'Annapurna Circuit'],
  },
  {
    id: 4,
    level: 'Expert',
    description: 'Extreme challenges with high altitude and technical sections.',
    icon: '🔴🔴',
    characteristics: [
      'Very long duration (12+ days)',
      'Very high altitude (4,500m+)',
      'Steep mountain passes',
      'Technical climbing sections',
      'Prior mountaineering experience needed',
    ],
    requirements:
      'Elite fitness, professional-grade gear, extensive training, mountaineering cert',
    examples: [
      'Mount Everest Summit',
      'K2 Expedition',
      'GR20 Full Circuit',
    ],
  },
];

/**
 * Get difficulty level by name
 * @param {string} level - The difficulty level name
 * @returns {Object} The difficulty object or null
 */
export const getDifficultyByLevel = (level) => {
  return difficultyLevels.find(
    (d) => d.level.toLowerCase() === level.toLowerCase()
  );
};

/**
 * Get all difficulty levels
 * @returns {Array} Array of all difficulty levels
 */
export const getAllDifficultyLevels = () => {
  return difficultyLevels;
};

/**
 * Get difficulty level names for filter
 * @returns {Array} Array of difficulty names
 */
export const getDifficultyNames = () => {
  return difficultyLevels.map((d) => d.level);
};

/**
 * Get difficulty color code
 * @param {string} level - The difficulty level
 * @returns {string} Color code for the level
 */
export const getDifficultyColor = (level) => {
  const colorMap = {
    Easy: '#22c55e',
    Medium: '#f59e0b',
    Hard: '#ef4444',
    Expert: '#7c2d12',
  };
  return colorMap[level] || '#6b7280';
};

/**
 * Get difficulty icon
 * @param {string} level - The difficulty level
 * @returns {string} Icon emoji for the level
 */
export const getDifficultyIcon = (level) => {
  const iconMap = {
    Easy: '🟢',
    Medium: '🟡',
    Hard: '🔴',
    Expert: '🔴🔴',
  };
  return iconMap[level] || '❓';
};

// Default export for compatibility with existing imports
export default difficultyLevels;
