import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import treks from '../../data/treks';
import { formatItinerary, getTotalAltitudeGain } from '../../utils/itineraryFormatter';

import WeatherConditions from '../../components/WeatherConditions/WeatherConditions';
import LocationPrompt from '../../components/LocationPrompt/LocationPrompt';
import AIChatAssistant from '../../components/AIChatAssistant/AIChatAssistant';
import ChatGPTService from '../../api/chatgptService';
import GeminiService from '../../api/geminiService';
import { useAppContext } from '../../context/useAppContext';
import './TrekDetails.css';

function TrekDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const trek = treks.find((t) => String(t.id) === String(id));

  if (!trek) {
    return (
      <div className="trek-details not-found">
        <h2>Trek not found</h2>
        <p>We couldn't find that trek. It may have been removed.</p>
        <button onClick={() => navigate('/')}>Back to Home</button>
      </div>
    );
  }

  const itineraryText = formatItinerary(trek.itinerary);
  const altitudeGain = getTotalAltitudeGain(trek.itinerary);
  const { location, requestLocation } = useAppContext();
  const [guidance, setGuidance] = React.useState(null);
  const [guidanceLoading, setGuidanceLoading] = React.useState(false);
  const [guidanceError, setGuidanceError] = React.useState(null);
  const [assistantOpen, setAssistantOpen] = React.useState(false);
  const [weatherData, setWeatherData] = React.useState(null);
  const [routeConditions, setRouteConditions] = React.useState(null);
  const aiGuidanceRef = React.useRef(null);

  return (
    <div className="trek-details container">
      <header className="trek-hero">
        <img src={trek.image} alt={trek.name} onError={(e) => (e.target.src = '/public/assets/icons/placeholder.png')} />
        <div className="trek-hero-info">
          <h1>{trek.name}</h1>
          <p className="meta">{trek.region} • {trek.duration} days • {trek.difficulty}</p>
        </div>
      </header>

      <main className="trek-main">
        <section className="trek-overview">
          <h3>Overview</h3>
          <p>{trek.description}</p>

          <div className="stats">
            <div><strong>Altitude</strong><span>{trek.altitude} m</span></div>
            <div><strong>Estimated Gain</strong><span>{altitudeGain} m</span></div>
            <div><strong>Best Season</strong><span>{trek.bestSeason}</span></div>
            <div><strong>Cost</strong><span>${trek.cost}</span></div>
          </div>
        </section>

        <section className="trek-itinerary">
          <h3>Itinerary</h3>
          <pre className="itinerary-text">{itineraryText}</pre>
        </section>

        <aside className="trek-sidebar">
          <LocationPrompt compact />
          <WeatherConditions location={trek.region} />
          
          {/* AI Guidance block will be inserted here by the new feature below */}
          <div className="booking">
            <h4>Ready to book?</h4>
            <button className="cta">Contact us</button>
          </div>
          <div className="ai-guidance">
            <h4>AI Guidance</h4>
            {!guidance && (
              <p id="ai-guidance-desc">Get a tailored guidance report for this trek based on current conditions and your location.</p>
            )}
            {guidance && (
              <div className="ai-guidance__content" id="ai-guidance-content" role="region" aria-live="polite">
                  <pre ref={aiGuidanceRef} tabIndex={-1} className="ai-guidance__text">{guidance}</pre>
                </div>
            )}
            {guidanceError && <p className="ai-guidance__error">{guidanceError}</p>}
            <div className="ai-guidance__actions">
              <button id="get-guidance-btn" type="button" className="btn btn--primary" aria-controls="ai-guidance-content" aria-busy={guidanceLoading} onClick={async () => {
                setGuidanceLoading(true);
                setGuidanceError(null);
                try {
                  // Ensure user location is set; if not, request permission
                  let currentLocation = location;
                  if (!currentLocation) {
                    try {
                      currentLocation = await requestLocation();
                    } catch (locErr) {
                      setGuidanceError('Please set your location to get tailored guidance.');
                      setGuidanceLoading(false);
                      return;
                    }
                  }

                  // Fetch comprehensive data from both AI services
                  const [conditions, weather, safetyAlerts, packingList, altitudeAdvice] = await Promise.all([
                    GeminiService.getRouteConditions(trek),
                    GeminiService.getWeatherForecast(trek),
                    GeminiService.getSafetyAlerts(trek),
                    ChatGPTService.generatePackingList({
                      trekId: trek.id,
                      name: trek.name,
                      altitude: trek.altitude,
                      difficulty: trek.difficulty,
                      duration: trek.duration,
                      region: trek.region,
                      bestSeason: trek.bestSeason
                    }),
                    ChatGPTService.getAltitudeAdvice(trek.altitude, 'mountain')
                  ]);

                  // Store data for assistant use
                  setWeatherData(weather);
                  setRouteConditions(conditions);

                  // Create comprehensive guidance prompt
                  const prompt = `You are an expert trekking guide. Provide comprehensive guidance for the trek "${trek.name}" in ${trek.region}.

TREK DETAILS:
- Name: ${trek.name}
- Region: ${trek.region}
- Altitude: ${trek.altitude}m
- Duration: ${trek.duration} days
- Difficulty: ${trek.difficulty}
- Best Season: ${trek.bestSeason}
- Description: ${trek.description}

CURRENT CONDITIONS (Gemini AI):
${JSON.stringify(conditions, null, 2)}

WEATHER FORECAST (Gemini AI):
${JSON.stringify(weather, null, 2)}

SAFETY ALERTS (Gemini AI):
${JSON.stringify(safetyAlerts, null, 2)}

PACKING RECOMMENDATIONS (ChatGPT):
${JSON.stringify(packingList, null, 2)}

ALTITUDE ADVICE (ChatGPT):
${JSON.stringify(altitudeAdvice, null, 2)}

USER LOCATION: ${currentLocation ? (currentLocation.name || `${currentLocation.lat},${currentLocation.lng}`) : 'Not provided'}

Provide a comprehensive, well-structured guidance report covering:
1. Current Conditions Summary
2. Weather Outlook & Timing Recommendations
3. Safety Considerations & Alerts
4. Essential Packing List
5. Altitude Acclimatization Plan
6. Route-Specific Tips

Keep it practical and actionable.`;

                  const init = await ChatGPTService.initializeChat();
                  const sessionId = init?.sessionId;
                  const res = await ChatGPTService.sendMessage(prompt, sessionId);
                  const content = res?.text || res?.message || (typeof res === 'string' ? res : JSON.stringify(res));
                  setGuidance(content);
                  setTimeout(() => aiGuidanceRef.current?.focus(), 100);
                } catch (err) {
                  console.error('Guidance error', err);
                  setGuidanceError('Unable to fetch comprehensive guidance. Please try again.');
                } finally {
                  setGuidanceLoading(false);
                }
              }} disabled={guidanceLoading}>
                {guidanceLoading ? 'Fetching AI Guidance…' : 'Get AI Guidance'}
              </button>
              {guidance && (
                <>
                  <button type="button" className="btn" onClick={() => { setGuidance(null); setTimeout(() => document.getElementById('get-guidance-btn')?.focus(), 50); }}>Clear</button>
                  <button type="button" className="btn" onClick={() => setAssistantOpen(true)}>Open in Assistant</button>
                </>
              )}
            </div>
            {assistantOpen && (
              <div className="ai-guidance__assistant">
                <AIChatAssistant 
                  initialMessage={guidance} 
                  trek={trek} 
                  location={location}
                  quickActions={[
                    { label: 'Weather Update', icon: '🌤️', value: 'Get current weather conditions' },
                    { label: 'Safety Check', icon: '⚠️', value: 'Check current safety alerts' },
                    { label: 'Packing List', icon: '🎒', value: 'Generate detailed packing list' },
                    { label: 'Route Tips', icon: '🗺️', value: 'Get route-specific tips and advice' }
                  ]}
                />
              </div>
            )}
          </div>
        </aside>
      </main>
    </div>
  );
}

export default TrekDetails;
