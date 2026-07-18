# ⚒️ Forge Todo

A full-stack, cloud-deployed task manager built with **FastAPI**, **React 19**, and **PostgreSQL** — fully containerized and automated with a CI/CD pipeline using GitHub Actions, Docker Hub, Render, and Vercel.

[![CI/CD Pipeline](https://github.com/omkarmm19/forge-todo-cloud/actions/workflows/deploy.yml/badge.svg)](https://github.com/omkarmm19/forge-todo-cloud/actions/workflows/deploy.yml)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![Docker](https://img.shields.io/badge/Docker-Hub-2496ED?style=for-the-badge&logo=docker)](https://hub.docker.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-blue?style=for-the-badge&logo=postgresql)](https://neon.tech/)

🌐 **Live App:** [forge-todo-cloud.vercel.app](https://forge-todo-cloud.vercel.app)
⚙️ **API:** [forge-todo-cloud.onrender.com](https://forge-todo-cloud.onrender.com)

---

## ✨ Features

- 🔐 **JWT Authentication** — Secure signup/login with bcrypt password hashing
- ✅ **User-isolated CRUD** — Each user manages their own todos only
- 🐳 **Fully Containerized** — Multi-stage Dockerfiles for both frontend and backend
- 🔄 **Automated CI/CD** — GitHub Actions builds Docker images, pushes to Docker Hub, and triggers cloud deployments
- 🏗️ **Docker Compose** — One-command local stack with Nginx reverse proxy
- ⚡ **FastAPI + SQLAlchemy** — High-performance Python backend with async support
- 🎨 **React 19 + Shadcn/ui** — Modern SPA with TailwindCSS and dark mode

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 19, Vite, TailwindCSS v4, Shadcn/ui |
| **Backend** | FastAPI (Python 3.11), SQLAlchemy 2.0 |
| **Auth** | JWT (python-jose) + bcrypt |
| **Database** | PostgreSQL (Neon serverless) |
| **Containerization** | Docker, Docker Compose, Nginx |
| **CI/CD** | GitHub Actions |
| **Registry** | Docker Hub |
| **Hosting** | Render (backend) + Vercel (frontend) |

---

## 🚀 Local Development

### Prerequisites
- Python 3.11+
- Node.js 20+
- Docker & Docker Compose

### Option A — Docker Compose (Recommended)

Runs the full stack (frontend + backend + PostgreSQL + Nginx) with one command:

```bash
git clone https://github.com/omkarmm19/forge-todo-cloud.git
cd forge-todo-cloud

# Create root .env
echo "JWT_USER_SECRET=local-dev-secret" > .env

# Start all 4 services
docker compose up --build
```

App available at: **http://localhost:80**

### Option B — Manual Setup

**Backend:**
```bash
cd server-python
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
```

Create `server-python/.env`:
```env
DATABASE_URL=postgresql://user:pass@host.neon.tech/db?sslmode=require
JWT_USER_SECRET=your-super-secret-jwt-key
FRONT_END_URL=http://localhost:5173
```

```bash
uvicorn main:app --reload --port 3000
```

**Frontend:**
```bash
cd client-react
npm install
```

Create `client-react/.env`:
```env
VITE_API_BASE_URL=http://localhost:3000
```

```bash
npm run dev
```

---

## 📁 Project Structure

```
forge-todo-cloud/
├── .github/
│   └── workflows/
│       └── deploy.yml         # CI/CD pipeline
│
├── client-react/              # React 19 SPA (Vite)
│   ├── src/
│   │   ├── components/        # Shadcn/ui components
│   │   ├── lib/               # API client (axios + SWR)
│   │   ├── pages/             # Login, Signup, Dashboard
│   │   └── App.tsx            # Router setup
│   ├── Dockerfile             # Multi-stage: Node build → Nginx serve
│   ├── nginx.conf             # SPA routing config
│   └── index.html
│
├── server-python/             # FastAPI backend
│   ├── routes/
│   │   ├── user.py            # /api/v1/user — Auth routes
│   │   └── todo.py            # /api/v1/todo — CRUD routes
│   ├── auth.py                # JWT creation & verification
│   ├── database.py            # SQLAlchemy engine & session
│   ├── models.py              # User & Todo ORM models
│   ├── schemas.py             # Pydantic request/response schemas
│   ├── main.py                # FastAPI app entrypoint
│   ├── Dockerfile             # Python 3.11 slim image
│   └── requirements.txt
│
├── nginx/
│   └── nginx.conf             # Reverse proxy (Docker Compose)
│
├── docker-compose.yml         # Full local stack orchestration
└── README.md
```

---

## 🔑 API Reference

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/v1/user/signup` | Register new user |
| `POST` | `/api/v1/user/signin` | Login → returns JWT |
| `GET`  | `/api/v1/user/me` | Verify token (auth required) |

### Todos
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET`  | `/api/v1/todo` | Get all todos for current user |
| `POST` | `/api/v1/todo` | Create new todo |
| `PUT`  | `/api/v1/todo` | Update todo (id in body) |
| `DELETE` | `/api/v1/todo` | Delete todo (id in body) |

> All todo endpoints require `Authorization: Bearer <token>` header.

---

## ⚙️ CI/CD Pipeline

Every push to `main` triggers the GitHub Actions pipeline:

```
git push → main
     │
     ├── CI / Backend (Python)
     │     ├── Python 3.11 setup + pip install
     │     ├── Smoke test (import checks)
     │     ├── Docker build → push forge-server:latest to Docker Hub
     │     └── Trigger Render Deploy Hook → Backend redeploys
     │
     └── CI / Frontend (Node)
           ├── Node 20 setup + npm ci
           ├── Production build (npm run build)
           ├── Docker build → push forge-client:latest to Docker Hub
           └── Trigger Vercel Deploy Hook → Frontend redeploys
```

### GitHub Secrets Required

| Secret | Description |
|--------|-------------|
| `DOCKERHUB_USERNAME` | Docker Hub username |
| `DOCKERHUB_TOKEN` | Docker Hub access token (Read & Write) |
| `RENDER_DEPLOY_HOOK_BACKEND` | Render deploy hook URL |
| `VERCEL_DEPLOY_HOOK_FRONTEND` | Vercel deploy hook URL |

---

## 🐳 Docker Architecture

### Local (Docker Compose)
```
                    ┌─────────────────────┐
                    │   Nginx (Port 80)    │
                    │   Reverse Proxy      │
                    └──────┬──────────────┘
                           │
              ┌────────────┴────────────┐
              │                         │
    ┌─────────▼──────┐      ┌──────────▼──────┐
    │ React/Nginx    │      │  FastAPI         │
    │ :80            │      │  :3000           │
    └────────────────┘      └──────────┬───────┘
                                       │
                             ┌─────────▼──────────┐
                             │  PostgreSQL :5432   │
                             └────────────────────┘
```

### Production (Cloud)
```
Vercel (CDN)          Render (Web Service)      Neon (Serverless DB)
React SPA        →    FastAPI + Uvicorn      →   PostgreSQL
```

---

## 🌐 Cloud Deployment

| Service | Platform | URL |
|---------|----------|-----|
| **Frontend** | Vercel | [forge-todo-cloud.vercel.app](https://forge-todo-cloud.vercel.app) |
| **Backend** | Render | [forge-todo-cloud.onrender.com](https://forge-todo-cloud.onrender.com) |
| **Database** | Neon PostgreSQL | Serverless (ap-southeast-1) |

### Render Environment Variables
```env
DATABASE_URL    = postgresql://...neon.tech/neondb?sslmode=require
JWT_USER_SECRET = your-production-secret
FRONT_END_URL   = https://forge-todo-cloud.vercel.app
```

### Vercel Environment Variables
```env
VITE_API_BASE_URL = https://forge-todo-cloud.onrender.com
```

---

## 📝 License

MIT License — open source and free to use.
