import React, { useState } from 'react';
import { socket } from '../services/socket';
import { generatePartyCode } from '../utils/partyUtils';
import './CreatePartyScreen.css';

export function CreatePartyScreen({ onNavigate, setPartyCodeState, setPartyDataState, username }) {
  const [partyCode, setPartyCode] = useState(() => generatePartyCode());
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const inviteUrl = `${window.location.origin}/?party=${partyCode}`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(partyCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(inviteUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCreate = () => {
    setLoading(true);
    setError('');

    const onRoomCreated = ({ partyCode: serverCode, party }) => {
      socket.off('room_created', onRoomCreated);
      socket.off('error', onError);

      if (setPartyCodeState) {
        setPartyCodeState(serverCode);
      }
      if (setPartyDataState) {
        setPartyDataState(party);
      }
      onNavigate('lobby');
    };

    const onError = ({ message }) => {
      socket.off('room_created', onRoomCreated);
      socket.off('error', onError);
      setLoading(false);
      setError(message || 'Failed to create party room');
    };

    socket.on('room_created', onRoomCreated);
    socket.on('error', onError);

    socket.emit('create_room', { username, partyCode });
  };

  return (
    <div className="create-party-container panel">
      <h2 className="glow-text-primary title">CREATE PARTY</h2>
      <p className="subtitle">
        Host a room and invite up to 5 friends to compete live!
      </p>

      {error && <div className="error-text" style={{ marginBottom: '1rem', color: '#ff4d4d' }}>{error}</div>}

      {/* Party Code Display Box */}
      <div className="party-code-box">
        <span className="code-label">PARTY CODE</span>
        <div className="code-value">{partyCode}</div>
        <button 
          className="btn btn-outline btn-sm copy-btn"
          onClick={handleCopyCode}
          id="copy-code-btn"
        >
          {copiedCode ? '✓ COPIED' : 'COPY CODE'}
        </button>
      </div>

      {/* Invite Link Box */}
      <div className="invite-link-box">
        <span className="link-label">SHAREABLE INVITE LINK</span>
        <div className="link-value-container">
          <input 
            type="text" 
            readOnly 
            value={inviteUrl} 
            className="link-input"
          />
          <button 
            className="btn btn-secondary btn-sm"
            onClick={handleCopyLink}
            id="copy-invite-link-btn"
          >
            {copiedLink ? '✓ COPIED' : 'COPY INVITE LINK'}
          </button>
        </div>
      </div>

      {/* Lobby Controls Buttons - exact match to UI_SPEC.md */}
      <div className="action-buttons">
        <button 
          className="btn btn-primary btn-lg glow-button-primary"
          onClick={handleCreate}
          disabled={loading}
          id="create-btn"
        >
          {loading ? 'CREATING...' : 'CREATE'}
        </button>
        <button 
          className="btn btn-outline"
          onClick={() => onNavigate('landing')}
          id="leave-party-btn"
        >
          LEAVE PARTY
        </button>
      </div>
    </div>
  );
}
