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
allowed_origins = os.getenv("FRONT_END_URL", "http://localhost:5173,http://localhost:3001").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_origin_regex=r"https://.*\.vercel\.app|^https?://(localhost|127\.0\.0\.1)(:\d+)?$",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(user.router)
app.include_router(todo.router)

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
        raise HTTPException(status_code=503, detail="Database connection failed")

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 3000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)
