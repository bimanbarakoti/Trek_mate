import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useAppContext } from '../../context/useAppContext';
import LocationService from '../../api/locationService';
import TrekCard from '../TrekCard/TrekCard';
import Loader from '../UI/Loader';
import './LocationBasedTreks.css';

const LocationBasedTreks = ({ maxResults = 6 }) => {
  const { location } = useAppContext();
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (location) {
      fetchLocationBasedTreks();
    }
  }, [location]);

  const fetchLocationBasedTreks = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await LocationService.getLocationBasedTreks(location, {
        maxDistance: 500 // 500km radius
      });
      
      setRecommendations(result);
    } catch (err) {
      setError('Failed to fetch location-based recommendations');
      console.error('Location-based treks error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!location) {
    return (
      <div className="location-based-treks">
        <div className="location-based-treks__prompt">
          <h3>Discover Nearby Treks</h3>
          <p>Enable location access to see personalized trek recommendations near you.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="location-based-treks">
        <div className="location-based-treks__loading">
          <Loader />
          <p>Finding treks near you...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="location-based-treks">
        <div className="location-based-treks__error">
          <p>{error}</p>
          <button onClick={fetchLocationBasedTreks} className="btn btn--primary">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const treksToShow = recommendations?.localTreks?.slice(0, maxResults) || [];

  return (
    <div className="location-based-treks">
      <div className="location-based-treks__header">
        <h3>Treks Near You</h3>
        <p className="location-based-treks__location">
          📍 {location.name || `${location.lat?.toFixed(2)}, ${location.lng?.toFixed(2)}`}
        </p>
      </div>

      {treksToShow.length > 0 ? (
        <div className="location-based-treks__grid">
          {treksToShow.map((trek) => (
            <div key={trek.id} className="location-based-trek-item">
              <TrekCard {...trek} />
              {trek.distance && (
                <div className="trek-distance">
                  📍 ~{Math.round(trek.distance)}km away
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="location-based-treks__empty">
          <p>No treks found near your location. Try expanding your search area.</p>
        </div>
      )}

      {recommendations?.isMockData && (
        <div className="location-based-treks__mock-notice">
          <small>* Using demo data. Configure Gemini API for real-time recommendations.</small>
        </div>
      )}
    </div>
  );
};

LocationBasedTreks.propTypes = {
  maxResults: PropTypes.number
};

export default LocationBasedTreks;