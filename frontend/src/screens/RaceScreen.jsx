import React, { useState, useEffect, useRef } from 'react';
import { socket } from '../services/socket';
import { calculateTypingStats } from '../utils/typingEngine';
import './RaceScreen.css';

export function RaceScreen({ 
  onNavigate, 
  partyCode = '', 
  username = 'Player',
  onFinishRace
}) {
  const [raceState, setRaceState] = useState('countdown');
  const [countdownNum, setCountdownNum] = useState(3);
  const [targetText, setTargetText] = useState('Type fast. Be the fastest racer on the track!');

  const [typedInput, setTypedInput] = useState('');
  const [totalKeystrokes, setTotalKeystrokes] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [userProgress, setUserProgress] = useState(0);
  const [userFinished, setUserFinished] = useState(false);
  const [userFinishTime, setUserFinishTime] = useState(null);
  const [disconnectNotice, setDisconnectNotice] = useState('');

  // Lock to prevent duplicate finish_race socket emissions
  const finishedRef = useRef(false);
  const inputRef = useRef(null);

  // Countdown timer sequence synchronized to screen transition
  useEffect(() => {
    if (raceState === 'countdown') {
      if (countdownNum > 0) {
        const timer = setTimeout(() => setCountdownNum(c => c - 1), 1000);
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => {
          setRaceState('racing');
          if (inputRef.current) inputRef.current.focus();
        }, 500);
        return () => clearTimeout(timer);
      }
    }
  }, [raceState, countdownNum]);

  // Clock timer increment
  useEffect(() => {
    let interval = null;
    if (raceState === 'racing') {
      interval = setInterval(() => {
        setElapsedSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [raceState]);

  // Socket event listeners
  useEffect(() => {
    const handleRaceStarted = (data) => {
      if (data) {
        if (data.text) setTargetText(data.text);
        if (data.party && data.party.players) {
          setRealPlayers(data.party.players);
        }
      }
    };

    const handleProgressUpdated = (data) => {
      if (data && data.party && data.party.players) {
        setRealPlayers(data.party.players);
      }
    };

    const handlePlayerLeft = (data) => {
      if (data && data.party && data.party.players) {
        setRealPlayers(data.party.players);
        setDisconnectNotice('A player left the race.');
        setTimeout(() => setDisconnectNotice(''), 3000);
      }
    };

    const handlePlayerFinished = (data) => {
      if (data && data.party && data.party.players) {
        setRealPlayers(data.party.players);
      }
    };

    const handleRaceFinished = (data) => {
      if (data) {
        const finalStandings = (data.standings || data.party?.players || []).map((player, index) => ({
          ...player,
          rank: index + 1,
          isWinner: index === 0,
          isLocal: player.playerId === socket.id
        }));
        
        if (onFinishRace) {
          onFinishRace(finalStandings);
        } else {
          onNavigate('results');
        }
      }
    };

    socket.on('race_started', handleRaceStarted);
    socket.on('progress_updated', handleProgressUpdated);
    socket.on('player_left', handlePlayerLeft);
    socket.on('player_finished', handlePlayerFinished);
    socket.on('race_finished', handleRaceFinished);

    return () => {
      socket.off('race_started', handleRaceStarted);
      socket.off('progress_updated', handleProgressUpdated);
      socket.off('player_left', handlePlayerLeft);
      socket.off('player_finished', handlePlayerFinished);
      socket.off('race_finished', handleRaceFinished);
    };
  }, [onNavigate, onFinishRace]);

  // Live real players state from socket
  const [realPlayers, setRealPlayers] = useState([]);

  // Handle local typing input & emit to server safely
  const handleInputChange = (e) => {
    if (raceState !== 'racing' || userFinished || finishedRef.current) return;

    const val = e.target.value;
    setTypedInput(val);
    setTotalKeystrokes(prev => prev + 1);

    const stats = calculateTypingStats(targetText, val, totalKeystrokes + 1, elapsedSeconds);

    setWpm(stats.wpm);
    setAccuracy(stats.accuracy);
    setUserProgress(stats.progressPercent);

    // Emit live progress to server
    socket.emit('typing_progress', {
      progress: stats.progressPercent,
      wpm: stats.wpm,
      accuracy: stats.accuracy
    });

    // Handle completion with single-execution ref guard
    if (stats.isFinished && !finishedRef.current) {
      finishedRef.current = true;
      setUserFinished(true);
      setUserFinishTime(elapsedSeconds);
      socket.emit('finish_race', {
        finishTime: elapsedSeconds,
        wpm: stats.wpm,
        accuracy: stats.accuracy
      });
    }
  };

  // Format real player list for track rendering
  const allRacers = (realPlayers.length > 0 ? realPlayers : [
    { playerId: socket.id, username: `${username} (YOU)`, carColor: '#FFD400', progress: userProgress, wpm, accuracy }
  ]).map(p => {
    const isLocal = p.playerId === socket.id;
    return {
      ...p,
      isLocal,
      username: isLocal ? `${username} (YOU)` : p.username,
      progress: isLocal ? userProgress : (p.progress || 0),
      wpm: isLocal ? wpm : (p.wpm || 0)
    };
  }).sort((a, b) => b.progress - a.progress || b.wpm - a.wpm);

  const localPosition = allRacers.findIndex(r => r.isLocal) + 1;

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins}:${remainder < 10 ? '0' : ''}${remainder}`;
  };

  const renderHighlightedText = () => {
    let firstErrIdx = -1;
    for (let i = 0; i < typedInput.length; i++) {
      if (i >= targetText.length || typedInput[i] !== targetText[i]) {
        firstErrIdx = i;
        break;
      }
    }

    return targetText.split('').map((char, index) => {
      let charClass = 'char-pending';
      if (index < typedInput.length) {
        if (firstErrIdx !== -1 && index >= firstErrIdx) {
          charClass = 'char-incorrect';
        } else {
          charClass = 'char-correct';
        }
      }
      if (index === typedInput.length && raceState === 'racing' && !userFinished) {
        charClass += ' char-current';
      }
      return (
        <span key={index} className={charClass}>
          {char}
        </span>
      );
    });
  };

  return (
    <div className="race-container panel">
      {/* Countdown Overlay */}
      {raceState === 'countdown' && (
        <div className="countdown-overlay">
          <div className="countdown-box">
            <div className="countdown-label">GET READY!</div>
            <div className="countdown-number">
              {countdownNum > 0 ? countdownNum : 'GO!'}
            </div>
          </div>
        </div>
      )}

      {disconnectNotice && (
        <div className="info-text" style={{ padding: '0.5rem 1rem', background: 'rgba(255, 212, 0, 0.1)', border: '1px solid var(--primary-color)', borderRadius: '6px', marginBottom: '1rem', color: 'var(--primary-color)', textAlign: 'center' }}>
          ℹ️ {disconnectNotice}
        </div>
      )}

      {/* Top Stats Banner */}
      <div className="race-stats-banner">
        <div className="stat-card">
          <span className="stat-label">POSITION</span>
          <span className="stat-value text-primary">{localPosition || 1} / {allRacers.length}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">WPM</span>
          <span className="stat-value text-primary">{wpm}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">ACCURACY</span>
          <span className="stat-value text-secondary">{accuracy}%</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">PROGRESS</span>
          <span className="stat-value">{userProgress}%</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">TIME</span>
          <span className="stat-value">{formatTime(elapsedSeconds)}</span>
        </div>
      </div>

      {/* Racing Track Lanes */}
      <div className="racing-track-container">
        {allRacers.map((racer) => (
          <div 
            key={racer.playerId} 
            className={`race-lane ${racer.isLocal ? 'local-lane' : ''}`}
          >
            <div className="lane-info">
              <span className="lane-username">{racer.username}</span>
              <span className="lane-wpm">{racer.wpm} WPM</span>
            </div>

            <div className="lane-track">
              <div 
                className="lane-car" 
                style={{ 
                  left: `${Math.min(92, Math.max(2, racer.progress))}%`,
                  color: racer.carColor 
                }}
              >
                🏎️
              </div>
              <div className="finish-line-strip"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Text Display Panel */}
      <div className="typing-text-display">
        {renderHighlightedText()}
      </div>

      {/* Typing Input */}
      <div className="typing-input-container">
        <input
          ref={inputRef}
          type="text"
          value={typedInput}
          onChange={handleInputChange}
          disabled={raceState !== 'racing' || userFinished}
          placeholder={userFinished ? "RACE FINISHED! 🏆 Waiting for all racers..." : "Type the text above here..."}
          className={`typing-input ${userFinished ? 'input-disabled' : ''}`}
          autoFocus
        />
      </div>

      {/* Finished Banner */}
      {userFinished && (
        <div className="race-finished-actions">
          <div className="finish-banner">
            🎉 YOU FINISHED IN POSITION #{localPosition}! Time: {userFinishTime}s
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            Waiting for other racers to finish to synchronize overall results...
          </p>
        </div>
      )}
    </div>
  );
}
