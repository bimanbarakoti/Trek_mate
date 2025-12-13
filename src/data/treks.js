/**
 * Sample Trek Data
 * Contains a collection of trekking trails with detailed information
 * Used for listing, filtering, and detail pages
 */

export const treks = [
  {
    id: 1,
    name: 'Everest Base Camp Trek',
    region: 'Himalayas',
    difficulty: 'Hard',
    duration: '14 days',
    durationInDays: 14,
    altitude: '5,364 meters',
    altitudeInMeters: 5364,
    cost: '$1,500',
    costInUSD: 1500,
    bestSeason: 'September - November, March - May',
    description:
      'The most iconic trekking route in the world. Experience the breathtaking beauty of the Himalayas as you trek to the base camp of Mount Everest.',
    detailedDescription:
      'This legendary trek takes you through the Khumbu region of Nepal, offering stunning views of snow-capped peaks and Sherpa villages. The trail gradually ascends from Kathmandu to the base camp at 5,364 meters, where you can witness the majestic Mount Everest. The trek is challenging but rewarding, with proper acclimatization stops along the way.',
    rating: 4.8,
    reviews: 342,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=400',
    gallery: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
      'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=800',
      'https://images.unsplash.com/photo-1493514789921-586cb221acd7?w=800',
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Kathmandu',
        description: 'Arrive at Tribhuvan International Airport. Transfer to hotel and rest.',
      },
      {
        day: 2,
        title: 'Kathmandu Exploration',
        description: 'Visit Durbar Square, Swayambhunath, and Boudhanath Stupa.',
      },
      {
        day: 3,
        title: 'Fly to Lukla & Trek to Phakding',
        description: 'Scenic flight to Lukla (2,860m). Trek to Phakding (2,610m).',
        distance: '5 km',
        elevation: 'Descent 250m',
      },
      {
        day: 4,
        title: 'Phakding to Namche Bazaar',
        description: 'Trek through rhododendron forests to Namche Bazaar.',
        distance: '11 km',
        elevation: 'Ascent 970m',
      },
      {
        day: 5,
        title: 'Acclimatization at Namche',
        description: 'Rest day with optional hike to Everest View Hotel.',
        distance: '3 km',
        elevation: 'Variable',
      },
      {
        day: 6,
        title: 'Namche to Tengboche',
        description: 'Trek to Tengboche via Kyangjuma. Visit the famous monastery.',
        distance: '10 km',
        elevation: 'Ascent 530m',
      },
      {
        day: 7,
        title: 'Tengboche to Dingboche',
        description: 'Trek through yak pastures to Dingboche village.',
        distance: '8 km',
        elevation: 'Ascent 280m',
      },
      {
        day: 8,
        title: 'Acclimatization at Dingboche',
        description: 'Rest day with hike to Chhukung Valley.',
        distance: '5 km',
        elevation: 'Variable',
      },
      {
        day: 9,
        title: 'Dingboche to Gorak Shep',
        description: 'Trek through rocky terrain to Gorak Shep base camp.',
        distance: '11 km',
        elevation: 'Ascent 600m',
      },
      {
        day: 10,
        title: 'Everest Base Camp Summit',
        description: 'Early morning trek to Everest Base Camp. Return to Gorak Shep.',
        distance: '17 km round trip',
        elevation: 'Ascent 350m',
      },
      {
        day: 11,
        title: 'Gorak Shep to Pheriche',
        description: 'Descent to Pheriche for overnight stay.',
        distance: '12 km',
        elevation: 'Descent 600m',
      },
      {
        day: 12,
        title: 'Pheriche to Namche Bazaar',
        description: 'Rapid descent back to Namche Bazaar.',
        distance: '19 km',
        elevation: 'Descent 950m',
      },
      {
        day: 13,
        title: 'Namche to Kathmandu',
        description: 'Trek back to Lukla and fly to Kathmandu. Relaxation day.',
      },
      {
        day: 14,
        title: 'Departure',
        description: 'Depart for home with unforgettable memories.',
      },
    ],
    bestTime: ['September', 'October', 'November', 'March', 'April', 'May'],
    temperature: { min: -10, max: 15 },
    weatherInfo:
      'Clear skies and stable weather during autumn and spring. Winter brings heavy snow, summer has monsoon rains.',
    safetyTips: [
      'Proper acclimatization is essential',
      'Hire experienced local guides',
      'Carry comprehensive travel insurance',
      'Start early to avoid altitude sickness',
    ],
    packingList: ['Thermal clothing', 'Sleeping bag', 'Trekking poles', 'High-SPF sunscreen'],
    accessibility: 'Moderate to Hard physical fitness required',
  },

  {
    id: 2,
    name: 'Kilimanjaro Trek',
    region: 'Africa',
    difficulty: 'Hard',
    duration: '7 days',
    durationInDays: 7,
    altitude: '5,895 meters',
    altitudeInMeters: 5895,
    cost: '$1,200',
    costInUSD: 1200,
    bestSeason: 'January - March, June - October',
    description:
      'Climb Africa\'s highest peak with stunning views across the Tanzanian landscape.',
    detailedDescription:
      'Mount Kilimanjaro offers various trekking routes, each with unique scenery and difficulty levels. The Marangu route is the most popular with hut accommodations, while Machame offers a more challenging experience.',
    rating: 4.7,
    reviews: 298,
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=500&h=400',
    gallery: [
      'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800',
      'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800',
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Kilimanjaro', description: 'Hotel check-in and briefing' },
      { day: 2, title: 'Machame Gate to Machame Camp', description: 'Trek through rainforest' },
      { day: 3, title: 'Machame Camp to Shira Camp', description: 'Higher altitude trek' },
      { day: 4, title: 'Shira Camp to Barranco Camp', description: 'Cross plateau region' },
      { day: 5, title: 'Barranco to Karanga Camp', description: 'Steep ascent and descent' },
      { day: 6, title: 'Karanga to Barafu Camp', description: 'Final preparation camp' },
      {
        day: 7,
        title: 'Summit Push & Descent',
        description: 'Early morning summit attempt, descend to Mweka Camp',
      },
    ],
    bestTime: ['January', 'February', 'March', 'June', 'July', 'August', 'September', 'October'],
    temperature: { min: -20, max: 20 },
    weatherInfo: 'Variable weather with potential snow at summit',
    safetyTips: ['Altitude sickness precautions', 'Quality gear essential', 'Experienced guides'],
    packingList: ['Down jacket', 'Trekking poles', 'Headlamp', 'Thermal layers'],
    accessibility: 'Hard - requires high fitness level',
  },

  {
    id: 3,
    name: 'Inca Trail Trek',
    region: 'South America',
    difficulty: 'Medium',
    duration: '4 days',
    durationInDays: 4,
    altitude: '4,215 meters',
    altitudeInMeters: 4215,
    cost: '$800',
    costInUSD: 800,
    bestSeason: 'May - September',
    description:
      'Walk the legendary Inca Trail to the mystical ruins of Machu Picchu in Peru.',
    detailedDescription:
      'This historic trek follows the original Inca road, passing through cloud forests, alpine meadows, and ruins. The final destination is Machu Picchu, one of the New Seven Wonders of the World.',
    rating: 4.9,
    reviews: 521,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=400',
    gallery: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    ],
    itinerary: [
      { day: 1, title: 'Cusco Acclimatization', description: 'Explore the Sacred Valley' },
      { day: 2, title: 'Inca Trail Start', description: 'Trek from Km 82 to Wayllabamba' },
      { day: 3, title: 'Dead Woman\'s Pass', description: 'Highest point of the trek' },
      { day: 4, title: 'Machu Picchu', description: 'Final trek to the ancient ruins' },
    ],
    bestTime: ['May', 'June', 'July', 'August', 'September'],
    temperature: { min: 5, max: 20 },
    weatherInfo: 'Dry season with clear skies and possible rain',
    safetyTips: [
      'Early booking recommended (permits limited)',
      'Acclimatize in Cusco first',
      'Respect Inca heritage sites',
    ],
    packingList: ['Rain jacket', 'Hiking boots', 'Sun protection', 'Camera'],
    accessibility: 'Medium - good fitness level required',
  },

  {
    id: 4,
    name: 'Torres del Paine Trek',
    region: 'South America',
    difficulty: 'Hard',
    duration: '8 days',
    durationInDays: 8,
    altitude: '1,700 meters',
    altitudeInMeters: 1700,
    cost: '$1,100',
    costInUSD: 1100,
    bestSeason: 'December - February',
    description:
      'Epic trek through Patagonia\'s most dramatic landscape with granite towers.',
    detailedDescription:
      'The famous O Trek or Full Circuit Trek offers stunning views of the Torres del Paine granite peaks, glaciers, and turquoise lakes in Chilean Patagonia.',
    rating: 4.8,
    reviews: 187,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=400',
    gallery: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    ],
    itinerary: [
      { day: 1, title: 'Punta Arenas Arrival', description: 'Transfer to Torres del Paine' },
      { day: 2, title: 'Grey Glacier', description: 'Trek to Grey Camp' },
      { day: 3, title: 'Paso Paso Trek', description: 'Cross mountain pass' },
      { day: 4, title: 'Valle del Silencio', description: 'Trek through silent valley' },
      { day: 5, title: 'Las Torres', description: 'Trek to the famous towers' },
      { day: 6, title: 'Campamento Italiano', description: 'Return trek' },
      { day: 7, title: 'Laguna Sarmiento', description: 'Scenic final trek' },
      { day: 8, title: 'Return', description: 'Return to Punta Arenas' },
    ],
    bestTime: ['December', 'January', 'February'],
    temperature: { min: 5, max: 18 },
    weatherInfo: 'Summer season, but weather can be unpredictable with wind',
    safetyTips: [
      'Waterproof gear essential',
      'Be prepared for wind and sudden changes',
      'Check routes before setting out',
    ],
    packingList: [
      'Windproof jacket',
      'Waterproof pants',
      'Warm layers',
      'Quality camping gear',
    ],
    accessibility: 'Hard - requires excellent fitness and camping experience',
  },

  {
    id: 5,
    name: 'GR20 Trek - Corsica',
    region: 'Europe',
    difficulty: 'Hard',
    duration: '16 days',
    durationInDays: 16,
    altitude: '2,710 meters',
    altitudeInMeters: 2710,
    cost: '$900',
    costInUSD: 900,
    bestSeason: 'June - September',
    description:
      'One of Europe\'s most challenging long-distance treks across the island of Corsica.',
    detailedDescription:
      'The GR20 is a demanding traverse of Corsica from north to south, passing through alpine meadows, granite ridges, and Mediterranean wilderness.',
    rating: 4.6,
    reviews: 156,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=400',
    gallery: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    ],
    itinerary: [
      { day: 1, title: 'Calenzana Start', description: 'Begin the GR20 trek' },
      { day: 8, title: 'Mid-point', description: 'Reach Vizzavona' },
      { day: 16, title: 'Conca End', description: 'Complete the trek' },
    ],
    bestTime: ['June', 'July', 'August', 'September'],
    temperature: { min: 10, max: 25 },
    weatherInfo: 'Generally good in summer, possible afternoon thunderstorms',
    safetyTips: [
      'Very challenging endurance trek',
      'Proper mountain experience needed',
      'Camp ahead of time',
    ],
    packingList: [
      'Lightweight tent',
      'Efficient stove',
      'Lightweight gear',
      'Water purification',
    ],
    accessibility: 'Hard - Ultra-endurance trek',
  },

  {
    id: 6,
    name: 'Annapurna Circuit Trek',
    region: 'Himalayas',
    difficulty: 'Hard',
    duration: '16 days',
    durationInDays: 16,
    altitude: '5,416 meters',
    altitudeInMeters: 5416,
    cost: '$1,300',
    costInUSD: 1300,
    bestSeason: 'October - November, March - April',
    description:
      'A complete circuit around the Annapurna Massif with diverse landscapes and cultures.',
    detailedDescription:
      'The Annapurna Circuit is considered one of the most beautiful treks in the world, circumnavigating the Annapurna Massif through a variety of terrain and climates.',
    rating: 4.8,
    reviews: 412,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=400',
    gallery: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    ],
    itinerary: [
      { day: 1, title: 'Kathmandu to Besisahar', description: 'Travel day' },
      { day: 2, title: 'Besisahar to Chame', description: 'Trek through forests' },
      { day: 3, title: 'Upper Pisang', description: 'Scenic mountain views' },
      { day: 4, title: 'Manang Acclimatization', description: 'Rest and explore' },
      { day: 5, title: 'Pang Phusi Pass', description: 'High altitude pass' },
      { day: 6, title: 'Thorong Phedi Camp', description: 'Base for next day' },
      { day: 7, title: 'Thorong La Pass', description: 'Highest point at 5,416m' },
      { day: 8, title: 'Jomsom', description: 'Descent to Jomsom' },
      { day: 9, title: 'Tatopani', description: 'Visit hot springs' },
      { day: 10, title: 'Sikha', description: 'Trek through villages' },
      { day: 11, title: 'Ghorepani', description: 'Poon Hill region' },
      { day: 12, title: 'Poon Hill Sunrise', description: 'Early morning hike' },
      { day: 13, title: 'Tikhedhungga', description: 'Descent begins' },
      { day: 14, title: 'Nayapul to Pokhara', description: 'Trek completion' },
      { day: 15, title: 'Pokhara Exploration', description: 'Relax and explore' },
      { day: 16, title: 'Return to Kathmandu', description: 'Travel day home' },
    ],
    bestTime: ['October', 'November', 'March', 'April'],
    temperature: { min: -15, max: 20 },
    weatherInfo: 'Stable weather with clear visibility during best seasons',
    safetyTips: [
      'Acclimatize properly at Manang',
      'Hire experienced guides',
      'Check weather before Thorong La Pass',
    ],
    packingList: [
      'Down jacket',
      'Thermal layers',
      'Trekking poles',
      'Sleeping bag',
    ],
    accessibility: 'Hard - high altitude, physical endurance required',
  },

  {
    id: 7,
    name: 'Mont Blanc Trek',
    region: 'Europe',
    difficulty: 'Medium',
    duration: '5 days',
    durationInDays: 5,
    altitude: '4,808 meters',
    altitudeInMeters: 4808,
    cost: '$600',
    costInUSD: 600,
    bestSeason: 'June - September',
    description:
      'Trek around Western Europe\'s highest peak with Alpine scenery.',
    detailedDescription:
      'The Mont Blanc Tour circumnavigates the massif through France, Italy, and Switzerland, offering stunning alpine views and diverse culture.',
    rating: 4.7,
    reviews: 234,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=400',
    gallery: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    ],
    itinerary: [
      { day: 1, title: 'Les Praz to Tete aux Vents', description: 'Start the circuit' },
      { day: 2, title: 'Tete aux Vents to Elisabethhauser', description: 'Alpine trek' },
      { day: 3, title: 'Elisabethhauser to Montenvers', description: 'Glacier views' },
      { day: 4, title: 'Montenvers to Grand Col Ferret', description: 'High pass crossing' },
      { day: 5, title: 'Grand Col Ferret to Courmayeur', description: 'Final descent' },
    ],
    bestTime: ['June', 'July', 'August', 'September'],
    temperature: { min: 5, max: 20 },
    weatherInfo: 'Alpine weather can be unpredictable, clear days in summer',
    safetyTips: [
      'Proper mountain equipment',
      'Weather dependent closure possible',
      'Start early in day',
    ],
    packingList: ['Alpine boots', 'Weather gear', 'Sunscreen', 'Map and compass'],
    accessibility: 'Medium - Good fitness required',
  },

  {
    id: 8,
    name: 'Milford Track Trek',
    region: 'Oceania',
    difficulty: 'Medium',
    duration: '4 days',
    durationInDays: 4,
    altitude: '1,073 meters',
    altitudeInMeters: 1073,
    cost: '$700',
    costInUSD: 700,
    bestSeason: 'November - April',
    description:
      'One of the world\'s most scenic walks through New Zealand\'s Fiordland.',
    detailedDescription:
      'The Milford Track is one of New Zealand\'s Great Walks, featuring rainforests, mountains, and dramatic fjord scenery.',
    rating: 4.9,
    reviews: 389,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=400',
    gallery: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    ],
    itinerary: [
      { day: 1, title: 'Glade Wharf to Glade House', description: 'Walk to first camp' },
      { day: 2, title: 'Glade House to Pompolona Lodge', description: 'Through MacKinnon Pass' },
      { day: 3, title: 'Pompolona to Quintin Lodge', description: 'Fiord views begin' },
      { day: 4, title: 'Quintin Lodge to Milford Sound', description: 'Finish at iconic location' },
    ],
    bestTime: ['November', 'December', 'January', 'February', 'March', 'April'],
    temperature: { min: 10, max: 18 },
    weatherInfo: 'Rainy region, expect wet conditions and limited visibility',
    safetyTips: [
      'Bookings essential well in advance',
      'Waterproof gear mandatory',
      'Stream crossings can be difficult',
    ],
    packingList: [
      'Quality rain jacket',
      'Waterproof pack cover',
      'Insect repellent',
      'Sturdy hiking boots',
    ],
    accessibility: 'Medium - Moderate fitness level required',
  },
];

// Default export for compatibility with imports that expect a default
export default treks;

/**
 * Get a trek by ID
 * @param {number} id - The trek ID
 * @returns {Object} The trek object or null
 */
export const getTrekById = (id) => {
  return treks.find((trek) => trek.id === parseInt(id));
};

/**
 * Get all unique regions
 * @returns {Array} Array of region names
 */
export const getRegions = () => {
  return [...new Set(treks.map((trek) => trek.region))].sort();
};

/**
 * Get all unique difficulty levels
 * @returns {Array} Array of difficulty levels
 */
export const getDifficulties = () => {
  return [...new Set(treks.map((trek) => trek.difficulty))];
};

/**
 * Get treks by region
 * @param {string} region - The region name
 * @returns {Array} Array of treks in that region
 */
export const getTreksByRegion = (region) => {
  return treks.filter((trek) => trek.region === region);
};

/**
 * Get treks by difficulty
 * @param {string} difficulty - The difficulty level
 * @returns {Array} Array of treks with that difficulty
 */
export const getTreksByDifficulty = (difficulty) => {
  return treks.filter((trek) => trek.difficulty === difficulty);
};
