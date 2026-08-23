import { io } from 'socket.io-client';

// Dynamic backend URL handling for development and production environments
const BACKEND_URL = import.meta.env.VITE_SOCKET_URL || 
  (import.meta.env.MODE === 'production' ? window.location.origin : 'http://localhost:3001');

export const socket = io(BACKEND_URL, {
  autoConnect: true,
  transports: ['websocket', 'polling'],
  reconnection: true,
  reconnectionAttempts: 10,
  reconnectionDelay: 1000
});

socket.on('connect', () => {
  console.log('[Socket Connected to Backend]:', socket.id);
});

socket.on('disconnect', (reason) => {
  console.warn('[Socket Disconnected from Backend]:', reason);
});

socket.on('connect_error', (error) => {
  console.warn('[Socket Connection Error]:', error.message);
});
