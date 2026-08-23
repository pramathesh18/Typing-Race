# Socket Events Specification

## Client → Server Events

- `create_room`: Payload `{ username?: string, partyCode?: string }`
- `join_room`: Payload `{ username?: string, partyCode: string }`
- `leave_room`: Payload `{}`
- `set_username`: Payload `{ username: string }`
- `set_ready`: Payload `{ ready: boolean }`
- `start_race`: Payload `{}`
- `typing_progress`: Payload `{ progress: number, wpm: number, accuracy: number }`
- `finish_race`: Payload `{ finishTime: number, wpm: number, accuracy: number }`

## Server → Client Events

- `room_created`: Payload `{ partyCode: string, party: Party }`
- `room_joined`: Payload `{ partyCode: string, party: Party }`
- `player_joined`: Payload `{ player: Player, party: Party }`
- `player_left`: Payload `{ playerId: string, party: Party }`
- `player_updated`: Payload `{ player: Player, party: Party }`
- `countdown_started`: Payload `{ party: Party, countdown: number }`
- `race_started`: Payload `{ party: Party, text: string, startTime: number }`
- `progress_updated`: Payload `{ playerId: string, progress: number, wpm: number, accuracy: number, party: Party }`
- `player_finished`: Payload `{ playerId: string, finishTime: number, rank: number, party: Party }`
- `race_finished`: Payload `{ standings: Player[], party: Party }`
- `error`: Payload `{ message: string }`