import React from 'react';
import './About.css';

function About() {
  return (
    <div className="about-page">
      <div className="about-hero">
        <div className="container">
          <h1>About TrekMate</h1>
          <p>Your AI-powered companion for planning unforgettable treks around the world</p>
        </div>
      </div>

      <div className="container about-content">
        <section className="mission">
          <h2>🎯 Our Mission</h2>
          <p>We help adventurers discover and plan the perfect trek based on their skill level, available time, budget, and location. Using cutting-edge AI technology, we provide personalized recommendations and real-time guidance.</p>
        </section>

        <section className="features">
          <h2>✨ What We Offer</h2>
          <div className="features-grid">
            <div className="feature">
              <h3>🤖 AI-Powered Recommendations</h3>
              <p>Get personalized trek suggestions based on your location, preferences, and experience level.</p>
            </div>
            <div className="feature">
              <h3>🌤️ Real-Time Weather & Conditions</h3>
              <p>Stay updated with current weather forecasts and trail conditions powered by Gemini AI.</p>
            </div>
            <div className="feature">
              <h3>🎒 Smart Packing Lists</h3>
              <p>Receive customized packing recommendations based on your specific trek and conditions.</p>
            </div>
            <div className="feature">
              <h3>📍 Location-Based Discovery</h3>
              <p>Find amazing treks near you or explore destinations worldwide with distance calculations.</p>
            </div>
          </div>
        </section>

        <section className="technology">
          <h2>🚀 Powered by Advanced AI</h2>
          <div className="tech-stack">
            <div className="tech-item">
              <h4>ChatGPT Integration</h4>
              <p>Provides expert trekking advice, safety tips, and personalized guidance.</p>
            </div>
            <div className="tech-item">
              <h4>Gemini AI</h4>
              <p>Delivers real-time weather data, route conditions, and location-based recommendations.</p>
            </div>
          </div>
        </section>

        <section className="team">
          <h2>👥 Meet the Team</h2>
          <div className="team-grid">
            <div className="member">
              <div className="member-avatar">👩‍💼</div>
              <h3>Alice Johnson</h3>
              <p>Founder & Lead Guide</p>
              <span>15+ years trekking experience</span>
            </div>
            <div className="member">
              <div className="member-avatar">👨‍💻</div>
              <h3>Bob Chen</h3>
              <p>AI Product Manager</p>
              <span>Expert in AI integration</span>
            </div>
            <div className="member">
              <div className="member-avatar">👩‍💻</div>
              <h3>Charlie Smith</h3>
              <p>Lead Engineer</p>
              <span>Full-stack development</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default About;
