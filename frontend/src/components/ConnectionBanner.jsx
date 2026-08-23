import React, { useState, useEffect } from 'react';
import { socket } from '../services/socket';
import './ConnectionBanner.css';

export function ConnectionBanner() {
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    const handleConnect = () => setIsConnected(true);
    const handleDisconnect = () => setIsConnected(false);

    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect);
    socket.on('connect_error', handleDisconnect);

    return () => {
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);
      socket.off('connect_error', handleDisconnect);
    };
  }, []);

  if (isConnected) return null;

  return (
    <div className="connection-banner">
      <span>⚠️ Server connection lost. Attempting to reconnect to game server...</span>
      <span className="reconnect-badge">RECONNECTING</span>
    </div>
  );
}
