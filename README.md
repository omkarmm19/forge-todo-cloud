# 🚀 Forge Todo App

A modern, full-stack todo application completely rebuilt with a **FastAPI** Python backend and a **React 19 SPA (Vite)** frontend. This project demonstrates best practices in web development, authentication, database management, and cloud deployments.

![Tech Stack](https://img.shields.io/badge/FastAPI-0.115-009688?style=flat-square&logo=fastapi)
![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)
![Python](https://img.shields.io/badge/Python-3.11+-3776AB?style=flat-square&logo=python)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-blue?style=flat-square&logo=postgresql)
![SQLAlchemy](https://img.shields.io/badge/SQLAlchemy-2.0-red?style=flat-square&logo=sqlalchemy)

---

## ✨ Features

- ✅ **User Authentication** — Secure JWT-based authentication with direct bcrypt password hashing
- ✅ **Todo Management** — Full CRUD operations for todos
- ✅ **Modern Frontend** — Lightning-fast SPA built with Vite and React 19
- ✅ **Type Safety & Validation** — Pydantic models for strict backend data validation
- ✅ **Database ORM** — SQLAlchemy for robust, raw-query-free database operations
- ✅ **API Architecture** — RESTful API built on the ASGI standard for speed
- ✅ **Beautiful UI** — TailwindCSS v4 with Shadcn/ui for consistent components
- ✅ **Cloud Deployable** — Deploy to Render (Backend) and Vercel (Frontend)

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19 building via Vite
- **Styling**: TailwindCSS 4.x
- **Component Library**: Customized ui components (Shadcn/ui base)
- **State Management**: React Context Auth + SWR for data fetching
- **Form Handling**: React Hook Form with Zod validation
- **Animations**: Framer Motion

### Backend
- **Framework**: FastAPI (Python)
- **Database ORM**: SQLAlchemy 2.0
- **Authentication**: `python-jose` for JWTs + `bcrypt`
- **Security**: Granular CORS Middleware
- **Database**: PostgreSQL (Neon serverless)

### DevOps & Infrastructure
- **Frontend Hosting**: Vercel (Static SPA edge delivery)
- **Backend Hosting**: Render (Dedicated Web Service)

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

## 🌐 Deployment Options

The project is fully prepared for serverless and web service hosting.

- **Frontend**: Vercel (Static optimized SPA)
- **Backend**: Render (FastAPI Web Service)
- **Database**: Neon PostgreSQL

📖 Read the comprehensive **[DEPLOYMENT.md](./DEPLOYMENT.md)** for exact step-by-step instructions.

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
