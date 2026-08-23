const CAR_COLORS = [
  '#30AFFF', // Ocean Blue
  '#92EEFF', // Bright Cyan
  '#1D9BEF', // Deep Blue
  '#22C55E', // Mint Green
  '#0284C7', // Sky Blue
  '#0EA5E9'  // Cerulean Blue
];

const SAMPLE_TEXTS = [
  // 1-10: Inspirational / Motivational Quotes & Speeches
  "The only way to do great work is to love what you do. If you have not found it yet, keep looking and do not settle. As with all matters of the heart, you will know when you find it.",
  "Your time is limited, so do not waste it living someone else's life. Do not be trapped by dogma, which is living with the results of other people's thinking. Have the courage to follow your heart.",
  "Success is not final, failure is not fatal: it is the courage to continue that counts. It is during our darkest moments that we must focus to see the light.",
  "Believe you can and you are halfway there. What lies behind us and what lies before us are tiny matters compared to what lies within us.",
  "Do not go where the path may lead, go instead where there is no path and leave a trail. Life is either a daring adventure or nothing at all.",
  "In the middle of every difficulty lies opportunity. Great things are done by a series of small things brought together over time.",
  "The future belongs to those who believe in the beauty of their dreams. It does not matter how slowly you go as long as you do not stop.",
  "Hardships often prepare ordinary people for an extraordinary destiny. You are never too old to set another goal or to dream a new dream.",
  "It always seems impossible until it is done. Keep your face always toward the sunshine and shadows will fall behind you.",
  "You do not have to be great to start, but you have to start to be great. Small daily improvements over time lead to stunning results.",

  // 11-20: Famous Poems & Literary Passages
  "Two roads diverged in a yellow wood, and sorry I could not travel both and be one traveler, long I stood and looked down one as far as I could to where it bent in the undergrowth.",
  "Out of the night that covers me, black as the pit from pole to pole, I thank whatever gods may be for my unconquerable soul. I am the master of my fate, I am the captain of my soul.",
  "Do not go gentle into that good night, old age should burn and rave at close of day. Rage, rage against the dying of the light.",
  "Hope is the thing with feathers that perches in the soul, and sings the tune without the words, and never stops at all.",
  "Tell me not, in mournful numbers, life is but an empty dream! For the soul is dead that slumbers, and things are not what they seem.",
  "I wandered lonely as a cloud that floats on high o'er vales and hills, when all at once I saw a crowd, a host, of golden daffodils.",
  "To be, or not to be, that is the question: whether 'tis nobler in the mind to suffer the slings and arrows of outrageous fortune, or to take arms against a sea of troubles.",
  "Shall I compare thee to a summer's day? Thou art more lovely and more temperate. Rough winds do shake the darling buds of May, and summer's lease hath all too short a date.",
  "All that is gold does not glitter, not all those who wander are lost; the old that is strong does not wither, deep roots are not reached by the frost.",
  "The woods are lovely, dark and deep, but I have promises to keep, and miles to go before I sleep, and miles to go before I sleep.",

  // 21-30: Well-Known Funny Quotes & Witty Observations
  "I am so clever that sometimes I do not understand a single word of what I am saying. Always forgive your enemies; nothing annoys them so much.",
  "Behind every great man is a woman rolling her eyes. I find television very educating. Every time somebody turns on the set, I go into the other room and read a book.",
  "I can resist everything except temptation. People say nothing is impossible, but I do nothing every day. The best way to cheer yourself up is to try to cheer somebody else up.",
  "I always wanted to be somebody, but now I realize I should have been more specific. Knowledge is knowing a tomato is a fruit; wisdom is not putting it in a fruit salad.",
  "My brain has too many tabs open. Four out of five people who take a bath agree that the fifth person is probably taking a shower instead.",
  "I am not lazy, I am just on energy-saving mode. I told my doctor that I broke my arm in two places. He told me to stop going to those places.",
  "Change is not a bolt of lightning, it is a gradual slope. If at first you do not succeed, then skydiving definitely is not for you.",
  "Light travels faster than sound. This is why some people appear bright until you hear them speak. Never put off till tomorrow what may be done day after tomorrow.",
  "I am on a seafood diet. I see food and I eat it. I used to think I was indecisive, but now I am not so sure about that.",
  "Before you judge a man, walk a mile in his shoes. After that who cares? He's a mile away and you've got his shoes!",

  // 31-40: Famous Wisdom & Philosophy
  "Knowing yourself is the beginning of all wisdom. It is the mark of an educated mind to be able to entertain a thought without accepting it.",
  "We are what we repeatedly do. Excellence, then, is not an act, but a habit. Quality is not an act, it is a habit.",
  "The journey of a thousand miles begins with a single step. He who knows others is wise; he who knows himself is enlightened.",
  "Turn your wounds into wisdom. The greatest glory in living lies not in never falling, but in rising every time we fall.",
  "Life is available only in the present moment. If you abandon the present moment, you cannot live the moments of your life deeply.",
  "The unexamined life is not worth living. Beware the barrenness of a busy life and cultivate quiet reflection whenever you can.",
  "Happiness depends upon ourselves. You will never be happy if you continue to search for what happiness consists of. You will never live if you are looking for the meaning of life.",
  "The only true wisdom is in knowing you know nothing. Wonder is the beginning of wisdom and the gateway to discovery.",
  "Yesterday is history, tomorrow is a mystery, today is a gift of God, which is why we call it the present.",
  "Life is 10% what happens to you and 90% how you react to it. Mindset is everything when facing life's unpredictable moments.",

  // 41-50: Inspiring Classic & Modern Stories / Thoughts
  "Somewhere, something incredible is waiting to be known. We are a way for the cosmos to know itself, drifting through an ocean of stars.",
  "Look up at the stars and not down at your feet. Try to make sense of what you see, and wonder about what makes the universe exist. Be curious.",
  "The more that you read, the more things you will know. The more that you learn, the more places you'll go. You have brains in your head and feet in your shoes.",
  "It is our choices that show what we truly are, far more than our abilities. It takes a great deal of bravery to stand up to our enemies, but just as much to stand up to our friends.",
  "No act of kindness, no matter how small, is ever wasted. A warm smile is the universal language of human kindness and connection.",
  "Spread love everywhere you go. Let no one ever come to you without leaving happier. Joy is a net of love by which you can catch souls.",
  "Everything you can imagine is real. Art washes away from the soul the dust of everyday life and brings color to the world.",
  "Laughter is timeless, imagination has no age, and dreams are forever. If you can dream it, you can do it.",
  "What you do makes a difference, and you have to decide what kind of difference you want to make in this world.",
  "Act as if what you do makes a difference. It does. Give light and people will find the way through the darkest nights.",

  // 51-60: Additional Motivational & Courage Quotes
  "Courage is not the absence of fear, but rather the judgment that something else is more important than fear. The brave may not live forever, but the cautious do not live at all.",
  "The best time to plant a tree was twenty years ago. The second best time is now. Keep planting seeds of effort every single day.",
  "Do what you can, with what you have, where you are. Big dreams require small consistent actions that stack up into monumental achievements.",
  "You miss one hundred percent of the shots you do not take. Stand up, take the leap, and let your actions speak louder than your doubts.",
  "Opportunity does not knock, it presents itself when you beat down the door. Hard work beats talent when talent fails to work hard.",
  "Never limit yourself because of others' limited imagination. Never limit others because of your own limited imagination. Reach beyond boundaries.",
  "The secret of getting ahead is getting started. Break your complex daunting tasks into small manageable actions and begin right now.",
  "Write it on your heart that every day is the best day in the year. He is rich who owns the day, and no one owns the day who allows it to be invaded.",
  "What lies behind us and what lies before us are tiny matters compared to what lies within us. Tap into your inner strength daily.",
  "Doubt kills more dreams than failure ever will. Believe in your capacity to adapt, learn, grow, and conquer whatever obstacle stands in your path.",

  // 61-70: Additional Iconic Poetry & Classic Verses
  "She walks in beauty, like the night of cloudless climes and starry skies; and all that's best of dark and bright meet in her aspect and her eyes.",
  "If you can keep your head when all about you are losing theirs and blaming it on you, yours is the Earth and everything that's in it.",
  "Tyger Tyger, burning bright, in the forests of the night; what immortal hand or eye could frame thy fearful symmetry?",
  "I celebrate myself, and sing myself, and what I assume you shall assume, for every atom belonging to me as good belongs to you.",
  "Water, water, everywhere, and all the boards did shrink; water, water, everywhere, nor any drop to drink.",
  "Because I could not stop for Death, he kindly stopped for me; the carriage held but just ourselves and Immortality.",
  "Whose woods these are I think I know. His house is in the village though; he will not see me stopping here to watch his woods fill up with snow.",
  "In Xanadu did Kubla Khan a stately pleasure-dome decree: where Alph, the sacred river, ran through caverns measureless to man down to a sunless sea.",
  "Come live with me and be my love, and we will all the pleasures prove that valleys, groves, hills, and fields, woods, or steepy mountain yields.",
  "Bright star, would I were stedfast as thou art, not in lone splendour hung aloft the night and watching, with eternal lids apart, like nature's patient, sleepless Eremite.",

  // 71-80: Additional Witty & Humorous Lines
  "My room is not messy, it is an custom obstacle course designed to keep me fit. If you think nobody cares if you are alive, try missing a couple of payments.",
  "I am returning to work today after a long rest, and my computer password has officially escaped my memory. Technology is great until it asks for authentication.",
  "I told my wife she was drawing her eyebrows too high. She looked surprised. Life is short, smile while you still have all your teeth.",
  "My bank account is a constant reminder that I need to stop buying things I do not need with money I do not have to impress people I do not like.",
  "I am not arguing, I am simply explaining why I am right. People who think they know everything are a great annoyance to those of us who do.",
  "I don't need a hair stylist, my pillow gives me a new hairstyle every morning. Creativity is intelligence having fun in a messy room.",
  "If electricity comes from electrons, does morality come from morons? Asking for a friend who is currently questioning everything.",
  "I am multi-talented. I can talk, annoy people, and make mistakes all at the exact same time without breaking a single sweat.",
  "My wallet is like an onion, opening it makes me cry. Luckily, happiness cannot be bought with cash, it comes from good humor and great friends.",
  "Work until your bank account looks like a phone number. Until then, keep laughing at the absurdity of the daily hustle.",

  // 81-90: Additional Wisdom & Mindset Passages
  "An unexamined life lacks direction, but an over-examined life lacks action. Balance your introspection with bold execution every single day.",
  "Peace comes from within. Do not seek it without. When the mind is still and clear, the entire universe yields to its calm steady focus.",
  "Small minds discuss people; average minds discuss events; great minds discuss ideas. Elevate your conversations and focus on what truly matters.",
  "He who has a why to live can bear almost any how. Find your purpose and let it anchor you through life's wildest storms.",
  "Happiness is not something ready made. It comes from your own actions. Nurture positive habits and gratitude will follow effortlessly.",
  "The measure of intelligence is the ability to change. Flexibility of mind allows you to navigate unexpected challenges with grace.",
  "Do not let the behavior of others destroy your inner peace. Radiate calm confidence and hold your ground with dignity.",
  "A tree with strong roots laughs at the storm. Build your character on solid values so no temporary setback can knock you down.",
  "The mind is everything. What you think you become. Guard your thoughts carefully and feed your spirit with uplifting ideas.",
  "Simplicity is the ultimate sophistication. Clear away the unnecessary clutter to make room for what brings genuine joy and clarity.",

  // 91-100: Inspiring Visionary & Creative Passages
  "The people who are crazy enough to think they can change the world are the ones who do. Never underestimate the power of a bold vision.",
  "Logic will get you from A to B. Imagination will take you everywhere. Dream without limits and build without fear.",
  "Innovation distinguishes between a leader and a follower. Originality requires the courage to let go of certainty and embrace the unknown.",
  "Creativity is seeing what everyone else has seen, and thinking what no one else has thought. Look at ordinary things with extraordinary eyes.",
  "The future belongs to those who prepare for it today. Invest in your growth, hone your craft, and master your discipline step by step.",
  "Do not wait for extraordinary opportunities. Seize common occasions and make them great. Excellence is doing ordinary things extraordinarily well.",
  "Your life is your canvas, and you are the masterpiece. Paint it with bold colors, bright memories, and relentless passion.",
  "Strive not to be a success, but rather to be of value. When you focus on serving others, true success follows naturally.",
  "Every great dream begins with a dreamer. Always remember, you have within you the strength, the patience, and the passion to reach for the stars.",
  "Endure the grind, embrace the journey, and celebrate every milestone. The summit is sweet, but the climb makes you legendary."
];

// Temporary in-memory rooms data structure: Map<partyCode, Party>
const rooms = new Map();

function getRandomText(currentText = '') {
  const choices = SAMPLE_TEXTS.filter(t => t !== currentText);
  return choices[Math.floor(Math.random() * choices.length)] || SAMPLE_TEXTS[0];
}

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
    text: getRandomText(),
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
  // Pick a fresh new random text different from the previous race text
  party.text = getRandomText(party.text);
  
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
