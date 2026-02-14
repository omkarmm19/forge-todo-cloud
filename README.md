# 🚀 Forge Todo App

A modern, full-stack todo application built with Next.js, Express, and PostgreSQL. This project demonstrates best practices in web development, authentication, and database management.

![Tech Stack](https://img.shields.io/badge/Next.js-15.2.4-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Express](https://img.shields.io/badge/Express-5.1.0-green?style=flat-square&logo=express)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-blue?style=flat-square&logo=postgresql)
![Prisma](https://img.shields.io/badge/Prisma-6.15.0-2D3748?style=flat-square&logo=prisma)

## ✨ Features

- ✅ **User Authentication** - Secure JWT-based authentication with bcrypt password hashing
- ✅ **Todo Management** - Full CRUD operations for todos
- ✅ **Modern UI** - Beautiful, responsive interface built with TailwindCSS and Radix UI
- ✅ **Type Safety** - End-to-end TypeScript for robust code
- ✅ **Database ORM** - Prisma for type-safe database operations
- ✅ **API Architecture** - RESTful API with proper error handling

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
- **Database**: PostgreSQL (Neon serverless)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** or **pnpm**
- **PostgreSQL** database (or use Neon serverless)
- **Git**

## 🚀 Quick Start

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
- `server/.env` - Backend configuration (database URL, JWT secret, port, CORS)
- `client/.env.local` - Frontend configuration (API URLs)

Refer to the existing `.env` files in the project for the required variables.

### 4. Database Setup

```bash
cd server
npx prisma migrate dev
npx prisma generate
```

### 5. Run the Application

**Terminal 1 - Backend Server:**
```bash
cd server
npm run dev
```
Server runs on: **http://localhost:3000**

**Terminal 2 - Frontend Client:**
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
│   └── package.json           # Backend dependencies
│
├── QUICKSTART.md              # Quick reference guide
└── README.md                  # This file
```

## 🔑 API Endpoints

### Authentication
- `POST /api/v1/user/signup` - Create new user account
- `POST /api/v1/user/login` - User login
- `GET /api/v1/user/me` - Get current user (requires auth)

### Todos
- `GET /api/v1/todo` - Get all todos for authenticated user
- `POST /api/v1/todo` - Create a new todo
- `PUT /api/v1/todo/:id` - Update a todo
- `DELETE /api/v1/todo/:id` - Delete a todo

All todo endpoints require JWT authentication via `Authorization: Bearer <token>` header.

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

## 🔐 Security Features

- ✅ Passwords hashed with bcrypt (10 rounds)
- ✅ JWT tokens for stateless authentication
- ✅ CORS configured for specific origins
- ✅ Environment variables for sensitive data
- ✅ SQL injection prevention via Prisma ORM

## 🌐 Deployment

Ready to deploy your app to production? Check out our comprehensive deployment guide:

📖 **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Complete guide covering:
- Database setup with Neon PostgreSQL
- Backend deployment (Vercel, Railway, or Render)
- Frontend deployment (Vercel)
- Environment variable configuration
- Post-deployment verification
- Troubleshooting common issues

### Quick Deploy

**Backend (Render)**:
```bash
cd server
render
```

**Frontend (Vercel)**:
```bash
cd client
vercel
```

> [!IMPORTANT]
> Make sure to configure environment variables in your deployment platform before deploying. See [DEPLOYMENT.md](./DEPLOYMENT.md) for details.


## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [Radix UI](https://www.radix-ui.com/)
- Database hosted on [Neon](https://neon.tech/)
- Icons from [Lucide React](https://lucide.dev/)

---

**Happy Coding! 🎉**
