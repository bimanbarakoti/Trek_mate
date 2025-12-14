import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';

// Enhanced Navbar
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <nav style={{ 
      background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)', 
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '70px' }}>
          <Link to="/" style={{ 
            color: 'white', 
            textDecoration: 'none', 
            fontSize: '1.8rem', 
            fontWeight: '700',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            🏔️ TrekMate
          </Link>
          
          {/* Desktop Menu */}
          <div style={{ 
            display: window.innerWidth > 768 ? 'flex' : 'none',
            alignItems: 'center', 
            gap: '2rem' 
          }}>
            {[
              { path: '/', label: 'Home', icon: '🏠' },
              { path: '/treks', label: 'Treks', icon: '⛰️' },
              { path: '/ai-assistant', label: 'AI Assistant', icon: '🤖' },
              { path: '/about', label: 'About', icon: 'ℹ️' },
              { path: '/contact', label: 'Contact', icon: '📧' }
            ].map(item => (
              <Link key={item.path} to={item.path} style={{
                color: 'white',
                textDecoration: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.95rem',
                fontWeight: '500'
              }}
              onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.2)'}
              onMouseLeave={(e) => e.target.style.background = 'transparent'}>
                <span>{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            style={{
              display: window.innerWidth <= 768 ? 'block' : 'none',
              background: 'none',
              border: 'none',
              color: 'white',
              fontSize: '1.5rem',
              cursor: 'pointer'
            }}
          >
            {isOpen ? '✕' : '☰'}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isOpen && (
          <div style={{ 
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            paddingBottom: '1rem'
          }}>
            {[
              { path: '/', label: 'Home', icon: '🏠' },
              { path: '/treks', label: 'Treks', icon: '⛰️' },
              { path: '/ai-assistant', label: 'AI Assistant', icon: '🤖' },
              { path: '/about', label: 'About', icon: 'ℹ️' },
              { path: '/contact', label: 'Contact', icon: '📧' }
            ].map(item => (
              <Link key={item.path} to={item.path} 
                onClick={() => setIsOpen(false)}
                style={{
                  color: 'white',
                  textDecoration: 'none',
                  padding: '0.75rem 1rem',
                  borderRadius: '8px',
                  background: 'rgba(255,255,255,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                <span>{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}

// Footer
function Footer() {
  return (
    <footer style={{ 
      background: '#1f2937', 
      color: 'white', 
      padding: '2rem 1rem', 
      textAlign: 'center',
      marginTop: 'auto'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <p style={{ margin: '0', fontSize: '0.9rem' }}>
          © 2025 TrekMate. All rights reserved by <strong>Biman Barakoti</strong>
        </p>
      </div>
    </footer>
  );
}

// Main Layout
function Main({ children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <main style={{ flex: 1 }}>{children}</main>
      <Footer />
    </div>
  );
}

// Enhanced Treks Page
function Treks() {
  const [filters, setFilters] = useState({ region: '', difficulty: '', search: '' });
  const [sortBy, setSortBy] = useState('rating');
  
  const allTreks = [
    { id: 1, name: 'Everest Base Camp Trek', region: 'Himalayas', difficulty: 'Hard', duration: '14 days', cost: 1500, rating: 4.8, reviews: 342, image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300' },
    { id: 2, name: 'Kilimanjaro Trek', region: 'Africa', difficulty: 'Hard', duration: '7 days', cost: 1200, rating: 4.7, reviews: 298, image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=400&h=300' },
    { id: 3, name: 'Inca Trail Trek', region: 'South America', difficulty: 'Medium', duration: '4 days', cost: 800, rating: 4.9, reviews: 521, image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300' },
    { id: 4, name: 'Mont Blanc Trek', region: 'Europe', difficulty: 'Medium', duration: '5 days', cost: 600, rating: 4.7, reviews: 234, image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300' },
    { id: 5, name: 'Annapurna Circuit', region: 'Himalayas', difficulty: 'Hard', duration: '16 days', cost: 1300, rating: 4.8, reviews: 412, image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300' },
    { id: 6, name: 'Torres del Paine', region: 'South America', difficulty: 'Hard', duration: '8 days', cost: 1100, rating: 4.6, reviews: 187, image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300' },
    { id: 7, name: 'GR20 Corsica', region: 'Europe', difficulty: 'Hard', duration: '16 days', cost: 900, rating: 4.6, reviews: 156, image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300' },
    { id: 8, name: 'Milford Track', region: 'Oceania', difficulty: 'Medium', duration: '4 days', cost: 700, rating: 4.9, reviews: 389, image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300' }
  ];

  const filteredTreks = allTreks
    .filter(trek => 
      (!filters.region || trek.region === filters.region) &&
      (!filters.difficulty || trek.difficulty === filters.difficulty) &&
      (!filters.search || trek.name.toLowerCase().includes(filters.search.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.cost - b.cost;
      if (sortBy === 'price-high') return b.cost - a.cost;
      if (sortBy === 'duration') return parseInt(a.duration) - parseInt(b.duration);
      return b.rating - a.rating;
    });

  const containerStyle = {
    backgroundColor: '#f8fafc',
    minHeight: '100vh',
    padding: window.innerWidth <= 768 ? '1rem' : '2rem'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: window.innerWidth <= 768 ? '1fr' : window.innerWidth <= 1024 ? '250px 1fr' : '280px 1fr',
    gap: window.innerWidth <= 768 ? '1rem' : '2rem',
    maxWidth: '1200px',
    margin: '0 auto'
  };

  return (
    <div style={containerStyle}>
      <div style={{ background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)', color: 'white', padding: '3rem 2rem', borderRadius: '12px', textAlign: 'center', marginBottom: '2rem', maxWidth: '1200px', margin: '0 auto 2rem auto' }}>
        <h1 style={{ fontSize: window.innerWidth <= 768 ? '2rem' : '2.5rem', margin: '0 0 1rem 0' }}>🏔️ Explore Treks</h1>
        <p style={{ fontSize: window.innerWidth <= 768 ? '1rem' : '1.2rem', margin: '0' }}>Discover amazing trekking adventures around the world</p>
      </div>
      
      <div style={gridStyle}>
        {/* Filters Sidebar */}
        <aside style={{ 
          background: 'white', 
          borderRadius: '12px', 
          padding: '1.5rem', 
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          height: 'fit-content',
          position: window.innerWidth > 768 ? 'sticky' : 'static',
          top: '90px'
        }}>
          <h3 style={{ margin: '0 0 1.5rem 0', color: '#111827' }}>🔍 Filters</h3>
          
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151' }}>Search</label>
            <input 
              type="text"
              placeholder="Search treks..."
              value={filters.search}
              onChange={(e) => setFilters({...filters, search: e.target.value})}
              style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '6px' }}
            />
          </div>
          
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151' }}>Region</label>
            <select 
              value={filters.region}
              onChange={(e) => setFilters({...filters, region: e.target.value})}
              style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '6px' }}
            >
              <option value="">All Regions</option>
              <option value="Himalayas">Himalayas</option>
              <option value="Africa">Africa</option>
              <option value="South America">South America</option>
              <option value="Europe">Europe</option>
              <option value="Oceania">Oceania</option>
            </select>
          </div>
          
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151' }}>Difficulty</label>
            <select 
              value={filters.difficulty}
              onChange={(e) => setFilters({...filters, difficulty: e.target.value})}
              style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '6px' }}
            >
              <option value="">All Levels</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
          
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151' }}>Sort By</label>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '6px' }}
            >
              <option value="rating">Highest Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="duration">Duration</option>
            </select>
          </div>
          
          <button 
            onClick={() => setFilters({ region: '', difficulty: '', search: '' })}
            style={{ width: '100%', padding: '0.75rem', background: '#f3f4f6', border: '1px solid #d1d5db', borderRadius: '6px', cursor: 'pointer' }}
          >
            Clear Filters
          </button>
        </aside>

        {/* Trek Grid */}
        <main>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ margin: '0', color: '#111827' }}>{filteredTreks.length} Treks Found</h2>
          </div>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: window.innerWidth <= 768 ? '1fr' : 'repeat(auto-fill, minmax(320px, 1fr))', 
            gap: window.innerWidth <= 768 ? '1rem' : '1.5rem' 
          }}>
            {filteredTreks.map(trek => (
              <div key={trek.id} style={{ 
                background: 'white', 
                borderRadius: '12px', 
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)', 
                overflow: 'hidden',
                transition: 'transform 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                <div style={{ position: 'relative' }}>
                  <img src={trek.image} alt={trek.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                  <span style={{ 
                    position: 'absolute', 
                    top: '1rem', 
                    right: '1rem', 
                    background: trek.difficulty === 'Easy' ? '#10b981' : trek.difficulty === 'Medium' ? '#f59e0b' : '#ef4444', 
                    color: 'white', 
                    padding: '0.25rem 0.75rem', 
                    borderRadius: '20px', 
                    fontSize: '0.8rem',
                    fontWeight: '600'
                  }}>
                    {trek.difficulty}
                  </span>
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <h3 style={{ margin: '0 0 0.5rem 0', color: '#111827', fontSize: '1.2rem' }}>{trek.name}</h3>
                  <p style={{ margin: '0 0 0.75rem 0', color: '#6b7280' }}>{trek.region} • {trek.duration}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                    <span style={{ color: '#f59e0b' }}>★★★★★</span>
                    <span style={{ color: '#6b7280', fontSize: '0.9rem' }}>{trek.rating} ({trek.reviews} reviews)</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#3b82f6', fontWeight: '700', fontSize: '1.2rem' }}>${trek.cost}</span>
                    <button style={{ 
                      background: '#3b82f6', 
                      color: 'white', 
                      padding: '0.5rem 1rem', 
                      border: 'none', 
                      borderRadius: '6px', 
                      cursor: 'pointer',
                      fontWeight: '600'
                    }}>
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

// Functional AI Assistant
function AIAssistant() {
  const [messages, setMessages] = useState([
    { id: 1, role: 'assistant', content: 'Hi! I\'m your AI trek assistant. Ask me about treks, weather, packing lists, or safety tips!' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage = { id: Date.now(), role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setLoading(true);

    try {
      // Check if API key exists
      const apiKey = import.meta.env.VITE_CHATGPT_API_KEY;
      if (!apiKey) {
        throw new Error('API key not found');
      }

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            { 
              role: 'system', 
              content: 'You are an expert trekking and hiking guide with years of experience. Provide helpful, accurate, and safety-conscious advice about trekking, hiking, outdoor adventures, gear recommendations, weather conditions, and safety tips. Keep responses concise but informative.' 
            },
            { role: 'user', content: currentInput }
          ],
          max_tokens: 300,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`API Error: ${errorData.error?.message || response.statusText}`);
      }

      const data = await response.json();
      
      if (data.choices && data.choices[0] && data.choices[0].message) {
        const aiMessage = {
          id: Date.now() + 1,
          role: 'assistant',
          content: data.choices[0].message.content
        };
        setMessages(prev => [...prev, aiMessage]);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('AI Error:', error);
      
      // Provide helpful trekking responses as fallback
      const fallbackResponses = {
        'recommend treks for beginners': 'For beginners, I recommend starting with day hikes or 2-3 day treks like: 1) Local nature trails, 2) Well-marked paths with good facilities, 3) Lower altitude treks (under 3000m). Always start small and build your experience!',
        'check weather conditions': 'Always check weather forecasts 3-7 days before your trek. Use reliable sources like mountain weather services. Pack layers for temperature changes and waterproof gear for unexpected rain.',
        'create packing list': 'Essential trekking gear: 1) Proper hiking boots, 2) Weather-appropriate clothing layers, 3) First aid kit, 4) Navigation tools, 5) Headlamp, 6) Water and snacks, 7) Emergency shelter. Adjust based on trek duration and conditions.',
        'safety tips for high altitude': 'High altitude safety: 1) Ascend gradually (max 500m/day above 3000m), 2) Stay hydrated, 3) Recognize altitude sickness symptoms, 4) Descend if symptoms worsen, 5) Carry emergency communication device.',
        'find treks near me': 'To find local treks: 1) Check local hiking clubs and websites, 2) Visit outdoor gear stores for recommendations, 3) Use apps like AllTrails, 4) Contact local tourism offices, 5) Join hiking groups on social media.'
      };
      
      const lowerInput = currentInput.toLowerCase();
      let fallbackContent = 'I\'m having trouble connecting to the AI service right now. Here are some general trekking tips: Always inform someone of your plans, check weather conditions, pack essential safety gear, and know your limits. For specific advice, please try again later.';
      
      // Check for matching fallback responses
      for (const [key, response] of Object.entries(fallbackResponses)) {
        if (lowerInput.includes(key.toLowerCase()) || key.toLowerCase().includes(lowerInput)) {
          fallbackContent = response;
          break;
        }
      }
      
      const errorMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: fallbackContent
      };
      setMessages(prev => [...prev, errorMessage]);
    }
    setLoading(false);
  };

  const containerStyle = {
    backgroundColor: '#f8fafc',
    minHeight: '100vh',
    padding: window.innerWidth <= 768 ? '1rem' : '2rem'
  };

  const chatStyle = {
    maxWidth: '1000px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: window.innerWidth <= 768 ? '1fr' : '300px 1fr',
    gap: window.innerWidth <= 768 ? '1rem' : '2rem'
  };

  return (
    <div style={containerStyle}>
      <div style={{ background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)', color: 'white', padding: '3rem 2rem', borderRadius: '12px', textAlign: 'center', marginBottom: '2rem', maxWidth: '1000px', margin: '0 auto 2rem auto' }}>
        <h1 style={{ fontSize: window.innerWidth <= 768 ? '2rem' : '2.5rem', margin: '0 0 1rem 0' }}>🤖 AI Trek Assistant</h1>
        <p style={{ fontSize: window.innerWidth <= 768 ? '1rem' : '1.2rem', margin: '0' }}>Get personalized trekking advice and real-time guidance</p>
      </div>
      
      <div style={chatStyle}>
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', height: 'fit-content' }}>
          <h3 style={{ margin: '0 0 1rem 0', color: '#111827' }}>Quick Actions</h3>
          {[
            '🏔️ Recommend treks for beginners',
            '🌤️ Check weather conditions',
            '🎒 Create packing list',
            '⚠️ Safety tips for high altitude',
            '📍 Find treks near me'
          ].map((action, i) => (
            <button key={i} 
              onClick={() => setInput(action.substring(2))}
              style={{ 
                display: 'block', 
                width: '100%', 
                padding: '0.75rem', 
                margin: '0.5rem 0', 
                background: '#f8fafc', 
                border: '1px solid #e5e7eb', 
                borderRadius: '8px', 
                cursor: 'pointer',
                textAlign: 'left',
                fontSize: '0.9rem'
              }}>
              {action}
            </button>
          ))}
        </div>
        
        <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', height: '600px' }}>
          <div style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>
            <h3 style={{ margin: '0', color: '#111827' }}>Chat with AI Assistant</h3>
          </div>
          
          <div style={{ flex: 1, padding: '1rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {messages.map(msg => (
              <div key={msg.id} style={{ 
                display: 'flex', 
                justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' 
              }}>
                <div style={{ 
                  maxWidth: '80%', 
                  padding: '0.75rem 1rem', 
                  borderRadius: '12px', 
                  background: msg.role === 'user' ? '#3b82f6' : '#f3f4f6',
                  color: msg.role === 'user' ? 'white' : '#111827'
                }}>
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{ padding: '0.75rem 1rem', borderRadius: '12px', background: '#f3f4f6', color: '#6b7280' }}>
                  AI is thinking...
                </div>
              </div>
            )}
          </div>
          
          <div style={{ padding: '1rem', borderTop: '1px solid #e5e7eb', display: 'flex', gap: '0.5rem' }}>
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Ask about treks, weather, packing..."
              style={{ flex: 1, padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '8px' }}
            />
            <button 
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              style={{ 
                background: '#3b82f6', 
                color: 'white', 
                padding: '0.75rem 1.5rem', 
                border: 'none', 
                borderRadius: '8px', 
                cursor: 'pointer',
                opacity: loading || !input.trim() ? 0.5 : 1
              }}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Updated About Page (removed team section)
function About() {
  const containerStyle = {
    backgroundColor: 'white',
    minHeight: '100vh',
    padding: window.innerWidth <= 768 ? '1rem' : '2rem'
  };

  return (
    <div style={containerStyle}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)', color: 'white', padding: '3rem 2rem', borderRadius: '12px', textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ fontSize: window.innerWidth <= 768 ? '2rem' : '2.5rem', margin: '0 0 1rem 0' }}>About TrekMate</h1>
          <p style={{ fontSize: window.innerWidth <= 768 ? '1rem' : '1.2rem', margin: '0' }}>Your AI-powered companion for unforgettable treks</p>
        </div>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: window.innerWidth <= 768 ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '2rem', 
          marginBottom: '3rem' 
        }}>
          <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            <h3 style={{ margin: '0 0 1rem 0', color: '#111827' }}>🎯 Our Mission</h3>
            <p style={{ color: '#374151', lineHeight: '1.6' }}>We help adventurers discover and plan the perfect trek using AI technology for personalized recommendations and real-time guidance.</p>
          </div>
          
          <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            <h3 style={{ margin: '0 0 1rem 0', color: '#111827' }}>🤖 AI-Powered</h3>
            <p style={{ color: '#374151', lineHeight: '1.6' }}>Powered by ChatGPT and Gemini AI for expert advice, weather forecasts, and personalized recommendations.</p>
          </div>
          
          <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            <h3 style={{ margin: '0 0 1rem 0', color: '#111827' }}>🌍 Global Coverage</h3>
            <p style={{ color: '#374151', lineHeight: '1.6' }}>Discover treks worldwide from the Himalayas to Patagonia, with detailed information and safety guidance.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Contact Page
function Contact() {
  const containerStyle = {
    backgroundColor: 'white',
    minHeight: '100vh',
    padding: window.innerWidth <= 768 ? '1rem' : '2rem'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: window.innerWidth <= 768 ? '1fr' : '1fr 1fr',
    gap: window.innerWidth <= 768 ? '2rem' : '3rem'
  };

  return (
    <div style={containerStyle}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)', color: 'white', padding: '3rem 2rem', borderRadius: '12px', textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ fontSize: window.innerWidth <= 768 ? '2rem' : '2.5rem', margin: '0 0 1rem 0' }}>📧 Contact Us</h1>
          <p style={{ fontSize: window.innerWidth <= 768 ? '1rem' : '1.2rem', margin: '0' }}>Get in touch for trek planning and support</p>
        </div>
        
        <div style={gridStyle}>
          <div>
            <h2 style={{ margin: '0 0 1.5rem 0', color: '#111827' }}>Get in Touch</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#111827' }}>📧 Email</h4>
                <p style={{ margin: '0', color: '#6b7280' }}>bimanbarakoti@gmail.com</p>
              </div>
              <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#111827' }}>💬 Response Time</h4>
                <p style={{ margin: '0', color: '#6b7280' }}>Within 24 hours</p>
              </div>
            </div>
          </div>
          
          <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            <h3 style={{ margin: '0 0 1.5rem 0', color: '#111827' }}>Send us a Message</h3>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <input type="text" placeholder="Your Name" style={{ padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '6px' }} />
              <input type="email" placeholder="Your Email" style={{ padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '6px' }} />
              <textarea rows="5" placeholder="Your Message" style={{ padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '6px', resize: 'vertical' }}></textarea>
              <button type="submit" style={{ background: '#3b82f6', color: 'white', padding: '0.75rem 1.5rem', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}>
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

// Home Page (keeping existing)
function Home() {
  const navigate = useNavigate();
  const mockTreks = [
    { id: 1, name: 'Everest Base Camp Trek', region: 'Himalayas', difficulty: 'Hard', duration: '14 days', altitude: '5,364 meters', cost: '$1,500', rating: 4.8, reviews: 342, description: 'The most iconic trekking route in the world.', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=400' },
    { id: 2, name: 'Kilimanjaro Trek', region: 'Africa', difficulty: 'Hard', duration: '7 days', altitude: '5,895 meters', cost: '$1,200', rating: 4.7, reviews: 298, description: 'Climb Africa\'s highest peak.', image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=500&h=400' },
    { id: 3, name: 'Inca Trail Trek', region: 'South America', difficulty: 'Medium', duration: '4 days', altitude: '4,215 meters', cost: '$800', rating: 4.9, reviews: 521, description: 'Walk the legendary Inca Trail.', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=400' }
  ];

  const containerStyle = {
    backgroundColor: '#f8fafc',
    minHeight: '100vh'
  };

  const heroStyle = {
    background: 'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: window.innerWidth <= 768 ? '60vh' : '80vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    textAlign: 'center'
  };

  const contentStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: window.innerWidth <= 768 ? '2rem 1rem' : '3rem 2rem'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: window.innerWidth <= 768 ? '1fr' : window.innerWidth <= 1024 ? '1fr' : '280px 1fr 320px',
    gap: window.innerWidth <= 768 ? '1rem' : '2rem',
    alignItems: 'start'
  };

  return (
    <div style={containerStyle}>
      <section style={heroStyle}>
        <div style={{ maxWidth: '800px', padding: '2rem' }}>
          <h1 style={{ fontSize: window.innerWidth <= 768 ? '2.5rem' : '3.5rem', fontWeight: '700', margin: '0 0 1rem 0', lineHeight: '1.1' }}>
            Discover Your Next Adventure
          </h1>
          <p style={{ fontSize: window.innerWidth <= 768 ? '1.1rem' : '1.3rem', margin: '0 0 2rem 0', opacity: '0.9' }}>
            Find the perfect trek with AI-powered recommendations
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => navigate('/treks')} style={{ background: '#3b82f6', color: 'white', padding: '1rem 2rem', border: 'none', borderRadius: '8px', fontSize: '1.1rem', cursor: 'pointer', fontWeight: '600' }}>
              Explore Treks
            </button>
            <button onClick={() => navigate('/ai-assistant')} style={{ background: 'rgba(255,255,255,0.2)', color: 'white', padding: '1rem 2rem', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '8px', fontSize: '1.1rem', cursor: 'pointer', fontWeight: '600' }}>
              Try AI Assistant
            </button>
          </div>
        </div>
      </section>

      <div style={contentStyle}>
        <div style={gridStyle}>
          {window.innerWidth > 1024 && (
            <aside style={{ background: 'white', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
              <h3 style={{ margin: '0 0 1rem 0', color: '#111827' }}>🔍 Quick Filters</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {['All Regions', 'Himalayas', 'Africa', 'Europe'].map(region => (
                  <button key={region} style={{ padding: '0.5rem', background: '#f8fafc', border: '1px solid #e5e7eb', borderRadius: '6px', cursor: 'pointer', textAlign: 'left' }}>
                    {region}
                  </button>
                ))}
              </div>
            </aside>
          )}

          <main>
            <h2 style={{ color: '#111827', fontSize: window.innerWidth <= 768 ? '1.5rem' : '2rem', margin: '0 0 2rem 0' }}>Popular Treks</h2>
            <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth <= 768 ? '1fr' : 'repeat(auto-fill, minmax(300px, 1fr))', gap: window.innerWidth <= 768 ? '1rem' : '2rem' }}>
              {mockTreks.map(trek => (
                <div key={trek.id} style={{ background: 'white', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', overflow: 'hidden', cursor: 'pointer' }}
                onClick={() => navigate(`/treks/${trek.id}`)}>
                  <img src={trek.image} alt={trek.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                  <div style={{ padding: '1.5rem' }}>
                    <h3 style={{ margin: '0 0 0.5rem 0', color: '#111827' }}>{trek.name}</h3>
                    <p style={{ margin: '0 0 1rem 0', color: '#6b7280', fontSize: '0.9rem' }}>{trek.region}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ color: '#3b82f6', fontWeight: '600' }}>{trek.cost}</span>
                      <button style={{ background: '#3b82f6', color: 'white', padding: '0.5rem 1rem', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </main>

          {window.innerWidth > 1024 && (
            <aside style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ background: 'white', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                <h3 style={{ margin: '0 0 1rem 0', color: '#111827' }}>🤖 AI Assistant</h3>
                <p style={{ margin: '0 0 1rem 0', color: '#6b7280', fontSize: '0.9rem' }}>Get personalized recommendations</p>
                <button onClick={() => navigate('/ai-assistant')} style={{ background: '#3b82f6', color: 'white', padding: '0.75rem 1rem', border: 'none', borderRadius: '6px', cursor: 'pointer', width: '100%' }}>
                  Chat with AI
                </button>
              </div>
            </aside>
          )}
        </div>
      </div>
    </div>
  );
}

function TrekDetails() {
  return (
    <div style={{ padding: '2rem', color: '#111827', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>🏔️ Trek Details</h1>
      <p>Detailed trek information will be displayed here.</p>
    </div>
  );
}

function App() {
  return (
    <div style={{ backgroundColor: 'white', minHeight: '100vh', color: '#111827' }}>
      <AppProvider>
        <Router>
          <Main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/treks" element={<Treks />} />
              <Route path="/treks/:id" element={<TrekDetails />} />
              <Route path="/ai-assistant" element={<AIAssistant />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </Main>
        </Router>
      </AppProvider>
    </div>
  );
}

export default App;