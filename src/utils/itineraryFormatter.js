/**
 * Itinerary Formatter Utility
 * Functions for formatting and parsing trek itineraries
 */

/**
 * Format itinerary into readable sections
 * @param {Array} itinerary - Itinerary array
 * @returns {Object} Formatted itinerary sections
 */
export const formatItinerary = (itinerary) => {
  if (!itinerary || !Array.isArray(itinerary)) {
    return { days: [], summary: '' };
  }

  const formattedDays = itinerary.map((item) => ({
    day: item.day,
    title: item.title || `Day ${item.day}`,
    description: item.description || '',
    distance: item.distance || null,
    elevation: item.elevation || null,
    highlights: item.highlights || [],
    meals: item.meals || ['Breakfast', 'Lunch', 'Dinner'],
    accommodation: item.accommodation || 'Tent',
    difficulty: item.difficulty || 'Moderate',
  }));

  const summary = generateItinerarySummary(formattedDays);

  return {
    days: formattedDays,
    summary,
    totalDays: formattedDays.length,
  };
};

/**
 * Generate a text summary of the itinerary
 * @param {Array} days - Array of day objects
 * @returns {string} Summary text
 */
const generateItinerarySummary = (days) => {
  if (days.length === 0) return '';

  let summary = `This ${days.length}-day trek includes: `;
  const highlights = days.flatMap((day) => [day.title, ...day.highlights]).slice(0, 5);
  summary += highlights.join(', ');
  if (days.length > 5) summary += ', and more...';

  return summary;
};

/**
 * Get itinerary for specific day
 * @param {Array} itinerary - Itinerary array
 * @param {number} dayNumber - Day number
 * @returns {Object} Day itinerary or null
 */
export const getDayItinerary = (itinerary, dayNumber) => {
  if (!itinerary) return null;
  return itinerary.find((item) => item.day === dayNumber) || null;
};

/**
 * Calculate total distance for itinerary
 * @param {Array} itinerary - Itinerary array
 * @returns {number} Total distance in km
 */
export const calculateTotalDistance = (itinerary) => {
  if (!itinerary) return 0;

  return itinerary.reduce((total, day) => {
    if (day.distance) {
      const match = day.distance.match(/(\d+\.?\d*)/);
      if (match) return total + parseFloat(match[0]);
    }
    return total;
  }, 0);
};

/**
 * Calculate total elevation gain
 * @param {Array} itinerary - Itinerary array
 * @returns {number} Total elevation gain in meters
 */
export const calculateTotalElevation = (itinerary) => {
  if (!itinerary) return 0;

  return itinerary.reduce((total, day) => {
    if (day.elevation) {
      const ascent = day.elevation.match(/Ascent (\d+)/);
      if (ascent) return total + parseInt(ascent[1]);
    }
    return total;
  }, 0);
};

/**
 * Parse itinerary elevation string (e.g., "Ascent 500m, Descent 200m")
 * @param {string} elevationString - Elevation string
 * @returns {Object} { ascent, descent }
 */
export const parseElevation = (elevationString) => {
  if (!elevationString) return { ascent: 0, descent: 0 };

  const ascentMatch = elevationString.match(/Ascent (\d+)/);
  const descentMatch = elevationString.match(/Descent (\d+)/);

  return {
    ascent: ascentMatch ? parseInt(ascentMatch[1]) : 0,
    descent: descentMatch ? parseInt(descentMatch[1]) : 0,
  };
};

/**
 * Parse distance from string (e.g., "12 km" or "5-7 hours")
 * @param {string} distanceString - Distance string
 * @returns {number} Distance in km
 */
export const parseDistance = (distanceString) => {
  if (!distanceString) return 0;

  const match = distanceString.match(/(\d+)/);
  return match ? parseInt(match[0]) : 0;
};

/**
 * Calculate average daily distance
 * @param {Array} itinerary - Itinerary array
 * @returns {number} Average distance per day in km
 */
export const calculateAverageDailyDistance = (itinerary) => {
  if (!itinerary || itinerary.length === 0) return 0;

  const totalDistance = calculateTotalDistance(itinerary);
  const trekDays = itinerary.filter((day) => day.distance).length;

  return trekDays > 0 ? Math.round((totalDistance / trekDays) * 10) / 10 : 0;
};

/**
 * Calculate difficulty level based on itinerary
 * @param {Array} itinerary - Itinerary array
 * @param {number} maxAltitude - Maximum altitude in meters
 * @returns {string} Difficulty level
 */
export const calculateDifficulty = (itinerary, maxAltitude = 3000) => {
  if (!itinerary || itinerary.length === 0) return 'Easy';

  const totalElevation = calculateTotalElevation(itinerary);
  const avgDistance = calculateAverageDailyDistance(itinerary);

  let difficultyScore = 0;

  // Score based on total elevation
  if (totalElevation > 5000) difficultyScore += 3;
  else if (totalElevation > 2000) difficultyScore += 2;
  else if (totalElevation > 500) difficultyScore += 1;

  // Score based on average daily distance
  if (avgDistance > 20) difficultyScore += 2;
  else if (avgDistance > 15) difficultyScore += 1;

  // Score based on altitude
  if (maxAltitude > 4000) difficultyScore += 3;
  else if (maxAltitude > 3000) difficultyScore += 2;
  else if (maxAltitude > 2000) difficultyScore += 1;

  // Determine difficulty level
  if (difficultyScore >= 7) return 'Expert';
  if (difficultyScore >= 5) return 'Hard';
  if (difficultyScore >= 3) return 'Medium';
  return 'Easy';
};

/**
 * Format itinerary as HTML table
 * @param {Array} itinerary - Itinerary array
 * @returns {string} HTML table string
 */
export const itineraryToHTML = (itinerary) => {
  if (!itinerary || itinerary.length === 0) return '';

  let html = '<table class="itinerary-table">';
  html += '<thead><tr><th>Day</th><th>Description</th><th>Distance</th><th>Elevation</th></tr></thead>';
  html += '<tbody>';

  itinerary.forEach((day) => {
    html += '<tr>';
    html += `<td>${day.day}</td>`;
    html += `<td>${day.title}<br/><small>${day.description}</small></td>`;
    html += `<td>${day.distance || '-'}</td>`;
    html += `<td>${day.elevation || '-'}</td>`;
    html += '</tr>';
  });

  html += '</tbody></table>';
  return html;
};

/**
 * Create a printable itinerary
 * @param {Object} trek - Trek object
 * @returns {string} Printable itinerary
 */
export const createPrintableItinerary = (trek) => {
  if (!trek || !trek.itinerary) return '';

  let content = `# ${trek.name} - Detailed Itinerary\n\n`;
  content += `**Duration:** ${trek.duration}\n`;
  content += `**Difficulty:** ${trek.difficulty}\n`;
  content += `**Total Distance:** ${calculateTotalDistance(trek.itinerary)} km\n`;
  content += `**Total Elevation:** ${calculateTotalElevation(trek.itinerary)} m\n\n`;

  trek.itinerary.forEach((day) => {
    content += `## Day ${day.day}: ${day.title}\n`;
    content += `${day.description}\n`;
    if (day.distance) content += `**Distance:** ${day.distance}\n`;
    if (day.elevation) content += `**Elevation:** ${day.elevation}\n`;
    content += '\n';
  });

  return content;
};

/**
 * Export itinerary as JSON
 * @param {Object} trek - Trek object
 * @returns {string} JSON string
 */
export const exportItineraryAsJSON = (trek) => {
  const itineraryData = {
    trek: trek.name,
    duration: trek.duration,
    difficulty: trek.difficulty,
    itinerary: trek.itinerary,
    totalDistance: calculateTotalDistance(trek.itinerary),
    totalElevation: calculateTotalElevation(trek.itinerary),
    exportDate: new Date().toISOString(),
  };

  return JSON.stringify(itineraryData, null, 2);
};

/**
 * Parse itinerary from CSV-like format
 * @param {string} csvData - CSV formatted data
 * @returns {Array} Parsed itinerary
 */
export const parseItineraryFromCSV = (csvData) => {
  const lines = csvData.split('\n').filter((line) => line.trim());
  const itinerary = [];

  lines.forEach((line) => {
    const [day, title, description, distance, elevation] = line.split(',').map((s) => s.trim());

    if (day && !isNaN(day)) {
      itinerary.push({
        day: parseInt(day),
        title: title || `Day ${day}`,
        description: description || '',
        distance: distance || null,
        elevation: elevation || null,
      });
    }
  });

  return itinerary;
};

/**
 * Alias for backward compatibility: getTotalAltitudeGain
 * Many components import `getTotalAltitudeGain` — provide it as an alias
 */
export const getTotalAltitudeGain = calculateTotalElevation;
