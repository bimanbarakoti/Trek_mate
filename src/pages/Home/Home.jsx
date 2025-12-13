import React from 'react';
import HeroSection from '../../components/HeroSection/HeroSection';
import TrekFilters from '../../components/TrekFilters/TrekFilters';
import TrekCard from '../../components/TrekCard/TrekCard';
import WeatherConditions from '../../components/WeatherConditions/WeatherConditions';
import AIChatAssistant from '../../components/AIChatAssistant/AIChatAssistant';
import LocationPrompt from '../../components/LocationPrompt/LocationPrompt';

import treks from '../../data/treks';
import { filterTreks } from '../../utils/filterTreks';

import './Home.css';

function Home() {
  const [filters, setFilters] = React.useState({});
  const [showFilters, setShowFilters] = React.useState(false);

  const filtered = filterTreks(treks, filters);

  return (
    <div className="home-page">
      <HeroSection />

      <section className="container layout-grid">
        <aside className={`filters-col ${showFilters ? 'filters-col--visible' : ''}`}>
          <TrekFilters onChange={setFilters} />
        </aside>

        <section className="results-col">
          <div className="layout-controls">
            <button
              className="filters-toggle"
              onClick={() => setShowFilters(!showFilters)}
              aria-expanded={showFilters}
              aria-controls="filters-column"
            >
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
          </div>

          <div className="trek-grid">
            {filtered.map((t) => (
              <TrekCard key={t.id} {...t} />
            ))}
          </div>
        </section>

        <aside className="sidebar-col">
          <LocationPrompt compact />
          <WeatherConditions />
          <AIChatAssistant />
        </aside>
      </section>
    </div>
  );
}

export default Home;
