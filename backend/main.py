from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import recommendations
from database import engine, Base, SessionLocal, Restaurant

# Ensure tables exist (no-op if the bundled DB is already populated)
Base.metadata.create_all(bind=engine)

app = FastAPI(title="AI Restaurant Recommendation API")

@app.on_event("startup")
def startup_event():
    """Log database status on startup."""
    db = SessionLocal()
    try:
        count = db.query(Restaurant).count()
        if count > 0:
            print(f"Database ready with {count} restaurants.")
        else:
            print("WARNING: Database is empty! The bundled restaurants.db may be missing.")
    except Exception as e:
        print(f"Error checking database: {e}")
    finally:
        db.close()

# Setup CORS to allow Next.js frontend to communicate with this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include the recommendation router
app.include_router(recommendations.router, prefix="/api", tags=["Recommendations"])

@app.get("/")
def read_root():
    return {"message": "Welcome to the Restaurant Recommendation API"}

@app.get("/health")
def health_check():
    """Health check endpoint for Railway and monitoring."""
    db = SessionLocal()
    try:
        count = db.query(Restaurant).count()
        return {
            "status": "healthy",
            "database": "connected",
            "restaurant_count": count
        }
    except Exception as e:
        return {
            "status": "unhealthy",
            "database": "error",
            "error": str(e)
        }
    finally:
        db.close()
