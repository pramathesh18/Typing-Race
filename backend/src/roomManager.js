const CAR_COLORS = [
  '#FFD400', // Electric Yellow
  '#9B4DFF', // Neon Purple
  '#00F0FF', // Cyber Cyan
  '#39FF14', // Electric Lime
  '#FF007F', // Hot Pink
  '#FF5500'  // Blaze Orange
];

const SAMPLE_TEXTS = [
  "The quick brown fox jumps over the lazy dog. Speed and accuracy determine who crosses the finish line first in this high-adrenaline typing competition.",
  "Engine revving at the starting grid, waiting for the green signal. Precise keystrokes propel your vehicle forward at maximum velocity.",
  "Victory favors the typist who maintains laser focus under pressure. Fast fingers and zero mistakes create unstoppable race champions."
];

// Temporary in-memory rooms data structure: Map<partyCode, Party>
const rooms = new Map();

function generatePartyCode() {
  let code;
  do {
    code = Math.floor(1000 + Math.random() * 9000).toString();
  } while (rooms.has(code));
  return code;
}

function validateUsername(username) {
  if (!username || typeof username !== 'string') return null;
  const trimmed = username.trim();
  if (trimmed.length === 0) return null;
  return trimmed.slice(0, 16);
}

function sanitizeNumber(val, defaultVal = 0, maxVal = 300) {
  const num = Number(val);
  if (!Number.isFinite(num) || num < 0) return defaultVal;
  return Math.min(num, maxVal);
}

function createRoom(hostSocketId, username, requestedCode) {
  const validName = validateUsername(username) || 'Racer1';
  
  let partyCode = requestedCode;
  if (!partyCode || partyCode.length !== 4 || !/^\d{4}$/.test(partyCode) || rooms.has(partyCode)) {
    partyCode = generatePartyCode();
  }

  const hostPlayer = {
    playerId: hostSocketId,
    username: validName,
    carColor: CAR_COLORS[0],
    ready: false,
    progress: 0,
    wpm: 0,
    accuracy: 100,
    finished: false,
    finishTime: null,
    isHost: true
  };

  const party = {
    partyCode,
    hostId: hostSocketId,
    players: [hostPlayer],
    maxPlayers: 6,
    status: 'waiting',
    text: SAMPLE_TEXTS[Math.floor(Math.random() * SAMPLE_TEXTS.length)],
    startTime: null
  };

  rooms.set(partyCode, party);
  return party;
}

function joinRoom(socketId, username, partyCode) {
  const party = rooms.get(partyCode);
  if (!party) {
    return { error: 'Room no longer exists or party code is invalid.' };
  }

  if (party.players.length >= party.maxPlayers) {
    return { error: 'Party is full (Maximum 6 players allowed).' };
  }

  if (party.status === 'racing' || party.status === 'countdown') {
    return { error: 'Race is already in progress. Please wait for the next race.' };
  }

  const validName = validateUsername(username) || `Racer${party.players.length + 1}`;

  let finalUsername = validName;
  let dupCounter = 1;
  while (party.players.some(p => p.username.toLowerCase() === finalUsername.toLowerCase())) {
    finalUsername = `${validName}_${dupCounter++}`;
  }

  const usedColors = new Set(party.players.map(p => p.carColor));
  const availableColor = CAR_COLORS.find(c => !usedColors.has(c)) || CAR_COLORS[party.players.length % CAR_COLORS.length];

  const newPlayer = {
    playerId: socketId,
    username: finalUsername,
    carColor: availableColor,
    ready: false,
    progress: 0,
    wpm: 0,
    accuracy: 100,
    finished: false,
    finishTime: null,
    isHost: false
  };

  party.players.push(newPlayer);
  return { party, player: newPlayer };
}

function leaveRoom(socketId, partyCode) {
  const party = rooms.get(partyCode);
  if (!party) return null;

  const leavingPlayer = party.players.find(p => p.playerId === socketId);
  party.players = party.players.filter(p => p.playerId !== socketId);

  if (party.players.length === 0) {
    rooms.delete(partyCode);
    return null;
  }

  if (party.hostId === socketId) {
    party.hostId = party.players[0].playerId;
    party.players[0].isHost = true;
  }

  return { party, leftPlayer: leavingPlayer };
}

function setUsername(socketId, partyCode, newUsername) {
  const party = rooms.get(partyCode);
  if (!party) return null;

  const validName = validateUsername(newUsername);
  if (!validName) return null;

  const player = party.players.find(p => p.playerId === socketId);
  if (player) {
    let finalUsername = validName;
    let dupCounter = 1;
    while (party.players.some(p => p.playerId !== socketId && p.username.toLowerCase() === finalUsername.toLowerCase())) {
      finalUsername = `${validName}_${dupCounter++}`;
    }
    player.username = finalUsername;
  }
  return { party, player };
}

function setReady(socketId, partyCode, isReady) {
  const party = rooms.get(partyCode);
  if (!party) return null;

  const player = party.players.find(p => p.playerId === socketId);
  if (player) {
    player.ready = Boolean(isReady);
  }
  return { party, player };
}

function startRace(socketId, partyCode) {
  const party = rooms.get(partyCode);
  if (!party) return { error: 'Room does not exist' };

  if (party.hostId !== socketId) {
    return { error: 'Only the party host can start the race.' };
  }

  party.status = 'countdown';
  party.startTime = Date.now();
  party.text = SAMPLE_TEXTS[Math.floor(Math.random() * SAMPLE_TEXTS.length)];
  
  party.players.forEach(p => {
    p.progress = 0;
    p.wpm = 0;
    p.accuracy = 100;
    p.finished = false;
    p.finishTime = null;
  });

  return { party };
}

function updateProgress(socketId, partyCode, { progress, wpm, accuracy }) {
  const party = rooms.get(partyCode);
  if (!party) return null;

  const player = party.players.find(p => p.playerId === socketId);
  if (player) {
    player.progress = sanitizeNumber(progress, 0, 100);
    player.wpm = sanitizeNumber(wpm, 0, 300);
    player.accuracy = sanitizeNumber(accuracy, 100, 100);
  }
  return { party, player };
}

function finishPlayer(socketId, partyCode, { finishTime, wpm, accuracy }) {
  const party = rooms.get(partyCode);
  if (!party) return null;

  const player = party.players.find(p => p.playerId === socketId);
  if (player && !player.finished) {
    player.finished = true;
    player.finishTime = sanitizeNumber(finishTime, 0, 600);
    player.wpm = sanitizeNumber(wpm, 0, 300);
    player.accuracy = sanitizeNumber(accuracy, 100, 100);
    player.progress = 100;
  }

  const finishedPlayers = party.players.filter(p => p.finished);
  const rank = finishedPlayers.length;

  const allFinished = party.players.every(p => p.finished);
  if (allFinished) {
    party.status = 'finished';
  }

  const standings = [...party.players].sort((a, b) => {
    if (a.finished && !b.finished) return -1;
    if (!a.finished && b.finished) return 1;
    if (a.finished && b.finished) return a.finishTime - b.finishTime;
    if (b.progress !== a.progress) return b.progress - a.progress;
    return b.wpm - a.wpm;
  });

  return { party, player, rank, allFinished, standings };
}

module.exports = {
  rooms,
  generatePartyCode,
  createRoom,
  joinRoom,
  leaveRoom,
  setUsername,
  setReady,
  startRace,
  updateProgress,
  finishPlayer,
  validateUsername
};
