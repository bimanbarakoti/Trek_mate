/**
 * Trekking Regions Data
 * Categorizes treks by geographic regions
 */

export const regions = [
  {
    id: 1,
    name: 'Himalayas',
    description: 'The highest mountain range in the world, featuring iconic treks like Everest Base Camp and Annapurna Circuit.',
    countries: ['Nepal', 'India', 'Bhutan', 'Tibet'],
    bestSeason: 'September - November, March - May',
    icon: '⛰️',
  },
  {
    id: 2,
    name: 'Africa',
    description: 'Home to Mount Kilimanjaro and diverse wildlife. Experience African landscapes and cultures.',
    countries: ['Tanzania', 'Kenya', 'Uganda', 'South Africa'],
    bestSeason: 'January - March, June - October',
    icon: '🦁',
  },
  {
    id: 3,
    name: 'South America',
    description: 'Features the Inca Trail, Patagonia, and Amazon regions with incredible biodiversity.',
    countries: ['Peru', 'Chile', 'Argentina', 'Colombia', 'Ecuador'],
    bestSeason: 'May - September',
    icon: '🦙',
  },
  {
    id: 4,
    name: 'Europe',
    description: 'Alpine and cultural treks including Mont Blanc, GR20, and numerous European trails.',
    countries: ['France', 'Switzerland', 'Italy', 'Spain', 'Austria', 'Germany'],
    bestSeason: 'June - September',
    icon: '⛰️',
  },
  {
    id: 5,
    name: 'Oceania',
    description: 'New Zealand and Australia offer Great Walks with unique landscapes and wildlife.',
    countries: ['New Zealand', 'Australia', 'Papua New Guinea'],
    bestSeason: 'November - April',
    icon: '🌋',
  },
  {
    id: 6,
    name: 'Southeast Asia',
    description: 'Diverse trekking with lush jungles, mountains, and cultural experiences.',
    countries: ['Thailand', 'Vietnam', 'Myanmar', 'Laos', 'Indonesia'],
    bestSeason: 'November - February',
    icon: '🏞️',
  },
];

/**
 * Get a region by name
 * @param {string} name - The region name
 * @returns {Object} The region object or null
 */
export const getRegionByName = (name) => {
  return regions.find((region) => region.name === name);
};

/**
 * Get all regions
 * @returns {Array} Array of all regions
 */
export const getAllRegions = () => {
  return regions;
};

/**
 * Get region names for dropdown/filter
 * @returns {Array} Array of region names
 */
export const getRegionNames = () => {
  return regions.map((region) => region.name);
};

// Default export for compatibility with existing imports
export default regions;
