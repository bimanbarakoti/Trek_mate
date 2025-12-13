import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import useScrollReveal from '../../hooks/useScrollReveal';
import Loader from '../UI/Loader';
import { useAppContext } from '../../context/useAppContext';
import './LocationPrompt.css';

const LocationPrompt = ({ compact }) => {
  const revealRef = useScrollReveal({ threshold: 0.06 });
  const { location, setLocation, requestLocation, clearLocation } = useAppContext();
  const clearBtnRef = useRef(null);
  const manualInputRef = useRef(null);
  const statusRef = useRef(null);
  const [manual, setManual] = useState(false);
  const [manualValue, setManualValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleUseLocation = async () => {
    setError(null);
    setLoading(true);
    try {
      const loc = await requestLocation();
      setLocation(loc);
    } catch (err) {
      setError(err?.message || 'Unable to get location');
    } finally {
      setLoading(false);
    }
  };

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (!manualValue.trim()) {
      setError('Please enter a city or coordinates');
      return;
    }

    // Accept either lat,lng or a city name
    const coordsMatch = manualValue.trim().match(/-?\d+(?:\.\d+)?\s*,\s*-?\d+(?:\.\d+)?/);

    if (coordsMatch) {
      const [lat, lng] = coordsMatch[0].split(',').map((s) => parseFloat(s.trim()));
      setLocation({ lat, lng, name: `Lat:${lat.toFixed(3)},Lng:${lng.toFixed(3)}` });
      setManual(false);
      setError(null);
      // focus the clear button so users can clear or change location
      setTimeout(() => clearBtnRef.current?.focus(), 50);
      return;
    }

    // If city name, store as name only; services can try to resolve later
    setLocation({ name: manualValue.trim() });
    setManual(false);
    setError(null);
  };

  useEffect(() => {
    if (manual) {
      setTimeout(() => manualInputRef.current?.focus(), 50);
    }
    // Announce manual open state
  }, [manual]);

  useEffect(() => {
    if (location) {
      // Announce saved location via visually hidden status
      if (statusRef.current) {
        statusRef.current.textContent = `Location set to ${location.name || `${location.lat}, ${location.lng}`}`;
      }
      // Focus clear button for quick accessibility
      setTimeout(() => clearBtnRef.current?.focus(), 50);
    }
  }, [location]);

  return (
    <div ref={revealRef} data-reveal className={`location-prompt ${compact ? 'location-prompt--compact' : ''}`} role="region" aria-label="User location prompt">
      <div className="visually-hidden" aria-live="polite" ref={statusRef}></div>
      <div className="location-prompt__header">
        <strong className="location-prompt__title">Your Location</strong>
        {location && (
          <button
            ref={clearBtnRef}
            className="location-prompt__clear"
            aria-label="Clear location"
            type="button"
            onClick={() => clearLocation()}
          >
            Clear
          </button>
        )}
      </div>

      {!location ? (
        <div className="location-prompt__controls">
          <p className="location-prompt__text">Enable location for personalized recommendations or enter it manually.</p>

          <div className="location-prompt__actions">
            <button
              type="button"
              className="btn btn--primary"
              onClick={handleUseLocation}
              disabled={loading}
              aria-label="Allow browser to use your location"
              aria-busy={loading}
            >
              {loading ? (
                <>
                  <Loader size="sm" /> <span className="visually-hidden">Locating</span>
                </>
              ) : 'Use my location'}
            </button>

            <button
              type="button"
              className="btn"
              onClick={() => setManual(true)}
              aria-label="Enter location manually"
              aria-expanded={manual}
            >
              Enter manually
            </button>
          </div>

            {manual && (
            <form className="location-prompt__manual" onSubmit={handleManualSubmit}>
              <label className="visually-hidden" htmlFor="manual-location-input">Manual location</label>
              <input
                type="text"
                className="location-prompt__input"
                id="manual-location-input"
                placeholder="City or lat,lng (e.g., Kathmandu or 27.7172,85.3240)"
                value={manualValue}
                onChange={(e) => setManualValue(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Escape') { setManual(false); setManualValue(''); } }}
                aria-label="Manual location input"
                ref={manualInputRef}
              />
              <div className="location-prompt__manual-actions">
                <button className="btn btn--primary" type="submit">Save</button>
                <button className="btn" type="button" onClick={() => { setManual(false); setManualValue(''); }}>Cancel</button>
              </div>
            </form>
          )}

          {error && <div className="location-prompt__error" role="alert">{error}</div>}
        </div>
      ) : (
        <div className="location-prompt__current">
          <p className="location-prompt__current-label">Current Location</p>
          <p className="location-prompt__current-value">{location.name ? location.name : `${location.lat.toFixed(3)}, ${location.lng.toFixed(3)}`}</p>
        </div>
      )}
    </div>
  );
};

LocationPrompt.propTypes = {
  compact: PropTypes.bool,
};

LocationPrompt.defaultProps = {
  compact: false,
};

export default LocationPrompt;
