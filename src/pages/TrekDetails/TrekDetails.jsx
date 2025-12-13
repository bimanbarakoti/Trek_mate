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
                  if (!location) {
                    try {
                      await requestLocation();
                    } catch (locErr) {
                      setGuidanceError('Please set your location to get tailored guidance.');
                      setGuidanceLoading(false);
                      return;
                    }
                  }
                  // Fetch current route conditions and weather
                  const [conditions, weather] = await Promise.all([
                    GeminiService.getRouteConditions(trek),
                    GeminiService.getWeatherForecast(trek),
                  ]);

                  const prompt = `You are an expert trekking guide. The user wants guidance for the trek "${trek.name}" in region ${trek.region}.\n\nTrek summary: ${trek.description}\n\nConditions: ${JSON.stringify(conditions)}\n\nWeather: ${JSON.stringify(weather)}\n\nUser location: ${location ? (location.name || `${location.lat},${location.lng}`) : 'Not provided'}. Provide a concise guidance including safety tips, estimated best start time, acclimatization notes, and a concise packing checklist.`;

                  const init = await ChatGPTService.initializeChat();
                  const sessionId = init?.sessionId;
                  const res = await ChatGPTService.sendMessage(prompt, sessionId);
                  const content = res?.text || res?.message || (typeof res === 'string' ? res : JSON.stringify(res));
                  setGuidance(content);
                  setTimeout(() => aiGuidanceRef.current?.focus(), 100);
                } catch (err) {
                  console.error('Guidance error', err);
                  setGuidanceError('Unable to fetch guidance. Please try again.');
                } finally {
                  setGuidanceLoading(false);
                }
              }} disabled={guidanceLoading}>
                {guidanceLoading ? 'Fetching guidance…' : 'Get Guidance'}
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
                <AIChatAssistant initialMessage={guidance} trek={trek} location={location} />
              </div>
            )}
          </div>
        </aside>
      </main>
    </div>
  );
}

export default TrekDetails;
