/**
 * Navbar Component
 * Main navigation bar with responsive design
 */

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from '../UI/Button';
import SearchBar from '../SearchBar/SearchBar';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import useScrollReveal from '../../hooks/useScrollReveal';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const revealRef = useScrollReveal({ threshold: 0.05 });


  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/treks', label: 'Treks' },
    { path: '/ai-assistant', label: 'AI Assistant' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ];

  const isActive = (path) => location.pathname === path;
  const navigate = useNavigate();

  const handleSearchNav = (query) => {
    if (!query) return;
    // Navigate to treks page with query param
    navigate(`/treks?query=${encodeURIComponent(query)}`);
    setIsOpen(false);
  }

  return (
    <nav role="navigation" aria-label="Main Navigation" className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">⛰️</span>
          <span className="logo-text">TrekMate</span>
        </Link>

        {/* Hamburger Menu */}
        <button
          className="navbar-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
          aria-controls="navbar-menu"
        >
          <span className={`hamburger ${isOpen ? 'active' : ''}`}></span>
        </button>

        {/* Navigation Links */}
        <div id="navbar-menu" className={`navbar-menu ${isOpen ? 'active' : ''}`}>
          <div ref={revealRef} data-reveal data-reveal-animation="fade-in-down" className="navbar-links">
            {navLinks.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={`navbar-link ${isActive(path) ? 'active' : ''}`}
                onClick={() => setIsOpen(false)}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Inline Search (desktop) */}
          <div className="navbar-search">
            <SearchBar onSearch={handleSearchNav} placeholder="Search treks or regions" />
          </div>

          {/* CTA Button */}
          <div className="navbar-cta">
            <Button
              variant="primary"
              size="md"
              onClick={() => {
                navigate('/treks');
                setIsOpen(false);
              }}
            >
              Explore Treks
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
