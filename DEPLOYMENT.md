# 🚀 Deployment Guide - Forge Todo App

Complete guide for deploying the Forge Todo App to production using various cloud platforms.

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Database Setup (Neon PostgreSQL)](#database-setup)
3. [Backend Deployment](#backend-deployment)
   - [Option A: Vercel (Recommended)](#option-a-vercel-recommended)
   - [Option B: Railway](#option-b-railway)
   - [Option C: Render](#option-c-render)
4. [Frontend Deployment (Vercel)](#frontend-deployment)
5. [Environment Variables Reference](#environment-variables-reference)
6. [Post-Deployment Verification](#post-deployment-verification)
7. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before deploying, ensure you have:

- ✅ **GitHub Account** - For connecting to deployment platforms
- ✅ **Neon Account** - For PostgreSQL database ([neon.tech](https://neon.tech))
- ✅ **Vercel Account** - For frontend and/or backend deployment ([vercel.com](https://vercel.com))
- ✅ **Railway/Render Account** (Optional) - Alternative backend hosting
- ✅ **Git Repository** - Your code pushed to GitHub

> [!IMPORTANT]
> Make sure your `.env` files are **NOT** committed to Git. The `.gitignore` file should exclude them.

---

## Database Setup

### 1. Create Neon PostgreSQL Database

1. Go to [neon.tech](https://neon.tech) and sign up/login
2. Click **"New Project"**
3. Configure your project:
   - **Name**: `forge-todo-db` (or your preferred name)
   - **Region**: Choose closest to your users
   - **PostgreSQL Version**: Latest stable version
4. Click **"Create Project"**
5. Copy the **connection string** - it looks like:
   ```
   postgresql://user:password@host.neon.tech/dbname?sslmode=require
   ```

> [!TIP]
> Neon provides a free tier with 0.5 GB storage, perfect for getting started!

### 2. Initialize Database Schema

You'll run migrations after deploying the backend. Keep your connection string ready.

---

## Backend Deployment

Choose one of the following platforms for your backend:

### Option A: Vercel (Recommended)

#### Step 1: Prepare Backend for Vercel

Create a `vercel.json` file in the **server** directory:

```bash
cd server
```

Create `vercel.json`:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "src/index.ts",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "src/index.ts"
    }
  ]
}
```

#### Step 2: Deploy to Vercel

1. **Install Vercel CLI** (optional but recommended):
   ```bash
   npm install -g vercel
   ```

2. **Deploy via CLI**:
   ```bash
   cd server
   vercel
   ```
   
   Or **Deploy via Vercel Dashboard**:
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your GitHub repository
   - Set **Root Directory** to `server`
   - Click **Deploy**

#### Step 3: Configure Environment Variables

In Vercel Dashboard → Your Project → Settings → Environment Variables, add:

| Variable | Value | Example |
|----------|-------|---------|
| `DATABASE_URL` | Your Neon connection string | `postgresql://user:pass@host.neon.tech/db?sslmode=require` |
| `JWT_USER_SECRET` | Strong random secret (see below) | `a1b2c3d4e5f6...` (64+ characters) |
| `PORT` | `3000` | `3000` |
| `FRONT_END_URL` | Your frontend URL | `https://your-app.vercel.app` |

**Generate JWT Secret**:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

#### Step 4: Run Database Migrations

After deployment, run migrations using Vercel CLI:

```bash
cd server
vercel env pull .env.production
npx prisma migrate deploy
```

Or connect to your deployment and run:
```bash
npx prisma db push
```

Your backend is now live! Note the deployment URL (e.g., `https://your-backend.vercel.app`)

---

### Option B: Railway

#### Step 1: Create Railway Project

1. Go to [railway.app](https://railway.app) and sign up/login
2. Click **"New Project"** → **"Deploy from GitHub repo"**
3. Select your repository
4. Railway will auto-detect your Node.js app

#### Step 2: Configure Build Settings

In Railway Dashboard → Your Service → Settings:

- **Root Directory**: `server`
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start`

#### Step 3: Add Environment Variables

In Railway Dashboard → Variables tab, add:

```env
DATABASE_URL=postgresql://user:pass@host.neon.tech/db?sslmode=require
JWT_USER_SECRET=your-generated-secret
PORT=3000
FRONT_END_URL=https://your-frontend.vercel.app
```

#### Step 4: Run Migrations

Use Railway CLI or the web terminal:

```bash
npx prisma migrate deploy
```

Your backend is deployed! Railway provides a public URL automatically.

---

### Option C: Render

#### Step 1: Create Web Service

1. Go to [render.com](https://render.com) and sign up/login
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure:
   - **Name**: `forge-todo-api`
   - **Root Directory**: `server`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`

#### Step 2: Add Environment Variables

In the Environment section, add:

```env
DATABASE_URL=postgresql://user:pass@host.neon.tech/db?sslmode=require
JWT_USER_SECRET=your-generated-secret
PORT=3000
FRONT_END_URL=https://your-frontend.vercel.app
```

#### Step 3: Deploy

Click **"Create Web Service"** - Render will build and deploy automatically.

#### Step 4: Run Migrations

Use Render's Shell feature:

```bash
npx prisma migrate deploy
```

---

## Frontend Deployment

### Deploy to Vercel

#### Step 1: Deploy via Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Configure:
   - **Framework Preset**: Next.js
   - **Root Directory**: `client`
   - Click **Deploy**

#### Step 2: Configure Environment Variables

In Vercel Dashboard → Your Project → Settings → Environment Variables:

| Variable | Value | Example |
|----------|-------|---------|
| `NEXT_PUBLIC_API_BASE_URL` | Your backend URL | `https://your-backend.vercel.app` |
| `BACKEND_URL` | Your backend URL | `https://your-backend.vercel.app` |

> [!WARNING]
> Do **NOT** include a trailing slash in the API URLs!

#### Step 3: Redeploy

After adding environment variables, trigger a redeployment:
- Go to Deployments tab
- Click the three dots on the latest deployment
- Select **"Redeploy"**

Your frontend is now live! 🎉

---

## Environment Variables Reference

### Backend Environment Variables

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `DATABASE_URL` | ✅ Yes | PostgreSQL connection string | `postgresql://user:pass@host/db` |
| `JWT_USER_SECRET` | ✅ Yes | Secret key for JWT tokens | `64-character-random-string` |
| `PORT` | ⚠️ Optional | Server port (default: 3000) | `3000` |
| `FRONT_END_URL` | ✅ Yes | Frontend URL(s) for CORS | `https://app.vercel.app` |

**Multiple Frontend URLs** (comma-separated):
```env
FRONT_END_URL=https://app.vercel.app,https://custom-domain.com
```

### Frontend Environment Variables

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `NEXT_PUBLIC_API_BASE_URL` | ✅ Yes | Backend API URL | `https://api.vercel.app` |
| `BACKEND_URL` | ✅ Yes | Backend URL (legacy) | `https://api.vercel.app` |

---

## Post-Deployment Verification

### 1. Test Health Check Endpoint

```bash
curl https://your-backend-url.vercel.app/health
```

Expected response:
```json
{
  "status": "healthy",
  "timestamp": "2026-02-12T15:30:00.000Z",
  "database": "connected",
  "uptime": 123.45
}
```

### 2. Test Frontend

1. Visit your frontend URL: `https://your-app.vercel.app`
2. Click **"Sign Up"**
3. Create a test account
4. Verify you can:
   - ✅ Sign up successfully
   - ✅ Log in
   - ✅ Create todos
   - ✅ Update todos
   - ✅ Delete todos

### 3. Check Browser Console

Open DevTools (F12) → Console tab:
- ✅ No CORS errors
- ✅ No 404 errors for API calls
- ✅ Successful API responses

---

## Troubleshooting

### CORS Errors

**Problem**: `Access to fetch at '...' from origin '...' has been blocked by CORS policy`

**Solution**:
1. Verify `FRONT_END_URL` in backend environment variables includes your frontend URL
2. Ensure no trailing slashes in URLs
3. Redeploy backend after updating environment variables

### Database Connection Errors

**Problem**: `Can't reach database server` or `Connection timeout`

**Solution**:
1. Verify `DATABASE_URL` is correct in backend environment variables
2. Ensure `?sslmode=require` is at the end of the connection string
3. Check Neon database is active (not suspended)

### 404 on API Calls

**Problem**: Frontend shows 404 errors when calling API

**Solution**:
1. Verify `NEXT_PUBLIC_API_BASE_URL` in frontend environment variables
2. Ensure backend is deployed and running
3. Check backend URL is accessible: `curl https://your-backend.vercel.app/health`

### Prisma Client Not Generated

**Problem**: `Cannot find module '@prisma/client'`

**Solution**:
1. Ensure `postinstall` script is in `server/package.json`:
   ```json
   "scripts": {
     "postinstall": "prisma generate"
   }
   ```
2. Redeploy the backend

### Environment Variables Not Loading

**Problem**: App uses default/undefined values

**Solution**:
1. Verify environment variables are set in deployment platform
2. For Next.js, ensure variables start with `NEXT_PUBLIC_` for client-side access
3. Redeploy after adding/updating environment variables

---

## 🎉 Success!

Your Forge Todo App is now deployed and running in production!

### Next Steps

- 🔒 **Set up custom domain** (optional)
- 📊 **Monitor with Vercel Analytics**
- 🔄 **Set up CI/CD** for automatic deployments
- 🛡️ **Add rate limiting** for API endpoints
- 📧 **Configure email notifications** (future feature)

### Useful Links

- **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **Neon Documentation**: [neon.tech/docs](https://neon.tech/docs)
- **Prisma Documentation**: [prisma.io/docs](https://prisma.io/docs)
- **Next.js Documentation**: [nextjs.org/docs](https://nextjs.org/docs)

---

**Need help?** Check the [README.md](./README.md) for local development setup or open an issue on GitHub.
