/**
 * ----------------------------------------------------------------
 * |                      App Dependencies                        |
 * ----------------------------------------------------------------
 * * Import necessary packages and modules.
 * * - 'dotenv/config': Loads environment variables from a .env file into process.env.
 * It's important to import this at the very top of the file.
 * - 'express': The core framework for building the web server.
 * - 'cors': Middleware to enable Cross-Origin Resource Sharing.
 * - 'helmet': Middleware to help secure Express apps by setting various HTTP headers.
 * - './lib/prisma.js': The Prisma Client instance for database interaction.
 * - './routes/*': Routers for handling specific API endpoints.
 */
import 'dotenv/config';
import express from "express";
import cors from "cors";
import prisma from "./lib/prisma.js"
import userRouter from './routes/user.js';
import todoRouter from './routes/todo.js';

// ----------------------------------------------------------------
// |                 Application Configuration                    |
// ----------------------------------------------------------------

const app: express.Application = express();
const PORT = process.env.PORT || 3000;

/**
 * Define allowed origins for CORS. It's a best practice to manage this
 * via environment variables for different environments (development, production).
 * Supports multiple origins separated by commas in FRONT_END_URL.
 */
const allowedOrigins = process.env.FRONT_END_URL
  ? process.env.FRONT_END_URL.split(',').map(url => url.trim())
  : ['http://localhost:5173', 'http://localhost:3001'];

// Debug logging to help troubleshoot CORS issues
console.log('🔒 CORS Configuration:');
console.log('   Allowed Origins:', allowedOrigins);
console.log('   FRONT_END_URL env:', process.env.FRONT_END_URL);

const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    // Debug: Log incoming origin
    console.log('🌐 Incoming request from origin:', origin);

    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) {
      console.log('✅ Origin allowed (no origin header)');
      callback(null, true);
      return;
    }

    // Check if origin is in the explicit allowed list
    if (allowedOrigins.indexOf(origin) !== -1) {
      console.log('✅ Origin allowed (in allowed list)');
      callback(null, true);
      return;
    }

    // Allow all Vercel preview deployments (*.vercel.app)
    if (origin.endsWith('.vercel.app')) {
      console.log('✅ Origin allowed (Vercel preview deployment)');
      callback(null, true);
      return;
    }

    // Block all other origins
    console.log('❌ Origin blocked - not in allowed list');
    console.log('   Expected one of:', allowedOrigins);
    console.log('   Or any *.vercel.app domain');
    console.log('   Got:', origin);
    callback(new Error('Not allowed by CORS'));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
};

// Enable CORS with the specified options.
app.use(cors(corsOptions));
// Parse incoming JSON payloads. This is a built-in Express middleware.
app.use(express.json());

// ----------------------------------------------------------------
// |                         API Routing                          |
// ----------------------------------------------------------------

/**
 * Mount the routers for different parts of the API.
 * Versioning the API (e.g., /api/v1) is a good practice for maintainability.
 */
app.use("/api/v1/user", userRouter);
app.use("/api/v1/todo", todoRouter);

// ----------------------------------------------------------------
// |                      Health Check Endpoint                   |
// ----------------------------------------------------------------

/**
 * Health check endpoint for monitoring and deployment verification.
 * Returns server status and database connectivity.
 */
app.get("/health", async (req, res) => {
  try {
    // Check database connectivity
    await prisma.$queryRaw`SELECT 1`;
    res.status(200).json({
      status: "healthy",
      timestamp: new Date().toISOString(),
      database: "connected",
      uptime: process.uptime(),
    });
  } catch (error) {
    res.status(503).json({
      status: "unhealthy",
      timestamp: new Date().toISOString(),
      database: "disconnected",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

app.get("/api/health", async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.status(200).json({
      status: "healthy",
      timestamp: new Date().toISOString(),
      database: "connected",
    });
  } catch (error) {
    res.status(503).json({
      status: "unhealthy",
      timestamp: new Date().toISOString(),
      database: "disconnected",
    });
  }
});

// Export app for serverless deployment (e.g., Vercel)
export default app;

// ----------------------------------------------------------------
// |                 Server and Database Startup                  |
// ----------------------------------------------------------------

/**
 * The main function to initialize the application.
 * It first connects to the database and then starts the Express server.
 */
async function main() {
  try {
    // 1. Connect to the database using Prisma Client.
    await prisma.$connect();
    console.log('✅ Successfully connected to the database.');

    // 2. If the database connection is successful, start the Express server.
    const server = app.listen(PORT, () => {
      console.log(`🚀 Server is running and listening on port ${PORT}`);
      console.log(`🔗 Live at http://localhost:${PORT}`);
    });

    return server;

  } catch (error) {
    // 3. If the database connection fails, log the error and exit the process.
    console.error('❌ Failed to connect to the database.');
    console.error(error);
    process.exit(1); // Exit with a failure code
  }
}

main()
  .then(server => {
    console.log('✅ Main function has completed successfully.');
    // The server is already running at this point from inside main().
  })
  .catch(error => {
    // This is also unlikely to be hit because of the internal try/catch in main,
    // which calls process.exit(1).
    console.error('❌ An unhandled error occurred outside the main try/catch block.');
    console.error(error);
    process.exit(1);
  });

// // ----------------------------------------------------------------
// // |                    Graceful Shutdown Logic                   |
// // ----------------------------------------------------------------

// /**
//  * Handles graceful shutdown of the server. This is crucial for production
//  * environments to ensure that all ongoing requests are finished and resources
//  * (like the database connection) are released properly before the process exits.
//  * * We listen for 'SIGTERM' (e.g., from Docker, Kubernetes) and 'SIGINT' (e.g., Ctrl+C).
//  */
// const gracefulShutdown = async (signal: string) => {
//   console.log(`\n🚨 Received ${signal}. Starting graceful shutdown...`);

//   // 1. Stop the server from accepting new connections.
//   server.close(async () => {
//     console.log('✅ HTTP server closed.');

//     // 2. Disconnect from the database.
//     await prisma.$disconnect();
//     console.log('🔌 Prisma Client disconnected.');

//     // 3. Exit the process.
//     process.exit(0);
//   });

//   // If the server hasn't closed after a timeout, force exit.
//   setTimeout(() => {
//     console.error('❌ Could not close connections in time, forcing shutdown.');
//     process.exit(1);
//   }, 10000); // 10-second timeout
// };

// process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
// process.on('SIGINT', () => gracefulShutdown('SIGINT'));
