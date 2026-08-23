import React from 'react';
import './LandingScreen.css';

export function LandingScreen({ onNavigate }) {
  return (
    <div className="landing-container">
      {/* Background Racing Grid / Visual Effects */}
      <div className="neon-bg-glow primary-glow"></div>
      <div className="neon-bg-glow secondary-glow"></div>

      {/* Hero Section */}
      <section className="hero-section">
        <h1 className="hero-main-title">
          TYPING RACE...
        </h1>

        <div className="landing-actions">
          <button 
            className="btn btn-primary btn-lg glow-button-primary" 
            onClick={() => onNavigate('create-party')}
            id="create-party-btn"
          >
            CREATE PARTY
          </button>
          <button 
            className="btn btn-secondary btn-lg glow-button-secondary" 
            onClick={() => onNavigate('join-party')}
            id="join-party-btn"
          >
            JOIN PARTY
          </button>
        </div>

        {/* Racing Track Animation Visual with Stylish Track and START/FINISH Labels */}
        <div className="hero-racing-visual panel">
          <div className="track-marker-label start-marker-label">START 🚩</div>
          <div className="track-marker-label finish-marker-label">FINISH 🏁</div>

          <div className="start-line-strip" title="START"></div>
          <div className="finish-line-strip" title="FINISH"></div>

          <div className="track-lane">
            <span className="car-indicator primary-car" style={{ left: '75%' }}>🏎️ Player 1 (84 WPM)</span>
            <div className="track-line"></div>
          </div>
          <div className="track-lane">
            <span className="car-indicator secondary-car" style={{ left: '55%' }}>🏎️ Player 2 (62 WPM)</span>
            <div className="track-line"></div>
          </div>
          <div className="track-lane">
            <span className="car-indicator text-muted-car" style={{ left: '35%' }}>🏎️ Player 3 (45 WPM)</span>
            <div className="track-line"></div>
          </div>
        </div>
      </section>

      {/* Fixed bottom-right Details button */}
      <button 
        className="details-floating-btn"
        onClick={() => onNavigate('details')}
        id="details-btn"
      >
        DETAILS ℹ️
      </button>
    </div>
  );
}
