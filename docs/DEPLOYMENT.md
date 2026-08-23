# 🚀 Render Deployment Documentation

This guide details the step-by-step instructions for deploying the **TypeRace** platform (Node.js/Socket.IO backend and React/Vite static frontend) to **Render**.

---

## 📋 Overview of Architecture

- **Backend**: Render Web Service running Node.js (`backend/src/server.js`).
- **Frontend**: Render Static Site rendering the production bundle built from Vite (`frontend/dist`).
- **Database**: None (in-memory party state management).

---

## 🛠️ Step-by-Step Deployment Instructions

### Option 1: Blueprint Deployment (Recommended)

1. Connect your repository to Render.
2. Select **New +** → **Blueprint**.
3. Point to the repository. Render will automatically detect `render.yaml` and configure both the Web Service (backend) and Static Site (frontend).
4. Click **Apply**.

---

### Option 2: Manual Service Creation

#### Step 1: Deploy Backend Web Service

1. On Render Dashboard, click **New +** → **Web Service**.
2. Connect your Git repository.
3. Configure settings:
   - **Name**: `typing-race-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. Environment Variables:
   - `PORT`: `10000` (or leave default for Render to assign)
   - `CLIENT_ORIGIN`: `*` (or your static site URL once deployed)
5. Click **Create Web Service**. Note the deployed backend URL (e.g., `https://typing-race-backend.onrender.com`).

#### Step 2: Deploy Frontend Static Site

1. On Render Dashboard, click **New +** → **Static Site**.
2. Connect your Git repository.
3. Configure settings:
   - **Name**: `typing-race-frontend`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
4. Environment Variables:
   - `VITE_SOCKET_URL`: `https://typing-race-backend.onrender.com` *(Replace with your actual backend Web Service URL)*
5. Click **Create Static Site**.

---

## 🔍 Verification & Health Check

1. Visit `https://<your-backend-url>/health`.
2. Confirm the response:
   ```json
   {
     "status": "ok",
     "activeRooms": 0,
     "timestamp": "..."
   }
   ```
3. Open the static site URL in two separate browser tabs to test real-time Socket.IO room joining and racing synchronization.
