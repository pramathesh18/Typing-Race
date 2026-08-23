# Data Model

## Player

playerId: string
username: string
carColor: string
ready: boolean
progress: number
wpm: number
accuracy: number
finished: boolean
finishTime: number | null
isHost: boolean

## Party

partyCode: string
hostId: string
players: Player[]
maxPlayers: number
status: "waiting" | "countdown" | "racing" | "finished"
text: string
startTime: number | null

## Local Typing Engine Calculations
- targetText: string (Passage assigned to all racers in room)
- typedInput: string (Current input value typed by player)
- totalKeystrokes: number (Total keystrokes pressed for accuracy calculation)
- elapsedSeconds: number (Timer elapsed since race state changed to racing)
- correctChars: number (Count of consecutive matching characters from index 0)
- firstErrorIndex: number (Index where typed input diverges from targetText, or -1)