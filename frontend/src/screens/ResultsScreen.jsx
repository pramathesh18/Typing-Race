import React, { useEffect } from 'react';
import { socket } from '../services/socket';
import './ResultsScreen.css';

export function ResultsScreen({ 
  onNavigate, 
  partyCode = '', 
  username = 'Player',
  raceResults = null,
  onRaceAgain
}) {
  // Socket listener to restart race together if host clicks race again / starts countdown
  useEffect(() => {
    const handleCountdownStarted = () => {
      if (onRaceAgain) {
        onRaceAgain();
      } else {
        onNavigate('race');
      }
    };

    socket.on('countdown_started', handleCountdownStarted);
    return () => {
      socket.off('countdown_started', handleCountdownStarted);
    };
  }, [onNavigate, onRaceAgain]);

  const results = raceResults || [
    { rank: 1, username: `${username} (YOU)`, carColor: '#FFD400', wpm: 84, accuracy: 98, finishTime: 24, isWinner: true, isLocal: true },
    { rank: 2, username: 'ApexRacer', carColor: '#00F0FF', wpm: 72, accuracy: 95, finishTime: 28, isWinner: false, isLocal: false }
  ];

  const handleRaceAgain = () => {
    socket.emit('start_race');
    if (onRaceAgain) {
      onRaceAgain();
    } else {
      onNavigate('race');
    }
  };

  const handleLeaveParty = () => {
    socket.emit('leave_room');
    onNavigate('landing');
  };

  return (
    <div className="results-container panel">
      {/* Header Banner */}
      <div className="results-header">
        <h2 className="glow-text-primary results-title">RACE RESULTS</h2>
        <div className="party-badge">
          PARTY CODE: <strong className="code-highlight">{partyCode}</strong>
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="leaderboard-card">
        <div className="leaderboard-table">
          <div className="table-header">
            <span className="col-rank">POS</span>
            <span className="col-player">RACER</span>
            <span className="col-stat">WPM</span>
            <span className="col-stat">ACCURACY</span>
            <span className="col-stat">TIME</span>
          </div>

          <div className="table-body">
            {results.map((racer, idx) => {
              const rank = racer.rank || idx + 1;
              const isWinner = rank === 1;
              const isLocal = racer.playerId === socket.id || racer.isLocal;

              return (
                <div 
                  key={racer.playerId || idx} 
                  className={`result-row ${isWinner ? 'winner-row' : ''} ${isLocal ? 'local-row' : ''}`}
                >
                  <div className="col-rank">
                    <span className={`rank-badge rank-${rank}`}>
                      {rank === 1 ? '👑 #1' : `#${rank}`}
                    </span>
                  </div>

                  <div className="col-player">
                    <span className="racer-car" style={{ color: racer.carColor }}>🏎️</span>
                    <span className="racer-name">{racer.username}</span>
                  </div>

                  <div className="col-stat wpm-val">
                    <strong>{racer.wpm}</strong> <span className="stat-unit">WPM</span>
                  </div>

                  <div className="col-stat accuracy-val">
                    <strong>{racer.accuracy}%</strong>
                  </div>

                  <div className="col-stat time-val">
                    <strong>{racer.finishTime ? `${racer.finishTime}s` : '--'}</strong>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="results-actions">
        <button 
          className="btn btn-primary btn-lg glow-button-primary"
          onClick={handleRaceAgain}
          id="race-again-btn"
        >
          RACE AGAIN
        </button>
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
