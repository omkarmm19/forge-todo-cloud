# 🚀 Forge Todo App

A modern, full-stack todo application built with Next.js, Express, and PostgreSQL. This project demonstrates best practices in web development, authentication, and database management — and is fully prepared for a **DevOps/containerized** deployment setup.

![Tech Stack](https://img.shields.io/badge/Next.js-15.2.4-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Express](https://img.shields.io/badge/Express-5.1.0-green?style=flat-square&logo=express)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-blue?style=flat-square&logo=postgresql)
![Prisma](https://img.shields.io/badge/Prisma-6.15.0-2D3748?style=flat-square&logo=prisma)
![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=flat-square&logo=docker)
![CI/CD](https://img.shields.io/badge/CI%2FCD-GitHub_Actions-2088FF?style=flat-square&logo=githubactions)

---

## ✨ Features

- ✅ **User Authentication** — Secure JWT-based authentication with bcrypt password hashing
- ✅ **Todo Management** — Full CRUD operations for todos
- ✅ **Modern UI** — Beautiful, responsive interface built with TailwindCSS and Radix UI
- ✅ **Type Safety** — End-to-end TypeScript for robust code
- ✅ **Database ORM** — Prisma for type-safe database operations
- ✅ **API Architecture** — RESTful API with proper error handling
- ✅ **Dockerized** — Both client and server are containerized with Docker
- ✅ **Docker Compose** — One-command local/production spin-up
- ✅ **CI/CD Ready** — GitHub Actions pipeline for automated testing & deployment
- ✅ **Reverse Proxy** — Nginx as a reverse proxy to route traffic to frontend/backend
- ✅ **Cloud Deployable** — Deploy to AWS EC2, DigitalOcean, Railway, or Render

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15.2.4 (App Router)
- **UI Library**: React 19
- **Styling**: TailwindCSS 4.1.9
- **Component Library**: Radix UI (Accordion, Dialog, Toast, etc.)
- **Form Handling**: React Hook Form with Zod validation
- **HTTP Client**: Axios
- **State Management**: SWR for data fetching
- **Animations**: Framer Motion

### Backend
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js 5.1.0
- **Database ORM**: Prisma 6.15.0
- **Authentication**: JWT (jsonwebtoken) + bcrypt
- **Security**: CORS, environment-based configuration
- **Database**: PostgreSQL (Neon serverless / self-hosted via Docker)

### DevOps & Infrastructure
- **Containerization**: Docker + Docker Compose
- **Reverse Proxy**: Nginx
- **CI/CD**: GitHub Actions
- **Container Registry**: Docker Hub / GitHub Container Registry (GHCR)
- **Cloud Deployment**: AWS EC2, DigitalOcean Droplet, or Railway

---

## 📋 Prerequisites

### For Local Development (without Docker)
- **Node.js** (v18 or higher)
- **npm** or **pnpm**
- **PostgreSQL** database (or use Neon serverless)
- **Git**

### For Dockerized Setup
- **Docker** (v24+)
- **Docker Compose** (v2+)
- **Git**

---

## 🚀 Quick Start (without Docker)

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd forge-todo-app
```

### 2. Install Dependencies

**Backend:**
```bash
cd server
npm install
```

**Frontend:**
```bash
cd client
npm install
```

### 3. Environment Configuration

Create the required environment files:
- `server/.env` — Backend configuration (database URL, JWT secret, port, CORS)
- `client/.env.local` — Frontend configuration (API URLs)

Refer to the existing `.env.example` files in each directory for the required variables.

### 4. Database Setup

```bash
cd server
npx prisma migrate dev
npx prisma generate
```

### 5. Run the Application

**Terminal 1 — Backend Server:**
```bash
cd server
npm run dev
```
Server runs on: **http://localhost:3000**

**Terminal 2 — Frontend Client:**
```bash
cd client
npm run dev
```
Client runs on: **http://localhost:3001**

### 6. Access the Application

Open your browser and navigate to **http://localhost:3001**

- **Sign Up**: Create a new account
- **Login**: Access your todos
- **Dashboard**: Manage your todo items

---

## 🐳 Docker Setup (Devopsified)

> [!NOTE]
> This section describes the planned containerized architecture for the Forge Todo App. The Docker configuration brings up the entire stack — frontend, backend, PostgreSQL, and Nginx — with a single command.

### Architecture Overview

```
                        ┌─────────────────────────────────┐
                        │          Nginx (Port 80)         │
                        │        Reverse Proxy             │
                        └───────────┬─────────────┬────────┘
                                    │             │
                        ┌───────────▼──┐  ┌───────▼──────────┐
                        │  Next.js     │  │   Express API     │
                        │  Frontend    │  │   Backend         │
                        │  :3001       │  │   :3000           │
                        └──────────────┘  └───────┬──────────┘
                                                  │
                                        ┌─────────▼──────────┐
                                        │   PostgreSQL DB     │
                                        │   (Docker Volume)   │
                                        └────────────────────┘
```

### Services in Docker Compose

| Service    | Image                       | Port | Description                        |
|------------|-----------------------------|----|--------------------------------------|
| `postgres` | `postgres:16-alpine`        | 5432 | Self-hosted PostgreSQL database    |
| `server`   | Custom (Node 18 Alpine)     | 3000 | Express.js API backend             |
| `client`   | Custom (Node 18 Alpine)     | 3001 | Next.js frontend                   |
| `nginx`    | `nginx:alpine`              | 80   | Reverse proxy for routing traffic  |

### Docker Files Structure

```
forge-todo-app/
├── docker-compose.yml          # Orchestrates all services
├── docker-compose.prod.yml     # Production overrides
├── nginx/
│   └── nginx.conf              # Nginx reverse proxy config
├── server/
│   └── Dockerfile              # Backend Docker image
└── client/
    └── Dockerfile              # Frontend Docker image
```

### server/Dockerfile

```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/prisma ./prisma
EXPOSE 3000
CMD ["npm", "run", "start"]
```

### client/Dockerfile

```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ARG NEXT_PUBLIC_API_BASE_URL
ENV NEXT_PUBLIC_API_BASE_URL=$NEXT_PUBLIC_API_BASE_URL
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
EXPOSE 3001
CMD ["npm", "run", "start"]
```

### docker-compose.yml

```yaml
version: "3.9"

services:
  postgres:
    image: postgres:16-alpine
    container_name: forge_postgres
    restart: unless-stopped
    environment:
      POSTGRES_USER: forge_user
      POSTGRES_PASSWORD: forge_password
      POSTGRES_DB: forge_todo
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - forge_network

  server:
    build:
      context: ./server
      dockerfile: Dockerfile
    container_name: forge_server
    restart: unless-stopped
    depends_on:
      - postgres
    environment:
      DATABASE_URL: postgresql://forge_user:forge_password@postgres:5432/forge_todo
      JWT_USER_SECRET: ${JWT_USER_SECRET}
      PORT: 3000
      FRONT_END_URL: http://localhost
    networks:
      - forge_network

  client:
    build:
      context: ./client
      dockerfile: Dockerfile
      args:
        NEXT_PUBLIC_API_BASE_URL: http://localhost/api
    container_name: forge_client
    restart: unless-stopped
    depends_on:
      - server
    networks:
      - forge_network

  nginx:
    image: nginx:alpine
    container_name: forge_nginx
    restart: unless-stopped
    ports:
      - "80:80"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
    depends_on:
      - client
      - server
    networks:
      - forge_network

volumes:
  postgres_data:

networks:
  forge_network:
    driver: bridge
```

### nginx/nginx.conf

```nginx
events {}

http {
  upstream frontend {
    server client:3001;
  }

  upstream backend {
    server server:3000;
  }

  server {
    listen 80;

    location /api/ {
      proxy_pass http://backend/;
      proxy_set_header Host $host;
      proxy_set_header X-Real-IP $remote_addr;
    }

    location / {
      proxy_pass http://frontend;
      proxy_set_header Host $host;
      proxy_set_header X-Real-IP $remote_addr;
    }
  }
}
```

### Environment File for Docker

Create a `.env` file in the project root (next to `docker-compose.yml`):

```env
JWT_USER_SECRET=your-super-secret-jwt-key-here
```

> [!IMPORTANT]
> Never commit this `.env` file to Git. It is already added to `.gitignore`.

### Running with Docker Compose

```bash
# Build and start all services
docker compose up --build

# Run in detached (background) mode
docker compose up --build -d

# View logs
docker compose logs -f

# Stop all services
docker compose down

# Stop and remove volumes (wipe database)
docker compose down -v
```

### Run Database Migrations inside Docker

After the containers are up, run Prisma migrations:

```bash
docker compose exec server npx prisma migrate deploy
```

### Access the Dockerized App

| Service   | URL                          |
|-----------|------------------------------|
| Frontend  | http://localhost             |
| API       | http://localhost/api         |
| DB (raw)  | localhost:5432               |

---

## ⚙️ CI/CD with GitHub Actions

> [!NOTE]
> The CI/CD pipeline automates testing, Docker image building, pushing to a container registry, and deploying to a cloud VM.

### Pipeline Overview

```
Push to main
     │
     ▼
┌────────────────────────────────────┐
│  1. Run Tests (lint, type-check)   │
└────────────────┬───────────────────┘
                 │
                 ▼
┌────────────────────────────────────┐
│  2. Build Docker Images            │
│     - forge-server                 │
│     - forge-client                 │
└────────────────┬───────────────────┘
                 │
                 ▼
┌────────────────────────────────────┐
│  3. Push to Docker Hub / GHCR      │
└────────────────┬───────────────────┘
                 │
                 ▼
┌────────────────────────────────────┐
│  4. SSH into Cloud VM              │
│     Pull latest images             │
│     docker compose up -d           │
└────────────────────────────────────┘
```

### .github/workflows/deploy.yml

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Log in to Docker Hub
        uses: docker/login-action@v3
        with:
          username: ${{ secrets.DOCKER_USERNAME }}
          password: ${{ secrets.DOCKER_PASSWORD }}

      - name: Build & push server image
        uses: docker/build-push-action@v5
        with:
          context: ./server
          push: true
          tags: ${{ secrets.DOCKER_USERNAME }}/forge-server:latest

      - name: Build & push client image
        uses: docker/build-push-action@v5
        with:
          context: ./client
          push: true
          tags: ${{ secrets.DOCKER_USERNAME }}/forge-client:latest
          build-args: |
            NEXT_PUBLIC_API_BASE_URL=${{ secrets.NEXT_PUBLIC_API_BASE_URL }}

      - name: Deploy to Cloud VM via SSH
        uses: appleboy/ssh-action@v1
        with:
          host: ${{ secrets.VM_HOST }}
          username: ${{ secrets.VM_USER }}
          key: ${{ secrets.VM_SSH_KEY }}
          script: |
            cd ~/forge-todo-app
            docker compose pull
            docker compose up -d
            docker compose exec -T server npx prisma migrate deploy
```

### Required GitHub Secrets

| Secret                      | Description                          |
|-----------------------------|--------------------------------------|
| `DOCKER_USERNAME`           | Docker Hub username                  |
| `DOCKER_PASSWORD`           | Docker Hub password / access token   |
| `VM_HOST`                   | IP address of your cloud VM          |
| `VM_USER`                   | SSH username (e.g. `ubuntu`, `root`) |
| `VM_SSH_KEY`                | Private SSH key for the VM           |
| `JWT_USER_SECRET`           | JWT secret for the backend           |
| `NEXT_PUBLIC_API_BASE_URL`  | Public URL of the API                |

---

## ☁️ Cloud Deployment (VM-based)

### Deploy on AWS EC2 / DigitalOcean Droplet

#### 1. Provision a VM
- **OS**: Ubuntu 22.04 LTS
- **Minimum Specs**: 1 vCPU, 1 GB RAM (2 GB recommended)
- **Open Ports**: 22 (SSH), 80 (HTTP), 443 (HTTPS)

#### 2. Install Docker on the VM
```bash
# Connect to VM
ssh ubuntu@<your-vm-ip>

# Install Docker
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER
newgrp docker
```

#### 3. Clone and Configure
```bash
git clone <your-repo-url> ~/forge-todo-app
cd ~/forge-todo-app
echo "JWT_USER_SECRET=your-super-secret" > .env
```

#### 4. Start the Stack
```bash
docker compose up -d --build
docker compose exec server npx prisma migrate deploy
```

#### 5. (Optional) Enable HTTPS with Let's Encrypt

Update `nginx/nginx.conf` to support HTTPS and use Certbot:

```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d yourdomain.com
```

---

## 📁 Project Structure

```
forge-todo-app/
├── client/                    # Next.js frontend application
│   ├── app/                   # App router pages
│   │   ├── dashboard/         # Dashboard page (protected)
│   │   ├── login/             # Login page
│   │   ├── signup/            # Signup page
│   │   └── page.tsx           # Home page
│   ├── components/            # Reusable React components
│   │   ├── auth/              # Authentication components
│   │   ├── todos/             # Todo-related components
│   │   └── ui/                # UI components (Radix UI)
│   ├── hooks/                 # Custom React hooks
│   ├── lib/                   # Utility functions
│   ├── styles/                # Global styles
│   ├── Dockerfile             # [DevOps] Client container image
│   └── package.json           # Frontend dependencies
│
├── server/                    # Express.js backend application
│   ├── src/
│   │   ├── controllers/       # Request handlers
│   │   │   ├── userController.ts
│   │   │   └── todoController.ts
│   │   ├── routes/            # API route definitions
│   │   │   ├── user.ts        # Auth routes
│   │   │   └── todo.ts        # Todo CRUD routes
│   │   ├── middleware/        # Custom middleware
│   │   ├── lib/               # Utilities (Prisma client)
│   │   └── index.ts           # Server entry point
│   ├── prisma/
│   │   ├── schema.prisma      # Database schema
│   │   └── migrations/        # Database migrations
│   ├── Dockerfile             # [DevOps] Server container image
│   └── package.json           # Backend dependencies
│
├── nginx/
│   └── nginx.conf             # [DevOps] Nginx reverse proxy config
│
├── .github/
│   └── workflows/
│       └── deploy.yml         # [DevOps] CI/CD GitHub Actions pipeline
│
├── docker-compose.yml         # [DevOps] Local/production orchestration
├── docker-compose.prod.yml    # [DevOps] Production-specific overrides
├── QUICKSTART.md              # Quick reference guide
├── DEPLOYMENT.md              # Cloud deployment guide (Vercel/Railway/Render)
└── README.md                  # This file
```

---

## 🔑 API Endpoints

### Authentication
- `POST /api/v1/user/signup` — Create new user account
- `POST /api/v1/user/login` — User login
- `GET /api/v1/user/me` — Get current user (requires auth)

### Todos
- `GET /api/v1/todo` — Get all todos for authenticated user
- `POST /api/v1/todo` — Create a new todo
- `PUT /api/v1/todo/:id` — Update a todo
- `DELETE /api/v1/todo/:id` — Delete a todo

All todo endpoints require JWT authentication via `Authorization: Bearer <token>` header.

---

## 🗄️ Database Schema

```prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  password  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  todos     Todo[]
}

model Todo {
  id        Int      @id @default(autoincrement())
  title     String
  completed Boolean  @default(false)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  userId    Int
  user      User     @relation(fields: [userId], references: [id])
}
```

---

## 🔧 Development Scripts

### Backend
```bash
npm run dev      # Run development server (build + start)
npm run build    # Compile TypeScript
npm run start    # Run compiled server
```

### Frontend
```bash
npm run dev      # Run Next.js development server
npm run build    # Build production bundle
npm run start    # Start production server
npm run lint     # Run ESLint
```

---

## 🔐 Security Features

- ✅ Passwords hashed with bcrypt (10 rounds)
- ✅ JWT tokens for stateless authentication
- ✅ CORS configured for specific origins
- ✅ Environment variables for sensitive data
- ✅ SQL injection prevention via Prisma ORM
- ✅ Docker containers run as non-root users (planned)
- ✅ Secrets managed via GitHub Secrets in CI/CD

---

## 🌐 Deployment Options

### Option 1 — Serverless (Current)
> Best for quick deployments, no server management.

- **Frontend**: Vercel
- **Backend**: Vercel / Railway / Render
- **Database**: Neon PostgreSQL (serverless)

📖 See [DEPLOYMENT.md](./DEPLOYMENT.md) for the full serverless deployment guide.

### Option 2 — Dockerized on a Cloud VM (Planned/DevOps)
> Best for full control, self-hosting, and DevOps practice.

- **Frontend + Backend + Nginx**: Docker Compose on AWS EC2 / DigitalOcean
- **Database**: PostgreSQL in Docker (or Neon for managed DB)
- **CI/CD**: GitHub Actions → Docker Hub → SSH deploy

📖 See the [Docker Setup](#-docker-setup-devopsified) section above.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [Radix UI](https://www.radix-ui.com/)
- Database hosted on [Neon](https://neon.tech/)
- Icons from [Lucide React](https://lucide.dev/)
- Containerization with [Docker](https://www.docker.com/)

---

**Happy Coding & Happy DevOps-ing! 🎉🐳**
