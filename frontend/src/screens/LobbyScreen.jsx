import React, { useState, useEffect } from 'react';
import { socket } from '../services/socket';
import './LobbyScreen.css';

export function LobbyScreen({ onNavigate, partyCode = '', username = 'Player', initialPartyData = null }) {
  const [partyState, setPartyState] = useState(initialPartyData);
  const [copiedLink, setCopiedLink] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [infoNotice, setInfoNotice] = useState('');

  // Sync username changes to server when username updates
  useEffect(() => {
    if (socket.connected && partyCode) {
      socket.emit('set_username', { username });
    }
  }, [username, partyCode]);

  // Listen to Socket.IO room events & error messages
  useEffect(() => {
    const handlePartyUpdate = (data) => {
      if (data && data.party) {
        setPartyState(data.party);
        setErrorMessage('');
      }
      if (data && data.hostReassigned) {
        setInfoNotice('Host disconnected! You or another member are now the party host.');
        setTimeout(() => setInfoNotice(''), 4000);
      }
    };

    const handleCountdownStarted = () => {
      onNavigate('race');
    };

    const handleError = (err) => {
      if (err && err.message) {
        setErrorMessage(err.message);
      }
    };

    socket.on('room_joined', handlePartyUpdate);
    socket.on('player_joined', handlePartyUpdate);
    socket.on('player_left', handlePartyUpdate);
    socket.on('player_updated', handlePartyUpdate);
    socket.on('countdown_started', handleCountdownStarted);
    socket.on('error', handleError);

    return () => {
      socket.off('room_joined', handlePartyUpdate);
      socket.off('player_joined', handlePartyUpdate);
      socket.off('player_left', handlePartyUpdate);
      socket.off('player_updated', handlePartyUpdate);
      socket.off('countdown_started', handleCountdownStarted);
      socket.off('error', handleError);
    };
  }, [onNavigate]);

  const activePlayers = partyState?.players || [];
  const localPlayer = activePlayers.find(p => p.playerId === socket.id) || {};
  const isHost = localPlayer.isHost || partyState?.hostId === socket.id;
  const isReady = localPlayer.ready || false;

  const maxPlayers = 6;
  const waitingSlotsCount = maxPlayers - activePlayers.length;
  const inviteUrl = `${window.location.origin}/?party=${partyCode || partyState?.partyCode}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(inviteUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const toggleReady = () => {
    socket.emit('set_ready', { ready: !isReady });
  };

  const handleStartRace = () => {
    socket.emit('start_race');
  };

  const handleLeaveParty = () => {
    socket.emit('leave_room');
    onNavigate('landing');
  };

  return (
    <div className="lobby-container panel">
      {/* Notifications / Errors */}
      {errorMessage && (
        <div className="error-text" style={{ padding: '0.6rem 1rem', background: 'rgba(255, 77, 77, 0.1)', border: '1px solid #ff4d4d', borderRadius: '6px', marginBottom: '1rem', color: '#ff4d4d' }}>
          ⚠️ {errorMessage}
        </div>
      )}
      {infoNotice && (
        <div className="info-text" style={{ padding: '0.6rem 1rem', background: 'rgba(255, 212, 0, 0.1)', border: '1px solid var(--primary-color)', borderRadius: '6px', marginBottom: '1rem', color: 'var(--primary-color)', fontWeight: 'bold' }}>
          ℹ️ {infoNotice}
        </div>
      )}

      {/* Header Info Banner */}
      <div className="lobby-header">
        <div className="lobby-info">
          <h2 className="glow-text-primary lobby-title">PARTY LOBBY</h2>
          <div className="party-code-badge">
            CODE: <strong className="code-text">{partyCode || partyState?.partyCode}</strong>
          </div>
        </div>

        <div className="lobby-meta">
          <div className="player-count-badge">
            PLAYERS: <strong className="count-text">{activePlayers.length} / {maxPlayers}</strong>
          </div>
          <button 
            className="btn btn-secondary btn-sm copy-link-btn"
            onClick={handleCopyLink}
            id="copy-invite-link-btn"
          >
            {copiedLink ? '✓ COPIED' : 'COPY INVITE LINK'}
          </button>
        </div>
      </div>

      {/* Player Grid (Max 6 Slots) */}
      <div className="players-grid">
        {/* Active Real Player Slots */}
        {activePlayers.map((player) => {
          const isLocal = player.playerId === socket.id;

          return (
            <div 
              key={player.playerId} 
              className={`player-slot active-slot ${isLocal ? 'local-slot' : ''}`}
            >
              <div className="slot-car-icon" style={{ color: player.carColor }}>
                🏎️
              </div>

              <div className="slot-player-info">
                <div className="slot-username-row">
                  <span className="slot-username">{player.username}</span>
                  {isLocal && <span className="you-tag">(YOU)</span>}
                </div>

                <div className="slot-badges">
                  {player.isHost && <span className="badge host-badge">👑 HOST</span>}
                  <span className={`badge ready-badge ${player.ready ? 'is-ready' : 'not-ready'}`}>
                    {player.ready ? '✓ READY' : '⏳ WAITING'}
                  </span>
                </div>
              </div>
            </div>
          );
        })}

        {/* Empty / Waiting Slots */}
        {Array.from({ length: Math.max(0, waitingSlotsCount) }).map((_, idx) => (
          <div key={`empty-${idx}`} className="player-slot empty-slot">
            <div className="empty-slot-icon">➕</div>
            <div className="empty-slot-text">WAITING FOR RACER...</div>
          </div>
        ))}
      </div>

      {/* Lobby Navigation Controls - matching UI_SPEC.md */}
      <div className="lobby-actions">
        <button 
          className={`btn ${isReady ? 'btn-outline' : 'btn-secondary'} btn-lg ready-toggle-btn`}
          onClick={toggleReady}
          id="ready-btn"
        >
          READY
        </button>

        {isHost && (
          <button 
            className="btn btn-primary btn-lg glow-button-primary start-race-btn"
            onClick={handleStartRace}
            id="start-race-btn"
          >
            START RACE
          </button>
        )}

        <button 
          className="btn btn-outline leave-btn"
          onClick={handleLeaveParty}
          id="leave-party-btn"
        >
          LEAVE PARTY
        </button>
      </div>
    </div>
  );
}
