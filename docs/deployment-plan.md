# Deployment Plan: Railway & Vercel

This document outlines the step-by-step strategy for deploying the Lumina AI Restaurant Recommendation System, with the backend hosted on **Railway** and the frontend on **Vercel**.

## 1. Backend Deployment (Railway)

The backend is built with FastAPI and utilizes a local SQLite database. Since Railway uses ephemeral filesystems, any local database file will be wiped out when the service restarts unless a persistent volume is used.

### Steps to Deploy
1. **Create a Railway Account:** Log in to [Railway.app](https://railway.app/).
2. **Create a New Project:** Click "New Project" and select "Deploy from GitHub repo". Choose your `Restaurant-Recommendation` repository.
3. **Configure the Service:**
   - Go to your newly created service's **Settings**.
   - Under **Build**, set the **Root Directory** to `/backend`.
   - Set the **Start Command** to: `uvicorn main:app --host 0.0.0.0 --port $PORT`
4. **Environment Variables:**
   - Go to the **Variables** tab.
   - Add your `GROQ_API_KEY`.
5. **No Persistent Storage Needed:**
   - The backend is now configured to automatically use a temporary directory if no persistent volume is found.
6. **Automatic Database Population:**
   - The application has been updated to automatically detect an empty database on startup and run the data ingestion script instantly. You do **not** need to manually run any scripts or populate volumes!
7. **Generate a Domain:**
   - Go to the **Settings** tab -> **Networking** and click "Generate Domain". 
   - *Save this URL (e.g., `https://lumina-backend.up.railway.app`). You'll need it for the frontend.*

---

## 2. Frontend Deployment (Vercel)

The frontend is a Next.js application, which Vercel is highly optimized to host.

### Steps to Deploy
1. **Create a Vercel Account:** Log in to [Vercel.com](https://vercel.com/) with your GitHub account.
2. **Add New Project:** Click "Add New..." -> "Project".
3. **Import Repository:** Select the `Restaurant-Recommendation` repository.
4. **Configure Project Settings:**
   - **Framework Preset:** Next.js
   - **Root Directory:** Click "Edit" and select the `frontend` folder.
5. **Environment Variables:**
   - Expand the "Environment Variables" section.
   - Add a new variable:
     - **Name:** `NEXT_PUBLIC_API_URL`
     - **Value:** `<YOUR_RAILWAY_DOMAIN_URL>` *(e.g., `https://lumina-backend.up.railway.app`)*
6. **Deploy:**
   - Click the **Deploy** button. Vercel will automatically install the npm dependencies, build the Next.js app, and publish it.
7. **Final Verification:**
   - Once the build is complete, Vercel will provide you with a live URL.
   - Visit the URL to ensure the UI loads properly and try searching for a restaurant to confirm the frontend is successfully communicating with the Railway backend!

> [!WARNING]
> **CORS Configuration:** Ensure that your FastAPI backend in `backend/main.py` is configured to accept Cross-Origin Resource Sharing (CORS) requests from your Vercel domain. You might need to update the `allow_origins` array in the backend once you have the final Vercel URL.
