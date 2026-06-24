from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import recommendations
from database import engine, Base

# Ensure tables are created so the app doesn't crash if the DB is empty
Base.metadata.create_all(bind=engine)

app = FastAPI(title="AI Restaurant Recommendation API")

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
