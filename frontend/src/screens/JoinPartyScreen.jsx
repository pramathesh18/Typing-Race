import React, { useState } from 'react';
import { socket } from '../services/socket';
import './JoinPartyScreen.css';

export function JoinPartyScreen({ onNavigate, setPartyCodeState, setPartyDataState, initialCode = '', username }) {
  const [partyCode, setPartyCode] = useState(initialCode);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const val = e.target.value.replace(/\D/g, '');
    if (val.length <= 4) {
      setPartyCode(val);
      if (errorMsg) setErrorMsg('');
    }
  };

  const handleJoin = (e) => {
    if (e) e.preventDefault();
    if (partyCode.length !== 4) {
      setErrorMsg('Party code must be exactly 4 digits.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    const onRoomJoined = ({ partyCode: joinedCode, party }) => {
      socket.off('room_joined', onRoomJoined);
      socket.off('error', onError);

      if (setPartyCodeState) {
        setPartyCodeState(joinedCode);
      }
      if (setPartyDataState) {
        setPartyDataState(party);
      }
      onNavigate('lobby');
    };

    const onError = ({ message }) => {
      socket.off('room_joined', onRoomJoined);
      socket.off('error', onError);
      setLoading(false);
      setErrorMsg(message || 'Could not join room');
    };

    socket.on('room_joined', onRoomJoined);
    socket.on('error', onError);

    socket.emit('join_room', { username, partyCode });
  };

  return (
    <div className="join-party-container panel">
      <h2 className="glow-text-secondary title">JOIN PARTY</h2>
      <p className="subtitle">
        Enter the 4-digit code provided by your party host.
      </p>

      <form onSubmit={handleJoin} className="join-form">
        <div className="input-group">
          <label className="input-label" htmlFor="party-code-input">
            PARTY CODE
          </label>
          <input
            id="party-code-input"
            type="text"
            maxLength={4}
            placeholder="0000"
            value={partyCode}
            onChange={handleInputChange}
            className={`party-code-input ${errorMsg ? 'input-error' : ''}`}
            autoFocus
          />
          {errorMsg && <div className="error-text">{errorMsg}</div>}
        </div>

        <div className="action-buttons">
          <button 
            type="submit"
            className="btn btn-secondary btn-lg glow-button-secondary" 
            disabled={loading}
            id="join-party-btn"
          >
            {loading ? 'JOINING...' : 'JOIN PARTY'}
          </button>
          <button 
            type="button"
            className="btn btn-outline" 
            onClick={() => onNavigate('landing')} 
            id="back-btn"
          >
            BACK
          </button>
        </div>
      </form>
    </div>
  );
}
