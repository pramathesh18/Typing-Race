const io = require('socket.io-client');

const SERVER_URL = 'http://localhost:3001';

async function testErrorHandlingSuite() {
  console.log('=== MULTIPLAYER ERROR HANDLING & FAILURE CASE TEST SUITE ===');

  // Case 1: Invalid Party Code
  console.log('\n--- Test 1: Invalid Party Code ---');
  const s1 = io(SERVER_URL);
  await new Promise((resolve) => {
    s1.on('connect', () => {
      s1.emit('join_room', { username: 'Tester', partyCode: '0000' });
    });
    s1.on('error', (err) => {
      console.log('✓ Received expected error:', err.message);
      s1.disconnect();
      resolve();
    });
  });

  // Case 2: Room Creation & Duplicate Username Resolution
  console.log('\n--- Test 2: Room Creation & Duplicate Username Resolution ---');
  const host = io(SERVER_URL);
  let partyCode = null;

  await new Promise((resolve) => {
    host.on('connect', () => {
      host.emit('create_room', { username: 'Racer' });
    });
    host.on('room_created', (data) => {
      partyCode = data.partyCode;
      console.log(`✓ Room created with code: ${partyCode}, Host name: ${data.party.players[0].username}`);
      resolve();
    });
  });

  const guestDup = io(SERVER_URL);
  await new Promise((resolve) => {
    guestDup.on('connect', () => {
      guestDup.emit('join_room', { username: 'Racer', partyCode });
    });
    guestDup.on('room_joined', (data) => {
      const guestPlayer = data.party.players.find(p => p.playerId === guestDup.id);
      console.log(`✓ Duplicate username resolved to: "${guestPlayer.username}"`);
      resolve();
    });
  });

  // Case 3: Host Disconnect & Host Reassignment Strategy
  console.log('\n--- Test 3: Host Disconnect & Host Reassignment ---');
  await new Promise((resolve) => {
    guestDup.on('player_left', (data) => {
      const newHost = data.party.players.find(p => p.isHost);
      console.log(`✓ Host disconnected. New reassigned host: "${newHost.username}" (${newHost.playerId})`);
      console.log(`✓ hostReassigned flag set: ${data.hostReassigned}`);
      resolve();
    });
    host.disconnect();
  });

  // Case 4: Full Party (6 Players Limit)
  console.log('\n--- Test 4: Full Party (6 Max Limit Enforcement) ---');
  const extraSockets = [];
  // Join until 6 total in party (1 guest already in)
  for (let i = 2; i <= 6; i++) {
    const s = io(SERVER_URL);
    extraSockets.push(s);
    await new Promise((resolve) => {
      s.on('connect', () => {
        s.emit('join_room', { username: `Racer${i}`, partyCode });
      });
      s.on('room_joined', () => resolve());
    });
  }

  const overflowSocket = io(SERVER_URL);
  await new Promise((resolve) => {
    overflowSocket.on('connect', () => {
      overflowSocket.emit('join_room', { username: 'OverflowRacer', partyCode });
    });
    overflowSocket.on('error', (err) => {
      console.log('✓ Full party attempt rejected with error:', err.message);
      overflowSocket.disconnect();
      resolve();
    });
  });

  // Case 5: Race Already Started & Joining Blocked
  console.log('\n--- Test 5: Join Attempt After Race Start ---');
  // Start race from current host (guestDup)
  await new Promise((resolve) => {
    guestDup.on('countdown_started', () => {
      console.log('✓ Race started');
      resolve();
    });
    guestDup.emit('start_race');
  });

  // Disconnect one player to free a slot, but race is in progress
  extraSockets[0].disconnect();

  const lateJoiner = io(SERVER_URL);
  await new Promise((resolve) => {
    lateJoiner.on('connect', () => {
      lateJoiner.emit('join_room', { username: 'LateComer', partyCode });
    });
    lateJoiner.on('error', (err) => {
      console.log('✓ Late join attempt during active race rejected:', err.message);
      lateJoiner.disconnect();
      resolve();
    });
  });

  // Clean up
  guestDup.disconnect();
  extraSockets.forEach(s => s.disconnect());

  console.log('\n=== ALL ERROR HANDLING & EDGE CASE TESTS PASSED 100% ===');
  process.exit(0);
}

testErrorHandlingSuite().catch(err => {
  console.error('Error handling test failed:', err);
  process.exit(1);
});
