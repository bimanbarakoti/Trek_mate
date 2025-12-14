import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import TrekFilters from '../../components/TrekFilters/TrekFilters';
import TrekCard from '../../components/TrekCard/TrekCard';
import SearchBar from '../../components/SearchBar/SearchBar';
import treks from '../../data/treks';
import { filterTreks } from '../../utils/filterTreks';
import './Treks.css';

function Treks() {
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState({});
  const [searchQuery, setSearchQuery] = useState(searchParams.get('query') || '');

  useEffect(() => {
    if (searchQuery) {
      setFilters(prev => ({ ...prev, search: searchQuery }));
    }
  }, [searchQuery]);

  const filtered = filterTreks(treks, { ...filters, search: searchQuery });

  return (
    <div className="treks-page">
      <div className="treks-header">
        <div className="container">
          <h1>Explore Treks</h1>
          <p>Discover amazing trekking adventures around the world</p>
          <div className="treks-search">
            <SearchBar 
              onSearch={setSearchQuery}
              placeholder="Search treks, regions, or difficulty..."
              suggestions={[
                'Everest Base Camp', 'Kilimanjaro', 'Inca Trail', 'Annapurna',
                'Himalayas', 'Africa', 'South America', 'Europe',
                'Easy', 'Medium', 'Hard'
              ]}
            />
          </div>
        </div>
      </div>

      <div className="container treks-content">
        <aside className="treks-filters">
          <TrekFilters onChange={setFilters} />
        </aside>

        <main className="treks-results">
          <div className="results-header">
            <h2 style={{color: '#111827'}}>
              {filtered.length} Trek{filtered.length !== 1 ? 's' : ''} Found
              {searchQuery && ` for "${searchQuery}"`}
            </h2>
          </div>

          <div className="trek-grid">
            {filtered.map((trek) => (
              <TrekCard key={trek.id} {...trek} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="no-results">
              <h3 style={{color: '#111827'}}>No treks found</h3>
              <p style={{color: '#374151'}}>Try adjusting your filters or search terms</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default Treks;