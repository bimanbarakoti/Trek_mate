import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Footer.css';

/**
 * Footer Component
 * Displays footer with links sections, newsletter signup, social media links, and copyright info
 * Responsive design with collapsible sections on mobile
 */
import useScrollReveal from '../../hooks/useScrollReveal';

const Footer = ({
  currentYear,
  companyName,
  onNewsletterSubmit
}) => {
  const revealRef = useScrollReveal({ threshold: 0.08 });
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  /**
   * Validate email format
   */
  const validateEmail = (emailValue) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailValue);
  };

  /**
   * Handle newsletter subscription
   */
  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);

    try {
      if (onNewsletterSubmit) {
        await onNewsletterSubmit(email);
      }
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    } catch (err) {
      setError(err.message || 'Failed to subscribe. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer ref={revealRef} data-reveal data-reveal-animation="fade-in-up" className="footer">
      {/* Main Footer Content */}
      <div className="footer__container">
        
        {/* Footer Sections */}
        <div className="footer__columns">
          
          {/* About Section */}
          <div className="footer__column">
            <h4 className="footer__column-title">About TrekMate</h4>
            <p className="footer__column-description">
              Discover the world's most beautiful treks. Plan, explore, and conquer mountains with TrekMate.
            </p>
            
            
          </div>

          {/* Treks Section */}
          <div className="footer__column">
            <h4 className="footer__column-title">Explore</h4>
            <ul className="footer__links">
              <li><a href="#popular-treks" className="footer__link">Popular Treks</a></li>
              <li><a href="#new-treks" className="footer__link">New Routes</a></li>
              <li><a href="#beginner-friendly" className="footer__link">Beginner Friendly</a></li>
              <li><a href="#challenging" className="footer__link">Challenging Peaks</a></li>
              <li><a href="#international" className="footer__link">International</a></li>
            </ul>
          </div>

          {/* About Section */}
          <div className="footer__column">
            <h4 className="footer__column-title">Company</h4>
            <ul className="footer__links">
              <li><a href="#about" className="footer__link">About Us</a></li>
              <li><a href="#blog" className="footer__link">Blog</a></li>
              <li><a href="#careers" className="footer__link">Careers</a></li>
              <li><a href="#press" className="footer__link">Press</a></li>
              <li><a href="#contact" className="footer__link">Contact Us</a></li>
            </ul>
          </div>

          {/* Legal Section */}
          <div className="footer__column">
            <h4 className="footer__column-title">Legal</h4>
            <ul className="footer__links">
              <li><a href="#privacy" className="footer__link">Privacy Policy</a></li>
              <li><a href="#terms" className="footer__link">Terms of Service</a></li>
              <li><a href="#cookies" className="footer__link">Cookie Policy</a></li>
              <li><a href="#disclaimer" className="footer__link">Disclaimer</a></li>
              <li><a href="#accessibility" className="footer__link">Accessibility</a></li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="footer__column">
            <h4 className="footer__column-title">Newsletter</h4>
            <p className="footer__column-description">
              Get the latest trek updates and travel tips delivered to your inbox.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="footer__newsletter-form">
              <div className="footer__newsletter-input-group">
                <input
                  type="email"
                  className="footer__newsletter-input"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
                <button
                  type="submit"
                  className="footer__newsletter-button"
                  disabled={loading}
                >
                  {loading ? 'Subscribing...' : 'Subscribe'}
                </button>
              </div>
              {error && (
                <p className="footer__newsletter-error">{error}</p>
              )}
              {subscribed && (
                <p className="footer__newsletter-success">
                  ✓ Thank you for subscribing!
                </p>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="footer__bottom">
        <div className="footer__bottom-content">
          <div className="footer__bottom-left">
            <p className="footer__copyright">
              © {currentYear} {companyName}. All rights reserved.
            </p>
            <p className="footer__made-with">
              Made with ❤️ for adventure seekers
            </p>
          </div>

          <div className="footer__bottom-right">
            <div className="footer__social-links footer__social-links--small">
              <a href="#facebook" className="footer__social-link" title="Facebook" aria-label="Facebook">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="#twitter" className="footer__social-link" title="Twitter" aria-label="Twitter">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.953 4.57a10 10 0 002.856-10.02 10 10 0 01-2.856 2.856c-1.668-.892-3.636-1.41-5.744-1.41-4.971 0-9 4.029-9 9s4.029 9 9 9c1.1 0 2.157-.164 3.165-.503.866.933 1.954 1.742 3.223 2.341.216.091.44.16.66.193-.32 1.028-.81 2.01-1.46 2.91-1.03.816-2.2 1.426-3.456 1.802a9.99 9.99 0 01-2.634.344c-5.523 0-10-4.477-10-10s4.477-10 10-10 10 4.477 10 10c0 .464-.04.923-.117 1.377-1.086.906-2.436 1.595-3.94 1.958-1.504.363-3.08.389-4.6.088-1.52-.301-2.944-.994-4.14-2.019z"/></svg>
              </a>
              <a href="#instagram" className="footer__social-link" title="Instagram" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" fill="none" stroke="currentColor" strokeWidth="2"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor"/></svg>
              </a>
              <a href="#linkedin" className="footer__social-link" title="LinkedIn" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

Footer.propTypes = {
  currentYear: PropTypes.number,
  companyName: PropTypes.string,
  onNewsletterSubmit: PropTypes.func
};

Footer.defaultProps = {
  currentYear: new Date().getFullYear(),
  companyName: 'TrekMate',
  onNewsletterSubmit: null
};

export default Footer;
