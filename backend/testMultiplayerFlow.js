const io = require('socket.io-client');

const SERVER_URL = 'http://localhost:3001';

async function testFullMultiplayerFlow() {
  console.log('=== FULL REAL-TIME MULTIPLAYER INTEGRATION TEST ===');

  // 1. Create Room (Player 1 / Host)
  const p1 = io(SERVER_URL);
  let roomCode = null;

  await new Promise((resolve) => {
    p1.on('connect', () => {
      console.log('✓ Player 1 connected');
      p1.emit('create_room', { username: 'HostRacer' });
    });
    p1.on('room_created', (data) => {
      roomCode = data.partyCode;
      console.log(`✓ Room Created: ${roomCode} (Host: ${data.party.hostId})`);
      resolve();
    });
  });

  // 2. Join Room (Player 2)
  const p2 = io(SERVER_URL);
  await new Promise((resolve) => {
    p2.on('connect', () => {
      console.log('✓ Player 2 connected');
      p2.emit('join_room', { username: 'SpeedRacer', partyCode: roomCode });
    });
    p2.on('room_joined', (data) => {
      console.log(`✓ Player 2 Joined Room ${roomCode}. Players: ${data.party.players.length}`);
      resolve();
    });
  });

  // 3. Ready up
  await new Promise((resolve) => {
    p1.on('player_updated', (data) => {
      if (data.player.username === 'SpeedRacer' && data.player.ready) {
        console.log('✓ Player 2 ready state synchronized to Host');
        resolve();
      }
    });
    p2.emit('set_ready', { ready: true });
  });

  // 4. Host starts race -> countdown -> race_started
  let raceText = '';
  await new Promise((resolve) => {
    p2.on('countdown_started', (data) => {
      console.log('✓ countdown_started broadcasted to all players');
    });

    p2.on('race_started', (data) => {
      raceText = data.text;
      console.log(`✓ race_started broadcasted! Target text: "${raceText.substring(0, 30)}..."`);
      resolve();
    });

    p1.emit('start_race');
  });

  // 5. Simultaneous typing progress updates
  await new Promise((resolve) => {
    p1.on('progress_updated', (data) => {
      if (data.playerId === p2.id) {
        console.log(`✓ Live typing progress synced: Player 2 is at ${data.progress}% (${data.wpm} WPM)`);
        resolve();
      }
    });

    p2.emit('typing_progress', { progress: 45, wpm: 75, accuracy: 98 });
  });

  // 6. Finish race validation
  await new Promise((resolve) => {
    let p1Done = false;
    let p2Done = false;

    p1.on('player_finished', (data) => {
      console.log(`✓ player_finished event: ${data.playerId} finished in rank #${data.rank}`);
      if (data.playerId === p1.id) p1Done = true;
      if (data.playerId === p2.id) p2Done = true;
    });

    p1.on('race_finished', (data) => {
      console.log(`✓ race_finished overall standings synchronized! Winner: ${data.standings[0].username}`);
      resolve();
    });

    // P1 finishes first, P2 finishes second
    p1.emit('finish_race', { finishTime: 18, wpm: 88, accuracy: 99 });
    setTimeout(() => {
      p2.emit('finish_race', { finishTime: 22, wpm: 74, accuracy: 96 });
    }, 500);
  });

  // Cleanup
  p1.disconnect();
  p2.disconnect();

  console.log('=== MULTIPLAYER REAL-TIME TESTS PASSED 100% ===');
  process.exit(0);
}

testFullMultiplayerFlow().catch(err => {
  console.error('Integration test failed:', err);
  process.exit(1);
});
