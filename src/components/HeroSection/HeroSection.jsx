import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './HeroSection.css';
import Button from '../UI/Button';
import SearchBar from '../SearchBar/SearchBar';
import useScrollReveal from '../../hooks/useScrollReveal';

/**
 * HeroSection Component
 * Large banner with background image, title, subtitle, CTA buttons, and search functionality
 * Features responsive design and overlay effects for better text readability
 */
const HeroSection = ({
  title,
  subtitle,
  backgroundImage,
  onSearchSubmit,
  onPrimaryAction,
  onSecondaryAction,
  primaryActionLabel,
  secondaryActionLabel
}) => {


  /**
   * Handle search submission
   */
  const handleSearchSubmit = (searchQuery) => {
    if (onSearchSubmit) {
      onSearchSubmit(searchQuery);
    }
  };

  /**
   * Handle primary CTA action
   */
  const handlePrimaryAction = () => {
    if (onPrimaryAction) {
      onPrimaryAction();
    }
  };

  /**
   * Handle secondary CTA action
   */
  const handleSecondaryAction = () => {
    if (onSecondaryAction) {
      onSecondaryAction();
    }
  };

  const heroRef = useRef(null);
  const revealRef = useScrollReveal({ threshold: 0.1 });

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    const handleScroll = () => {
      const y = window.scrollY;
      // Slight parallax effect
      const offset = Math.round(y * 0.2);
      el.style.backgroundPosition = `center ${offset}px`;
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      ref={heroRef}
      className="hero-section"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Overlay for better text contrast */}
      <div className="hero-section__overlay"></div>

      {/* Content Container */}
      <div ref={revealRef} data-reveal className="hero-section__content">
        {/* Title and Subtitle */}
        <div className="hero-section__text-content" data-reveal>
          <h1 className="hero-section__title" data-reveal>
            {title}
          </h1>
          {subtitle && (
            <p className="hero-section__subtitle" data-reveal>
              {subtitle}
            </p>
          )}
        </div>

        {/* Search Bar */}
        <div className="hero-section__search-container" data-reveal>
          <SearchBar 
            onSearch={handleSearchSubmit}
            placeholder="Search treks by name, region, or difficulty..."
            suggestions={[
              'Everest Base Camp', 'Kilimanjaro', 'Inca Trail', 'Annapurna Circuit',
              'Mont Blanc', 'Torres del Paine', 'GR20 Corsica', 'Milford Track',
              'Himalayas', 'Africa', 'South America', 'Europe', 'Oceania',
              'Easy', 'Medium', 'Hard'
            ]}
          />
        </div>

        {/* CTA Buttons */}
        <div className="hero-section__buttons" data-reveal>
          {primaryActionLabel && (
            <Button
              className="hero-section__primary-btn"
              onClick={handlePrimaryAction}
              variant="primary"
            >
              {primaryActionLabel}
            </Button>
          )}
          {secondaryActionLabel && (
            <Button
              className="hero-section__secondary-btn"
              onClick={handleSecondaryAction}
              variant="secondary"
            >
              {secondaryActionLabel}
            </Button>
          )}
        </div>

        {/* Scroll Indicator */}
        <div className="hero-section__scroll-indicator" aria-hidden>
          <span className="hero-section__scroll-text">Scroll to explore</span>
          <svg className="hero-section__scroll-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
};

HeroSection.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  backgroundImage: PropTypes.string.isRequired,
  onSearchSubmit: PropTypes.func,
  onPrimaryAction: PropTypes.func,
  onSecondaryAction: PropTypes.func,
  primaryActionLabel: PropTypes.string,
  secondaryActionLabel: PropTypes.string
};

HeroSection.defaultProps = {
  subtitle: '',
  onSearchSubmit: null,
  onPrimaryAction: null,
  onSecondaryAction: null,
  primaryActionLabel: 'Explore Treks',
  secondaryActionLabel: 'Learn More'
};

export default HeroSection;
