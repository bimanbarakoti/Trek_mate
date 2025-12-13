// router.js
// Centralized route definitions (not strictly necessary since App.jsx defines routes,
// but useful for exporting route metadata or reusing route paths across components.)

const ROUTES = {
  HOME: '/',
  TREK_DETAILS: '/treks/:id',
  CONTACT: '/contact',
  ABOUT: '/about',
  NOT_FOUND: '*',
};

export default ROUTES;
