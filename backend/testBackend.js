const io = require('socket.io-client');

const SERVER_URL = 'http://localhost:3001';

async function runTests() {
  console.log('--- Starting Backend Integration Verification ---');

  // Test 1: Create room
  const socket1 = io(SERVER_URL);
  let createdPartyCode = null;

  await new Promise((resolve) => {
    socket1.on('connect', () => {
      console.log('✓ Socket 1 connected');
      socket1.emit('create_room', { username: 'HostPlayer' });
    });

    socket1.on('room_created', (data) => {
      console.log('✓ room_created received:', data.partyCode, 'Host:', data.party.hostId);
      createdPartyCode = data.partyCode;
      resolve();
    });
  });

  // Test 2: Join room
  const socket2 = io(SERVER_URL);
  await new Promise((resolve) => {
    socket2.on('connect', () => {
      socket2.emit('join_room', { username: 'GuestPlayer1', partyCode: createdPartyCode });
    });

    socket2.on('room_joined', (data) => {
      console.log('✓ room_joined received for Guest1:', data.party.players.length, 'players in room');
      resolve();
    });
  });

  // Test 3: Join 4 more players (reaching 6 max)
  const sockets = [];
  for (let i = 2; i <= 5; i++) {
    const s = io(SERVER_URL);
    sockets.push(s);
    await new Promise((resolve) => {
      s.on('connect', () => {
        s.emit('join_room', { username: `GuestPlayer${i}`, partyCode: createdPartyCode });
      });
      s.on('room_joined', () => resolve());
    });
  }
  console.log('✓ Successfully joined 6 players in total');

  // Test 4: 7th player should fail (Max 6 limit)
  const socket7 = io(SERVER_URL);
  await new Promise((resolve) => {
    socket7.on('connect', () => {
      socket7.emit('join_room', { username: 'GuestPlayer7', partyCode: createdPartyCode });
    });
    socket7.on('error', (err) => {
      console.log('✓ Error received correctly for 7th player limit:', err.message);
      socket7.disconnect();
      resolve();
    });
  });

  // Test 5: Invalid room code
  const socketFail = io(SERVER_URL);
  await new Promise((resolve) => {
    socketFail.on('connect', () => {
      socketFail.emit('join_room', { username: 'BadRacer', partyCode: '9999' });
    });
    socketFail.on('error', (err) => {
      console.log('✓ Error received correctly for invalid room code:', err.message);
      socketFail.disconnect();
      resolve();
    });
  });

  // Test 6: Host start race
  await new Promise((resolve) => {
    socket1.on('countdown_started', (data) => {
      console.log('✓ countdown_started received by host:', data.countdown);
      resolve();
    });
    socket1.emit('start_race');
  });

  // Clean up
  socket1.disconnect();
  socket2.disconnect();
  sockets.forEach(s => s.disconnect());

  console.log('--- ALL BACKEND TESTS PASSED SUCCESSFULLY ---');
  process.exit(0);
}

runTests().catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});
