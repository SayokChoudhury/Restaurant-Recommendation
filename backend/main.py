from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import recommendations
from database import engine, Base, SessionLocal, Restaurant
from data_ingestion import run_ingestion

# Ensure tables are created so the app doesn't crash if the DB is empty
Base.metadata.create_all(bind=engine)

app = FastAPI(title="AI Restaurant Recommendation API")

import threading

@app.on_event("startup")
def startup_event():
    def seed_database_if_empty():
        db = SessionLocal()
        try:
            if db.query(Restaurant).count() == 0:
                print("Database is empty! Auto-seeding data from Hugging Face...")
                run_ingestion()
            else:
                print(f"Database already populated with {db.query(Restaurant).count()} restaurants.")
        except Exception as e:
            print(f"Error checking or seeding database: {e}")
        finally:
            db.close()
            
    thread = threading.Thread(target=seed_database_if_empty)
    thread.start()
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
