# Roadmap

## Phase 1 — Foundation
- [x] Project setup
- [x] Theme
- [x] Landing page

## Phase 2 — Party UI
- [x] Username system
- [x] Create party
- [x] Join party
- [x] Party code
- [x] Invite link

## Phase 3 — Backend
- [x] Express (Server setup & CORS middleware)
- [x] Socket.IO (Event handlers & connection management)
- [x] Room management (In-memory room storage, 4-digit party code enforcement, 6 player limit, host assignment)
- [x] Live socket room state synchronization (Lobby, Race, Results real-time synchronization across clients)

## Phase 4 — Lobby
- [x] Player list (Max 6 slots with empty waiting slots)
- [x] Ready system (Toggleable READY UP / CANCEL READY)
- [x] Host (👑 HOST indicator & START RACE visibility)
- [x] Start race button

## Phase 5 — Race
- [x] Typing engine (Modular `calculateTypingStats` helper)
- [x] WPM (Words-per-minute real-time calculation)
- [x] Accuracy (Percentage calculation based on total keystrokes)
- [x] Progress (0-100% character progress calculation)
- [x] Car movement (Animated car positions across racing lanes)

## Phase 6 — Results
- [x] Finish detection (100% completion & input locking)
- [x] Leaderboard (Ranked position table with winner gold highlight)
- [x] Race again (Clean state reset preserving party code)

## Phase 7 — Polish
- [ ] Animations
- [ ] Sound
- [ ] Mobile
- [x] Error states & connection handling
- [x] QA audit & critical bug fixes

## Phase 8 — Deployment
- [x] Express & Socket.IO production configuration (`process.env.PORT`, `CLIENT_ORIGIN`)
- [x] React & Vite environment configuration (`VITE_SOCKET_URL`, `import.meta.env.MODE` fallback)
- [x] Deployment documentation (`README.md`, `docs/DEPLOYMENT.md`, `render.yaml`)
- [ ] Render live service deployment
- [ ] Production testing