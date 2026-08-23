# 🏎️ TYPE RACE — Real-Time Multiplayer Typing Platform

A fast, competitive real-time multiplayer typing race web application built with **React**, **Vite**, **Node.js**, **Express**, and **Socket.IO**.

---

## 🌟 Features

- **Real-time Multiplayer Races**: Compete against up to 6 players live in shared party rooms.
- **Server-Authoritative Timing & Results**: Synchronized countdowns, live progress animation across track lanes, and validated final standings.
- **Zero Friction**: No registration or login required; random username generation with inline editing and localStorage persistence.
- **Robust Error Handling**: Auto-reconnection, host disconnection reassignment, duplicate username resolution, and error state alerts.
- **Pure Black Neon Aesthetic**: High-contrast `#000000` identity with Electric Yellow (`#FFD400`) and Neon Purple (`#9B4DFF`) accents.

---

## 🛠️ Technology Stack

- **Frontend**: React 18, Vite, Vanilla CSS
- **Backend**: Node.js, Express, Socket.IO
- **Networking**: WebSockets & Polling fallback

---

## 🚀 Local Development Setup

### 1. Backend Setup

```bash
cd backend
npm install
npm run start
```
*The backend server runs on `http://localhost:3001`.*

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```
*The React app runs on `http://localhost:5173`.*

---

## 🌐 Environment Variables

### Frontend (`frontend/.env`)

| Variable | Description | Local Default | Production Example |
| :--- | :--- | :--- | :--- |
| `VITE_SOCKET_URL` | Socket.IO server URL | `http://localhost:3001` | `https://typing-race-backend.onrender.com` |

### Backend Environment Variables

| Variable | Description | Default | Production Example |
| :--- | :--- | :--- | :--- |
| `PORT` | Node.js listening port | `3001` | Assigned by host (`10000`) |
| `CLIENT_ORIGIN` | CORS allowed origin | `*` | `https://typing-race-frontend.onrender.com` |

---

## ☁️ Deployment Guide (Render)

For detailed deployment instructions, refer to **`docs/DEPLOYMENT.md`** or use the included **`render.yaml`** Infrastructure-as-Code Blueprint.
