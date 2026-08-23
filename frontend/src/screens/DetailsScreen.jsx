import React from 'react';
import './LandingScreen.css';

export function DetailsScreen({ onNavigate }) {
  return (
    <div className="landing-container details-page-container">
      <div className="details-header">
        <button className="btn btn-outline" onClick={() => onNavigate('landing')}>
          ← BACK TO RACE
        </button>
        <h1 className="hero-main-title details-title">
          GAME <span className="text-primary">DETAILS</span>
        </h1>
      </div>

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <h2 className="section-title">
          HOW IT <span className="text-secondary">WORKS</span>
        </h2>
        <div className="steps-grid">
          <div className="step-card panel">
            <div className="step-number text-primary">01</div>
            <h3>CREATE OR JOIN</h3>
            <p>Host a party to get a 4-digit code and invite link, or join your friend's room instantly.</p>
          </div>
          <div className="step-card panel">
            <div className="step-number text-secondary">02</div>
            <h3>READY UP</h3>
            <p>Wait in the lobby with up to 6 racers. Pick your username and signal ready when ready to burn rubber.</p>
          </div>
          <div className="step-card panel">
            <div className="step-number text-primary">03</div>
            <h3>RACE TO THE FINISH</h3>
            <p>Type the shared text passage accurately. Watch your race car speed forward with every correct keystroke!</p>
          </div>
        </div>
      </section>

      {/* Feature Cards Grid */}
      <section className="features-section">
        <h2 className="section-title">
          POWERED FOR <span className="text-primary">SPEED</span>
        </h2>
        <div className="features-grid">
          <div className="feature-card panel">
            <div className="feature-icon text-primary">⚡</div>
            <h3>REAL-TIME RACING</h3>
            <p>Instant socket-driven progress tracking. See rival cars push ahead in live competitive sync.</p>
          </div>
          <div className="feature-card panel">
            <div className="feature-icon text-secondary">⌨️</div>
            <h3>LIVE WPM COUNTER</h3>
            <p>Precision Words-Per-Minute calculations continuously updating as you type through the text.</p>
          </div>
          <div className="feature-card panel">
            <div className="feature-icon text-primary">🎯</div>
            <h3>ACCURACY TRACKING</h3>
            <p>Real-time mistake penalty & accuracy percentage monitoring to push your typing precision.</p>
          </div>
          <div className="feature-card panel">
            <div className="feature-icon text-secondary">🏎️</div>
            <h3>6-PLAYER MULTIPLAYER</h3>
            <p>Race with up to 6 players per party room. Fast temporary lobbies with zero database bloat.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
