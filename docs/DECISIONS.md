# Architectural Decisions

## 001 — No database in v1
Decision:
Use temporary in-memory room state.

Reason:
The first version only needs live races.

---

## 002 — Socket.IO
Decision:
Use Socket.IO rather than raw WebSockets.

Reason:
Simpler room/event management.

---

## 003 — No authentication
Decision:
Players are identified by temporary socket/player IDs.

Reason:
Fast frictionless gameplay.

---

## 004 — Screen-based State Navigation Architecture
Decision:
Organize screens into dedicated modular components (`LandingScreen`, `CreatePartyScreen`, `JoinPartyScreen`, `LobbyScreen`, `RaceScreen`, `ResultsScreen`) driven by lightweight top-level state routing.

Reason:
Provides a clean, scalable component layout ready for Phase 2-6 integrations without adding unnecessary routing libraries or complexity.

---

## 005 — Host Reassignment Strategy
Decision:
When the host disconnects or leaves an active room, host authority (`isHost = true` & `hostId`) is automatically reassigned to the longest-standing active member in the room array (index 0).

Reason:
Provides the simplest, most consistent host reassignment strategy without needing voting protocols or session persistence databases. Ensures continuous room operation and race controls for remaining players.