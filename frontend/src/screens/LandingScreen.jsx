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
        <div className="hero-badge">
          <span className="badge-pulse"></span>
          REAL-TIME MULTIPLAYER TYPING
        </div>

        <h1 className="hero-main-title">
          TYPE FAST. <br />
          <span className="glow-text-primary">BE THE FASTEST.</span>
        </h1>

        <p className="hero-subtitle">
          Jump into high-speed typing battles with up to <strong className="text-primary">6 players</strong>. 
          No login, no profiles, no friction—just pure racing speed.
        </p>

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

        {/* Racing Track Animation Visual */}
        <div className="hero-racing-visual panel">
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
