import React from 'react';
import './About.css';

function About(){
  return (
    <div className="about container">
      <header className="about-hero">
        <h1>About TrekMate</h1>
        <p>Your companion for planning unforgettable treks around the world.</p>
      </header>

      <section className="mission">
        <h2>Our Mission</h2>
        <p>We help adventurers find the perfect trek based on skill, time, and budget.</p>
      </section>

      <section className="team">
        <h2>Meet the Team</h2>
        <div className="team-grid">
          <div className="member"><h3>Alice</h3><p>Founder & Guide</p></div>
          <div className="member"><h3>Bob</h3><p>Product</p></div>
          <div className="member"><h3>Charlie</h3><p>Engineering</p></div>
        </div>
      </section>
    </div>
  );
}

export default About;
