import React, { useEffect, useState, useCallback } from 'react';
import { AppContext } from './context';

function AppProvider({ children }) {
  const [preferences, setPreferences] = useState(() => {
    try {
      const raw = localStorage.getItem('tm:preferences');
      return raw ? JSON.parse(raw) : { theme: 'light', units: 'metric', locale: 'en', aiProvider: 'chatgpt' };
    } catch (err) {
      console.error('[AppContext] Error reading preferences:', err);
      return { theme: 'light', units: 'metric', locale: 'en', aiProvider: 'chatgpt' };
    }
  });

  // Location: { lat, lng, name }
  const [location, setLocation] = useState(() => {
    try {
      const raw = localStorage.getItem('tm:location');
      return raw ? JSON.parse(raw) : null;
    } catch (err) {
      console.error('[AppContext] Error reading location:', err);
      return null;
    }
  });

  useEffect(() => {
    try {
      if (location) {
        localStorage.setItem('tm:location', JSON.stringify(location));
      } else {
        localStorage.removeItem('tm:location');
      }
    } catch (err) {
      console.error('[AppContext] Error saving location:', err);
    }
  }, [location]);

  const clearLocation = useCallback(() => {
    setLocation(null);
  }, []);

  const requestLocation = useCallback(() => {
    return new Promise((resolve, reject) => {
      if (!navigator?.geolocation) {
        const err = new Error('Geolocation API not available');
        setLocation(null);
        reject(err);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const newLoc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
          setLocation(newLoc);
          resolve(newLoc);
        },
        (err) => {
          console.warn('[AppContext] Geolocation error:', err);
          reject(err);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 60 * 1000 }
      );
    });
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('tm:preferences', JSON.stringify(preferences));
      document.documentElement.setAttribute('data-theme', preferences.theme);
    } catch (err) {
      console.error('[AppContext] Error saving preferences:', err);
    }
  }, [preferences]);

  const value = { preferences, setPreferences, location, setLocation, clearLocation, requestLocation };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export { AppProvider };
export default AppProvider;
