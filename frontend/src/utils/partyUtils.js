const ADJECTIVES = [
  'Turbo', 'Neon', 'Swift', 'Apex', 'Nitro', 'Cyber', 'Hyper', 'Velocity',
  'Quantum', 'Sonic', 'Viper', 'Phantom', 'Blaze', 'Cosmic', 'Stealth', 'Drift'
];

const NOUNS = [
  'Racer', 'Typer', 'Driver', 'Runner', 'Sprinter', 'Pilot', 'Cruiser', 'Speedster',
  'Keymaster', 'Drifter', 'Dash', 'Shift', 'Spark', 'Pulse', 'Vector', 'Streak'
];

export function generateRandomUsername() {
  const adj = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
  const noun = NOUNS[Math.floor(Math.random() * NOUNS.length)];
  const num = Math.floor(100 + Math.random() * 900);
  return `${adj}${noun}${num}`;
}

export function generatePartyCode() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}
