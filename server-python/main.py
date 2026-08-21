import os
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import text
from database import engine, Base, get_db
from routes import user, todo
from dotenv import load_dotenv

load_dotenv()

# Create database tables
# In a real production app, you'd use Alembic migrations
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Forge Todo API", version="1.0.0")

# CORS Configuration
raw_origins = os.getenv("FRONT_END_URL", "http://localhost:5173,http://localhost:3001,http://localhost:8080,http://localhost:80").split(",")
allowed_origins = [origin.strip() for origin in raw_origins if origin.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins if allowed_origins else ["*"],
    allow_origin_regex=r"https://.*\.vercel\.app|https://.*\.onrender\.com|^https?://(localhost|127\.0\.0\.1)(:\d+)?$",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Root endpoint for UptimeRobot / uptime monitors / health checks
@app.get("/")
def root():
    return {
        "status": "healthy",
        "message": "Forge Todo API is running",
        "version": "1.0.0"
    }

# Lightweight liveness probe
@app.get("/ping")
def ping():
    return {"status": "pong"}

# Readiness and deep database health check
@app.get("/health")
@app.get("/api/health")
def health_check(db: Session = Depends(get_db)):
    try:
        db.execute(text("SELECT 1"))
        return {
            "status": "healthy",
            "database": "connected"
        }
    except Exception as e:
        raise HTTPException(status_code=503, detail=f"Database connection failed: {str(e)}")

# Include Routers
app.include_router(user.router)
app.include_router(todo.router)

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 3000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)
