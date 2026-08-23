export const CAR_COLORS = [
  { name: 'Yellow Nitro', hex: '#FFD400' },
  { name: 'Neon Purple', hex: '#9B4DFF' },
  { name: 'Cyber Cyan', hex: '#00F0FF' },
  { name: 'Electric Lime', hex: '#39FF14' },
  { name: 'Hot Pink', hex: '#FF007F' },
  { name: 'Blaze Orange', hex: '#FF5500' }
];

export const MOCK_FAKE_PLAYERS = [
  {
    playerId: 'fake-p2',
    username: 'CyberDrifter',
    carColor: '#9B4DFF',
    ready: true,
    progress: 0,
    wpm: 0,
    accuracy: 100,
    finished: false,
    finishTime: null,
    isHost: false
  },
  {
    playerId: 'fake-p3',
    username: 'ApexRacer',
    carColor: '#00F0FF',
    ready: true,
    progress: 0,
    wpm: 0,
    accuracy: 100,
    finished: false,
    finishTime: null,
    isHost: false
  },
  {
    playerId: 'fake-p4',
    username: 'SonicDash',
    carColor: '#39FF14',
    ready: false,
    progress: 0,
    wpm: 0,
    accuracy: 100,
    finished: false,
    finishTime: null,
    isHost: false
  },
  {
    playerId: 'fake-p5',
    username: 'ViperShift',
    carColor: '#FF007F',
    ready: true,
    progress: 0,
    wpm: 0,
    accuracy: 100,
    finished: false,
    finishTime: null,
    isHost: false
  },
  {
    playerId: 'fake-p6',
    username: 'NitroStreak',
    carColor: '#FF5500',
    ready: false,
    progress: 0,
    wpm: 0,
    accuracy: 100,
    finished: false,
    finishTime: null,
    isHost: false
  }
];

export function createLocalPlayer({ username, isHost = true, carColor = '#FFD400' }) {
  return {
    playerId: 'local-user-id',
    username: username || 'Player',
    carColor: carColor,
    ready: false,
    progress: 0,
    wpm: 0,
    accuracy: 100,
    finished: false,
    finishTime: null,
    isHost: isHost
  };
}
