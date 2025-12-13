import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import './WeatherConditions.css';
import { useAppContext } from '../../context/useAppContext';
import Loader from '../UI/Loader';
import useScrollReveal from '../../hooks/useScrollReveal';

/**
 * WeatherConditions Component
 * Displays current weather conditions and forecast for a specific location
 * Features include temperature, humidity, wind speed, and weather icons
 */
const WeatherConditions = ({
  location,
  onFetch,
  autoFetch
}) => {
  const { location: ctxLocation } = useAppContext();
  const effectiveLocation = location || (ctxLocation && (ctxLocation.name || `${ctxLocation.lat},${ctxLocation.lng}`)) || null;
  const revealRef = useScrollReveal({ threshold: 0.12 });
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [forecast, setForecast] = useState([]);

  /**
   * Fetch weather data
   */
  const fetchWeather = useCallback(async () => {
    if (!effectiveLocation) {
      setError('Location not provided');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Call parent's onFetch prop if provided
      if (onFetch) {
        const result = await onFetch(effectiveLocation);
        setWeather(result.current);
        setForecast(result.forecast || []);
      } else {
        // Fallback: set mock weather data for demonstration
          setWeather({
          temperature: 28,
            condition: 'Sunny',
          humidity: 60,
          windSpeed: 12,
          icon: '☀️',
            location: effectiveLocation
        });
        setForecast([
          { day: 'Tomorrow', temp: 25, condition: 'Cloudy', icon: '⛅' },
          { day: 'Day 3', temp: 20, condition: 'Rainy', icon: '🌧️' },
          { day: 'Day 4', temp: 22, condition: 'Partly Cloudy', icon: '🌤️' }
        ]);
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch weather data');
      console.error('Weather fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [location, onFetch]);

  /**
   * Auto-fetch weather on component mount or location change
   */
  useEffect(() => {
    if (autoFetch && effectiveLocation) {
      fetchWeather();
    }
  }, [effectiveLocation, autoFetch, fetchWeather]);

  /**
   * Get weather description based on condition
   */
  const getWeatherIcon = (condition) => {
    const conditionLower = condition?.toLowerCase() || '';
    
    if (conditionLower.includes('sunny')) return '☀️';
    if (conditionLower.includes('cloudy')) return '☁️';
    if (conditionLower.includes('rainy') || conditionLower.includes('rain')) return '🌧️';
    if (conditionLower.includes('snow')) return '❄️';
    if (conditionLower.includes('windy')) return '💨';
    if (conditionLower.includes('foggy')) return '🌫️';
    return '🌤️';
  };

  /**
   * Determine clothing recommendation based on temperature
   */
  const getClothingRecommendation = (temp) => {
    if (temp > 25) return 'Light, breathable clothing';
    if (temp > 15) return 'Light jacket or sweater';
    if (temp > 5) return 'Warm jacket and layers';
    return 'Heavy winter gear required';
  };

  /**
   * Check if weather is favorable for trekking
   */
  const isFavorableForTrekking = () => {
    if (!weather) return null;
    
    const isSunny = !weather.condition?.toLowerCase().includes('rain');
    const isComfortableTemp = weather.temperature >= 10 && weather.temperature <= 30;
    const isNotWindy = weather.windSpeed < 30;
    
    return isSunny && isComfortableTemp && isNotWindy;
  };

  return (
    <div ref={revealRef} data-reveal data-reveal-animation="fade-in-left" className="weather-conditions" aria-live="polite">
      {/* Header */}
      <div className="weather-conditions__header">
        <h3 className="weather-conditions__title">Weather Forecast</h3>
        {effectiveLocation && (
            <p className="weather-conditions__location">{effectiveLocation.name ? effectiveLocation.name : effectiveLocation}</p>
          )}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="weather-conditions__loader">
          <Loader size="sm" />
          <p>Loading weather data...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="weather-conditions__error">
          <p className="weather-conditions__error-message">
            <svg className="weather-conditions__error-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
            </svg>
            {error}
          </p>
          <button 
            className="weather-conditions__retry-btn"
            onClick={fetchWeather}
          >
            Retry
          </button>
        </div>
      )}

      {/* Weather Content */}
      {weather && !loading && !error && (
        <div className="weather-conditions__content">
          
          {/* Current Weather */}
          <div className="weather-conditions__current">
            <div className="weather-conditions__current-main">
              <div className="weather-conditions__temperature-container">
                <span className="weather-conditions__icon">
                  {weather.icon || getWeatherIcon(weather.condition)}
                </span>
                <div className="weather-conditions__temperature">
                  <span className="weather-conditions__temp-value">
                    {Math.round(weather.temperature)}°C
                  </span>
                  <p className="weather-conditions__condition">
                    {weather.condition}
                  </p>
                </div>
              </div>

              {/* Trekking Favorability */}
              <div className={`weather-conditions__favorability ${
                isFavorableForTrekking() ? 'weather-conditions__favorability--good' : 'weather-conditions__favorability--poor'
              }`}>
                <p className="weather-conditions__favorability-text">
                  {isFavorableForTrekking() 
                    ? '✓ Good for trekking' 
                    : '⚠ Consider conditions'}
                </p>
              </div>
            </div>

            {/* Detailed Metrics */}
            <div className="weather-conditions__metrics">
              <div className="weather-conditions__metric">
                <span className="weather-conditions__metric-icon">💧</span>
                <div className="weather-conditions__metric-info">
                  <p className="weather-conditions__metric-label">Humidity</p>
                  <p className="weather-conditions__metric-value">
                    {weather.humidity}%
                  </p>
                </div>
              </div>

              <div className="weather-conditions__metric">
                <span className="weather-conditions__metric-icon">💨</span>
                <div className="weather-conditions__metric-info">
                  <p className="weather-conditions__metric-label">Wind Speed</p>
                  <p className="weather-conditions__metric-value">
                    {weather.windSpeed} km/h
                  </p>
                </div>
              </div>

              <div className="weather-conditions__metric">
                <span className="weather-conditions__metric-icon">👕</span>
                <div className="weather-conditions__metric-info">
                  <p className="weather-conditions__metric-label">Wear</p>
                  <p className="weather-conditions__metric-value">
                    {getClothingRecommendation(weather.temperature)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Forecast */}
          {forecast.length > 0 && (
            <div className="weather-conditions__forecast">
              <h4 className="weather-conditions__forecast-title">5-Day Forecast</h4>
              <div className="weather-conditions__forecast-items">
                {forecast.slice(0, 5).map((day, index) => (
                  <div key={index} className="weather-conditions__forecast-item">
                    <p className="weather-conditions__forecast-day">
                      {day.day || `Day ${index + 1}`}
                    </p>
                    <span className="weather-conditions__forecast-icon">
                      {day.icon || getWeatherIcon(day.condition)}
                    </span>
                    <p className="weather-conditions__forecast-temp">
                      {Math.round(day.temp)}°C
                    </p>
                    <p className="weather-conditions__forecast-condition">
                      {day.condition}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Empty State */}
      {!weather && !loading && !error && (
        <div className="weather-conditions__empty">
          <p className="weather-conditions__empty-message">
            No weather data available. {autoFetch ? 'Loading...' : 'Click to fetch weather.'}
          </p>
          {!autoFetch && (
            <button 
              className="weather-conditions__fetch-btn"
              onClick={fetchWeather}
            >
              Fetch Weather
            </button>
          )}
        </div>
      )}
    </div>
  );
};

WeatherConditions.propTypes = {
  // `location` may be a string (region) or an object { lat, lng, name }
  location: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onFetch: PropTypes.func,
  autoFetch: PropTypes.bool
};

WeatherConditions.defaultProps = {
  location: '',
  onFetch: null,
  autoFetch: true
};

export default WeatherConditions;
