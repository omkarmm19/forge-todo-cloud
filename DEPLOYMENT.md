# 🚀 Deployment Guide - Forge Todo App (Python & React)

Complete guide for deploying the fully migrated Forge Todo App to production using Render and Vercel.

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Database Setup (Neon PostgreSQL)](#database-setup)
3. [Backend Deployment (Render)](#backend-deployment-render)
4. [Frontend Deployment (Vercel)](#frontend-deployment-vercel)
5. [Environment Variables Reference](#environment-variables-reference)

---

## Prerequisites

Before deploying, ensure you have:

- ✅ **GitHub Account** - For connecting to deployment platforms
- ✅ **Neon Account** - For PostgreSQL database ([neon.tech](https://neon.tech))
- ✅ **Render Account** - For FastAPI Backend hosting ([render.com](https://render.com))
- ✅ **Vercel Account** - For React Frontend deployment ([vercel.com](https://vercel.com))
- ✅ **Git Repository** - Your code pushed to GitHub

> [!IMPORTANT]
> Make sure your `.env` files are **NOT** committed to Git. The `.gitignore` file should exclude them.

---

## Database Setup

Your existing Neon database will work perfectly. If you are starting fresh:
1. Go to [neon.tech](https://neon.tech) and sign up/login
2. Create a new PostgreSQL Database.
3. Copy the **connection string** - it looks like:
   `postgresql://user:password@host.neon.tech/dbname?sslmode=require`

---

## Backend Deployment (Render)

Render is highly recommended for Python (FastAPI) applications because it properly supports long-running processes compared to Serverless functions.

### Step 1: Create Web Service on Render

1. Go to [render.com](https://render.com) and sign in.
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure the following settings:
   - **Name**: `forge-todo-api`
   - **Root Directory**: `server-python`
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port 10000`

### Step 2: Add Environment Variables

In the Environment section, add your secret variables exactly as they are in your local `.env`:

| Variable | Value |
|----------|-------|
| `DATABASE_URL` | `postgresql://user:pass@host.neon.tech/db?sslmode=require` |
| `JWT_USER_SECRET` | Your strong random secret (e.g., `userSecret`) |
| `FRONT_END_URL` | Your frontend URL (Placeholder for now: `https://your-frontend.vercel.app`) |

### Step 3: Deploy

Click **"Create Web Service"**. Render will install the Python dependencies and boot Uvicorn.

Your backend is now live! Copy the deployment URL (e.g., `https://forge-todo-api.onrender.com`).

---

## Frontend Deployment (Vercel)

We use Vercel for extremely fast global CDN hosting of the static React SPA (built via Vite).

### Step 1: Deploy via Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Configure the project:
   - **Framework Preset**: `Vite` (Vercel should auto-detect this)
   - **Root Directory**: `client-react`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Expand **Environment Variables**:
   - Add `VITE_API_BASE_URL` and set its value to your Render backend URL (e.g., `https://forge-todo-api.onrender.com`).
   - *Ensure there is NO trailing slash at the end of the URL!*
5. Click **Deploy**.

### Step 2: Hook up CORS

1. Copy the new live Vercel URL (e.g. `https://forge-todo-app-web.vercel.app`).
2. Go back to your Render Dashboard for the Backend.
3. Update the `FRONT_END_URL` environment variable to match this exact Vercel URL.
4. Render will automatically restart the backend to apply the new CORS policy.

Your entire full-stack application is now live! 🎉
