const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const roomManager = require('./roomManager');

const app = express();

const ALLOWED_ORIGIN = process.env.CLIENT_ORIGIN || '*';

app.use(cors({
  origin: ALLOWED_ORIGIN,
  methods: ['GET', 'POST']
}));
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ALLOWED_ORIGIN,
    methods: ['GET', 'POST']
  }
});

app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    activeRooms: roomManager.rooms.size,
    timestamp: new Date().toISOString()
  });
});

const socketRoomMap = new Map();

io.on('connection', (socket) => {
  console.log(`[Socket Connected]: ${socket.id}`);

  // Event: create_room
  socket.on('create_room', (data = {}) => {
    const { username, partyCode: requestedCode } = data;
    const party = roomManager.createRoom(socket.id, username, requestedCode);
    
    socket.join(party.partyCode);
    socketRoomMap.set(socket.id, party.partyCode);

    socket.emit('room_created', {
      partyCode: party.partyCode,
      party
    });
    console.log(`[Room Created]: Code ${party.partyCode} by ${socket.id}`);
  });

  // Event: join_room
  socket.on('join_room', (data = {}) => {
    const { username, partyCode } = data;
    const result = roomManager.joinRoom(socket.id, username, partyCode);

    if (result.error) {
      return socket.emit('error', { message: result.error });
    }

    const { party, player } = result;
    socket.join(party.partyCode);
    socketRoomMap.set(socket.id, party.partyCode);

    socket.emit('room_joined', { partyCode: party.partyCode, party });
    socket.to(party.partyCode).emit('player_joined', { player, party });
    console.log(`[Player Joined]: ${socket.id} (${player.username}) joined ${party.partyCode}`);
  });

  // Event: set_username
  socket.on('set_username', (data = {}) => {
    const { username } = data;
    const partyCode = socketRoomMap.get(socket.id);
    if (!partyCode) return;

    const result = roomManager.setUsername(socket.id, partyCode, username);
    if (result) {
      io.to(partyCode).emit('player_updated', { player: result.player, party: result.party });
    }
  });

  // Event: set_ready
  socket.on('set_ready', (data = {}) => {
    const { ready } = data;
    const partyCode = socketRoomMap.get(socket.id);
    if (!partyCode) return;

    const result = roomManager.setReady(socket.id, partyCode, ready);
    if (result) {
      io.to(partyCode).emit('player_updated', { player: result.player, party: result.party });
    }
  });

  // Event: start_race
  socket.on('start_race', () => {
    const partyCode = socketRoomMap.get(socket.id);
    if (!partyCode) return;

    const result = roomManager.startRace(socket.id, partyCode);
    if (result.error) {
      return socket.emit('error', { message: result.error });
    }

    io.to(partyCode).emit('countdown_started', { party: result.party, countdown: 3 });
    console.log(`[Race Countdown Started]: ${partyCode}`);

    setTimeout(() => {
      if (roomManager.rooms.has(partyCode)) {
        const p = roomManager.rooms.get(partyCode);
        p.status = 'racing';
        io.to(partyCode).emit('race_started', {
          party: p,
          text: p.text,
          startTime: p.startTime
        });
      }
    }, 3600);
  });

  // Event: typing_progress
  socket.on('typing_progress', (data = {}) => {
    const partyCode = socketRoomMap.get(socket.id);
    if (!partyCode) return;

    const result = roomManager.updateProgress(socket.id, partyCode, data);
    if (result) {
      socket.to(partyCode).emit('progress_updated', {
        playerId: socket.id,
        progress: result.player.progress,
        wpm: result.player.wpm,
        accuracy: result.player.accuracy,
        party: result.party
      });
    }
  });

  // Event: finish_race
  socket.on('finish_race', (data = {}) => {
    const partyCode = socketRoomMap.get(socket.id);
    if (!partyCode) return;

    const result = roomManager.finishPlayer(socket.id, partyCode, data);
    if (result) {
      io.to(partyCode).emit('player_finished', {
        playerId: socket.id,
        finishTime: result.player.finishTime,
        rank: result.rank,
        party: result.party
      });

      if (result.allFinished) {
        io.to(partyCode).emit('race_finished', {
          standings: result.standings,
          party: result.party
        });
      }
    }
  });

  // Event: leave_room
  socket.on('leave_room', () => {
    handleDisconnect(socket);
  });

  // Event: disconnect
  socket.on('disconnect', () => {
    handleDisconnect(socket);
  });
});

function handleDisconnect(socket) {
  const partyCode = socketRoomMap.get(socket.id);
  if (partyCode) {
    const result = roomManager.leaveRoom(socket.id, partyCode);
    socket.leave(partyCode);
    socketRoomMap.delete(socket.id);

    if (result && result.party) {
      io.to(partyCode).emit('player_left', { 
        playerId: socket.id, 
        party: result.party,
        hostReassigned: result.party.hostId !== socket.id
      });
    }
    console.log(`[Socket Left/Disconnected]: ${socket.id} from ${partyCode}`);
  }
}

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`[TypingRace Backend Running on Port ${PORT}]`);
});

module.exports = { app, server };
