import React, { useState } from 'react';
import './Header.css';

export function Header({ currentScreen, onNavigate, username, setUsername }) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempUsername, setTempUsername] = useState(username);

  const handleSave = () => {
    const trimmed = tempUsername.trim();
    if (trimmed.length > 0) {
      setUsername(trimmed);
    } else {
      setTempUsername(username);
    }
    setIsEditing(false);
  };

  return (
    <header className="app-header">
      <div 
        className="app-logo" 
        onClick={() => onNavigate('landing')}
        style={{ cursor: 'pointer' }}
        id="nav-logo"
      >
        <span>⚡</span> TYPE RACE
      </div>

      <div className="header-right">
        {/* Username Widget */}
        <div className="username-widget panel-sm">
          <span className="username-icon">🏎️</span>
          {isEditing ? (
            <div className="username-edit-box">
              <input
                type="text"
                className="username-input"
                value={tempUsername}
                maxLength={20}
                onChange={(e) => setTempUsername(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSave()}
                autoFocus
              />
              <button className="btn-icon-save" onClick={handleSave} title="Save username">✓</button>
            </div>
          ) : (
            <div className="username-display" onClick={() => setIsEditing(true)} title="Click to edit username">
              <span className="username-text">{username}</span>
              <span className="edit-icon">✏️</span>
            </div>
          )}
        </div>

        <nav className="header-nav">
          {currentScreen !== 'landing' && (
            <button 
              className="btn btn-outline btn-sm"
              onClick={() => onNavigate('landing')}
              id="nav-home-btn"
            >
              HOME
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
