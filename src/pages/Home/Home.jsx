import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const mockTreks = [
  { id: 1, name: 'Everest Base Camp Trek', region: 'Himalayas', difficulty: 'Hard', duration: '14 days', altitude: '5,364 meters', cost: '$1,500', rating: 4.8, reviews: 342, description: 'The most iconic trekking route in the world. Experience the breathtaking beauty of the Himalayas.', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=400' },
  { id: 2, name: 'Kilimanjaro Trek', region: 'Africa', difficulty: 'Hard', duration: '7 days', altitude: '5,895 meters', cost: '$1,200', rating: 4.7, reviews: 298, description: 'Climb Africa\'s highest peak with stunning views across the Tanzanian landscape.', image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=500&h=400' },
  { id: 3, name: 'Inca Trail Trek', region: 'South America', difficulty: 'Medium', duration: '4 days', altitude: '4,215 meters', cost: '$800', rating: 4.9, reviews: 521, description: 'Walk the legendary Inca Trail to the mystical ruins of Machu Picchu in Peru.', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=400' },
  { id: 4, name: 'Mont Blanc Trek', region: 'Europe', difficulty: 'Medium', duration: '5 days', altitude: '4,808 meters', cost: '$600', rating: 4.7, reviews: 234, description: 'Trek around Western Europe\'s highest peak with Alpine scenery.', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=400' },
  { id: 5, name: 'Annapurna Circuit Trek', region: 'Himalayas', difficulty: 'Hard', duration: '16 days', altitude: '5,416 meters', cost: '$1,300', rating: 4.8, reviews: 412, description: 'A complete circuit around the Annapurna Massif with diverse landscapes.', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=400' },
  { id: 6, name: 'Torres del Paine Trek', region: 'South America', difficulty: 'Hard', duration: '8 days', altitude: '1,700 meters', cost: '$1,100', rating: 4.8, reviews: 187, description: 'Epic trek through Patagonia\'s most dramatic landscape with granite towers.', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=400' }
];

function Home() {
  const [filters, setFilters] = useState({});
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (query) => {
    if (query) navigate(`/treks?query=${encodeURIComponent(query)}`);
  };

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      {/* Hero Section */}
      <section style={{ 
        background: 'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '800px', padding: '2rem' }}>
          <h1 style={{ fontSize: '3.5rem', fontWeight: '700', margin: '0 0 1rem 0', lineHeight: '1.1' }}>
            Discover Your Next Adventure
          </h1>
          <p style={{ fontSize: '1.3rem', margin: '0 0 2rem 0', opacity: '0.9' }}>
            Find the perfect trek with AI-powered recommendations and real-time guidance
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button 
              onClick={() => navigate('/treks')}
              style={{ background: '#3b82f6', color: 'white', padding: '1rem 2rem', border: 'none', borderRadius: '8px', fontSize: '1.1rem', cursor: 'pointer', fontWeight: '600' }}
            >
              Explore Treks
            </button>
            <button 
              onClick={() => navigate('/ai-assistant')}
              style={{ background: 'rgba(255,255,255,0.2)', color: 'white', padding: '1rem 2rem', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '8px', fontSize: '1.1rem', cursor: 'pointer', fontWeight: '600' }}
            >
              Try AI Assistant
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr 320px', gap: '2rem', alignItems: 'start' }}>
          
          {/* Filters Sidebar */}
          <aside style={{ background: 'white', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            <h3 style={{ margin: '0 0 1rem 0', color: '#111827', fontSize: '1.2rem' }}>Filters</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151' }}>Region</label>
                <select style={{ width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '6px' }}>
                  <option>All Regions</option>
                  <option>Himalayas</option>
                  <option>Africa</option>
                  <option>South America</option>
                  <option>Europe</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151' }}>Difficulty</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {['Easy', 'Medium', 'Hard'].map(level => (
                    <label key={level} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                      <input type="checkbox" />
                      <span style={{ color: '#374151' }}>{level}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Trek Grid */}
          <main>
            <h2 style={{ color: '#111827', fontSize: '2rem', margin: '0 0 2rem 0' }}>Popular Treks</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
              {mockTreks.map((trek) => (
                <div key={trek.id} style={{ 
                  background: 'white', 
                  borderRadius: '12px', 
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)', 
                  overflow: 'hidden',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-5px)';
                  e.target.style.boxShadow = '0 8px 24px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                }}
                onClick={() => navigate(`/treks/${trek.id}`)}>
                  <div style={{ position: 'relative' }}>
                    <img src={trek.image} alt={trek.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                    <span style={{ 
                      position: 'absolute', 
                      top: '1rem', 
                      right: '1rem', 
                      background: 'rgba(0,0,0,0.7)', 
                      color: 'white', 
                      padding: '0.25rem 0.5rem', 
                      borderRadius: '4px', 
                      fontSize: '0.8rem' 
                    }}>
                      {trek.difficulty}
                    </span>
                  </div>
                  <div style={{ padding: '1.5rem' }}>
                    <h3 style={{ margin: '0 0 0.5rem 0', color: '#111827', fontSize: '1.25rem', fontWeight: '700' }}>{trek.name}</h3>
                    <p style={{ margin: '0 0 0.75rem 0', color: '#6b7280', fontSize: '0.9rem' }}>{trek.region}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                      <span style={{ color: '#f59e0b' }}>★★★★★</span>
                      <span style={{ color: '#6b7280', fontSize: '0.85rem' }}>{trek.rating} ({trek.reviews} reviews)</span>
                    </div>
                    <p style={{ margin: '0 0 1rem 0', color: '#374151', fontSize: '0.85rem', lineHeight: '1.5' }}>{trek.description}</p>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem', paddingTop: '1rem', borderTop: '1px solid #e5e7eb' }}>
                      <div>
                        <div style={{ fontSize: '0.75rem', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Duration</div>
                        <div style={{ fontSize: '0.85rem', fontWeight: '600', color: '#111827' }}>{trek.duration}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: '0.75rem', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Altitude</div>
                        <div style={{ fontSize: '0.85rem', fontWeight: '600', color: '#111827' }}>{trek.altitude}</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ color: '#3b82f6', fontWeight: '700', fontSize: '1.1rem' }}>{trek.cost}</span>
                      <button style={{ 
                        background: '#3b82f6', 
                        color: 'white', 
                        padding: '0.5rem 1rem', 
                        border: 'none', 
                        borderRadius: '6px', 
                        cursor: 'pointer',
                        fontSize: '0.9rem',
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

          {/* Right Sidebar */}
          <aside style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Location Widget */}
            <div style={{ background: 'white', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
              <h3 style={{ margin: '0 0 1rem 0', color: '#111827', fontSize: '1.1rem' }}>📍 Your Location</h3>
              <p style={{ margin: '0 0 1rem 0', color: '#6b7280', fontSize: '0.9rem' }}>Enable location for personalized recommendations</p>
              <button style={{ background: '#3b82f6', color: 'white', padding: '0.75rem 1rem', border: 'none', borderRadius: '6px', cursor: 'pointer', width: '100%' }}>
                Use My Location
              </button>
            </div>

            {/* Weather Widget */}
            <div style={{ background: 'white', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
              <h3 style={{ margin: '0 0 1rem 0', color: '#111827', fontSize: '1.1rem' }}>🌤️ Weather</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <span style={{ fontSize: '2rem', fontWeight: '700', color: '#111827' }}>22°C</span>
                <div>
                  <div style={{ color: '#374151', fontWeight: '500' }}>Sunny</div>
                  <div style={{ color: '#6b7280', fontSize: '0.8rem' }}>Perfect for trekking</div>
                </div>
              </div>
            </div>

            {/* AI Assistant Widget */}
            <div style={{ background: 'white', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
              <h3 style={{ margin: '0 0 1rem 0', color: '#111827', fontSize: '1.1rem' }}>🤖 AI Assistant</h3>
              <p style={{ margin: '0 0 1rem 0', color: '#6b7280', fontSize: '0.9rem' }}>Get personalized trek recommendations and advice</p>
              <button 
                onClick={() => navigate('/ai-assistant')}
                style={{ background: '#3b82f6', color: 'white', padding: '0.75rem 1rem', border: 'none', borderRadius: '6px', cursor: 'pointer', width: '100%' }}
              >
                Chat with AI
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default Home;