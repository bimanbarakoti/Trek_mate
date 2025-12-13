/**
 * App.jsx
 * Main Application Component
 * Root component that sets up routing, layout, and global state
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layout
import Main from './components/Main/Main';

// Pages
import Home from './pages/Home/Home';
import TrekDetails from './pages/TrekDetails/TrekDetails';
import Contact from './pages/Contact/Contact';
import About from './pages/About/About';
import NotFound from './pages/NotFound/NotFound';

// Styles
import './styles/global.css';
import './styles/variables.css';
import './styles/animations.css';
import './App.css';

/**
 * Main App Component
 * Provides router setup, layout, and navigation structure
 */
function App() {
  return (
    <Router>
      <Main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/treks/:id" element={<TrekDetails />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Main>
    </Router>
  );
}

export default App;
