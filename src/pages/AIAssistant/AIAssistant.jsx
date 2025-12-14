import React from 'react';
import AIChatAssistant from '../../components/AIChatAssistant/AIChatAssistant';
import LocationPrompt from '../../components/LocationPrompt/LocationPrompt';
import ApiStatus from '../../components/UI/ApiStatus';
import { useAppContext } from '../../context/useAppContext';
import './AIAssistant.css';

function AIAssistant() {
  const { location } = useAppContext();

  return (
    <div className="ai-assistant-page">
      <div className="ai-header">
        <div className="container">
          <h1>🤖 AI Trek Assistant</h1>
          <p>Get personalized trekking advice, recommendations, and real-time guidance</p>
        </div>
      </div>

      <div className="container ai-content">
        <ApiStatus />
        <div className="ai-sidebar">
          <LocationPrompt />
          
          <div className="ai-features">
            <h3>What I can help with:</h3>
            <ul>
              <li>🏔️ Trek recommendations based on your location</li>
              <li>🌤️ Real-time weather and conditions</li>
              <li>🎒 Personalized packing lists</li>
              <li>⚠️ Safety alerts and tips</li>
              <li>🗺️ Route planning and guidance</li>
              <li>🏥 Altitude acclimatization advice</li>
            </ul>
          </div>

          <div className="ai-providers">
            <h4>Powered by:</h4>
            <div className="provider-badges">
              <span className="badge">ChatGPT</span>
              <span className="badge">Gemini AI</span>
            </div>
          </div>
        </div>

        <div className="ai-chat-container">
          <AIChatAssistant 
            location={location}
            quickActions={[
              { label: 'Find treks near me', icon: '📍', value: 'Find treks near my location' },
              { label: 'Weather forecast', icon: '🌤️', value: 'Get weather forecast for my area' },
              { label: 'Packing checklist', icon: '🎒', value: 'Create a packing checklist for trekking' },
              { label: 'Safety tips', icon: '⚠️', value: 'Give me important trekking safety tips' },
              { label: 'Beginner advice', icon: '👶', value: 'I\'m new to trekking, what should I know?' },
              { label: 'High altitude tips', icon: '🏔️', value: 'How do I prepare for high altitude trekking?' }
            ]}
          />
        </div>
      </div>
    </div>
  );
}

export default AIAssistant;