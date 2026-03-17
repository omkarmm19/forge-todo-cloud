# 🚀 Forge Todo App: Devopsified

A modern, high-performance full-stack todo application **completely Devopsified**. Rebuilt with a **FastAPI** Python backend and a **React 19 SPA (Vite)** frontend, this project is engineered for automated deployments, containerization, and enterprise-grade CI/CD workflows.

[![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![Docker](https://img.shields.io/badge/Docker-Enabled-2496ED?style=for-the-badge&logo=docker)](https://www.docker.com/)
[![GitHub Actions](https://img.shields.io/badge/CI/CD-GitHub_Actions-2088FF?style=for-the-badge&logo=githubactions)](https://github.com/features/actions)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-blue?style=for-the-badge&logo=postgresql)](https://neon.tech/)

---

## ✨ Devopsified Features

- 🐳 **Full Containerization** — Both Frontend and Backend are containerized with optimized Dockerfiles.
- 🔄 **Automated CI/CD** — Pro-grade GitHub Actions pipeline for building, pushing, and auto-deploying.
- 🏗️ **Orchestrated Stack** — One-command spin-up of the entire infrastructure using Docker Compose.
- 🛡️ **Reverse Proxy Integration** — Nginx-powered routing for secure and efficient traffic management.
- ⚡ **Production-Ready Multi-stage Builds** — Minimized image sizes for lightning-fast deployments.
- 🔐 **Secure Auth Flow** — JWT-based authentication with high-entropy bcrypt hashing.
- 🎨 **Modern Frontend** — React 19 SPA built with Vite and TailwindCSS v4.
- 🚀 **Python Power** — Blazing fast FastAPI backend with SQLAlchemy 2.0.

---

## 🛠️ Tech Stack & Infrastructure

### 🌐 Frontend (React SPA)
- **Engine**: React 19 + Vite
- **Styling**: TailwindCSS 4.x + Shadcn/ui
- **State**: React Context + SWR
- **Deployment**: Vercel (CDP) or Docker/Nginx

### ⚙️ Backend (Python API)
- **Engine**: FastAPI (Python 3.11+)
- **ORM**: SQLAlchemy 2.0
- **Auth**: JWT + Bcrypt
- **Deployment**: Render (Web Service) or Docker/Uvicorn

### 🏗️ DevOps Strategy
- **Containerization**: Docker / Docker Compose
- **Web Server**: Nginx (Reverse Proxy & SPA Hosting)
- **CI/CD**: GitHub Actions
- **Registry**: Docker Hub / GHCR
- **Infrastructure**: Optimized for any Cloud VM or Serverless provider.

---

## 📋 Prerequisites

- **Python** (v3.10 or higher)
- **Node.js** (v18 or higher)
- **PostgreSQL** database (or use Neon serverless)
- **Git**

---

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd forge-todo-app
```

### 2. Backend Setup (FastAPI)

```bash
cd server-python
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
pip install -r requirements.txt
```

Create `.env` in `server-python`:
```env
DATABASE_URL=postgresql://user:pass@host.neon.tech/db?sslmode=require
JWT_USER_SECRET=your-super-secret-jwt-key
PORT=3000
FRONT_END_URL=http://localhost:5173
```

Run the server:
```bash
uvicorn main:app --reload --port 3000
```
API runs on: **http://localhost:3000**

### 3. Frontend Setup (React/Vite)

```bash
cd client-react
npm install
```

Create `.env` in `client-react`:
```env
VITE_API_BASE_URL=http://localhost:3000
```

Run the client:
```bash
npm run dev
```
Client runs on: **http://localhost:5173**

---

## 📁 Project Structure

```
forge-todo-app/
├── client-react/              # React SPA frontend
│   ├── src/
│   │   ├── components/        # UI and Form components (Shadcn based)
│   │   ├── lib/               # API clients and utilities
│   │   ├── pages/             # Routing views (Login, Dashboard, etc)
│   │   └── App.tsx            # Main React Router
│   ├── package.json
│   └── vite.config.ts         # Vite build configuration
│
├── server-python/             # FastAPI backend
│   ├── routers/               # API route definitions
│   │   ├── user.py            # Auth routes
│   │   └── todo.py            # Todo CRUD routes
│   ├── auth.py                # JWT and Password hashing (bcrypt)
│   ├── database.py            # SQLAlchemy Connection Engine
│   ├── models.py              # SQLAlchemy Database Models
│   ├── schemas.py             # Pydantic Validation Schemas
│   ├── main.py                # Server entry point
│   ├── requirements.txt       # Python dependencies
│   └── .env                   # Environment config
│
├── DEPLOYMENT.md              # Cloud deployment guide (Render/Vercel)
└── README.md                  # This file
```

---

## 🔑 API Endpoints

### Authentication
- `POST /api/v1/user/signup` — Create new user account
- `POST /api/v1/user/signin` — User login
- `GET /api/v1/user/me` — Get current user (requires auth)

### Todos
- `GET /api/v1/todo` — Get all todos for authenticated user
- `POST /api/v1/todo` — Create a new todo
- `PUT /api/v1/todo/:id` — Update a todo
- `DELETE /api/v1/todo/:id` — Delete a todo

---

## 🐳 Docker Setup (Devopsified)

> [!NOTE]
> This section describes the containerized architecture for the Forge Todo App. The Docker configuration brings up the entire stack — frontend, backend, PostgreSQL, and Nginx — with a single command.

### Architecture Overview

```
                        ┌─────────────────────────────────┐
                        │          Nginx (Port 80)         │
                        │        Reverse Proxy             │
                        └───────────┬─────────────┬────────┘
                                    │             │
                        ┌───────────▼──┐  ┌───────▼──────────┐
                        │  React/Vite  │  │   FastAPI API     │
                        │  Frontend    │  │   Backend         │
                        │  :80         │  │   :3000           │
                        └──────────────┘  └───────┬──────────┘
                                                  │
                                        ┌─────────▼──────────┐
                                        │   PostgreSQL DB     │
                                        │   (Docker Volume)   │
                                        └────────────────────┘
```

### Services in Docker Compose

| Service          | Image                       | Port | Description                        |
|------------------|-----------------------------|----|--------------------------------------|
| `postgres`       | `postgres:16-alpine`        | 5432 | Self-hosted PostgreSQL database    |
| `server-python`  | Custom (Python 3.11)        | 3000 | FastAPI API backend                |
| `client-react`   | Custom (Node/Nginx)         | 80   | React SPA served via Nginx         |
| `nginx`          | `nginx:alpine`              | 80   | Reverse proxy for routing traffic  |

### Docker Environment Files

Create a `.env` file in the project root:
```env
JWT_USER_SECRET=your-super-secret-jwt-key
```
*(Never commit this file to Git)*

### Running with Docker Compose

```bash
# Build and start all services in detached mode
docker compose up --build -d

# View logs
docker compose logs -f

# Stop and remove all services
docker compose down

# Wipe database
docker compose down -v
```

---

## ⚙️ CI/CD with GitHub Actions

The CI/CD pipeline automates Docker image building, pushing to a container registry, and auto-deploying to a cloud VM via SSH.

### Pipeline Architecture

```
Push to main
     │
     ▼
┌────────────────────────────────────┐
│  Build Docker Images               │
│     - forge-server                 │
│     - forge-client                 │
└────────────────┬───────────────────┘
                 │
                 ▼
┌────────────────────────────────────┐
│  Push to Docker Hub                │
└────────────────┬───────────────────┘
                 │
                 ▼
┌────────────────────────────────────┐
│  SSH into Cloud VM                 │
│  - Pull latest images              │
│  - docker compose up -d            │
└────────────────────────────────────┘
```

### GitHub Secrets Required
Add these to your repository settings (`Settings > Secrets and variables > Actions`):

| Secret                      | Description                          |
|-----------------------------|--------------------------------------|
| `DOCKER_USERNAME`           | Docker Hub username                  |
| `DOCKER_PASSWORD`           | Docker Hub password / access token   |
| `VM_HOST`                   | IP address of your cloud VM          |
| `VM_USER`                   | SSH username (e.g. `ubuntu`, `root`) |
| `VM_SSH_KEY`                | Private SSH key for the VM           |

### ☁️ Cloud VM Deployment (AWS EC2 / DigitalOcean)

1. Provision an Ubuntu 22.04 VM (1 vCPU, 2GB RAM).
2. Open Ports `22` (SSH) and `80` (HTTP).
3. Connect and install Docker:
   ```bash
   curl -fsSL https://get.docker.com | sh
   sudo usermod -aG docker $USER
   ```
4. Clone the repository and configure your `.env` secret.
5. GitHub actions will automatically handle the rest on every push to `main`!

---

## 🌐 Deployment Options

The project supports both **containerized VM deployments** (detailed above) and **Serverless/Web Service hosting**.

- **Frontend**: Vercel (Static optimized SPA)
- **Backend**: Render (FastAPI Web Service)
- **Database**: Neon PostgreSQL

📖 Read the comprehensive **[DEPLOYMENT.md](./DEPLOYMENT.md)** for exact step-by-step instructions on Serverless deployment.

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙏 Acknowledgments

- Backend powered by [FastAPI](https://fastapi.tiangolo.com/) and [SQLAlchemy](https://docs.sqlalchemy.org/)
- Frontend built with [Vite](https://vite.dev/) and [React 19](https://react.dev/)
- UI inspired by [shadcn/ui](https://ui.shadcn.com/)
- Database hosted on [Neon](https://neon.tech/)

---

**Happy Coding! 🎉💻**
