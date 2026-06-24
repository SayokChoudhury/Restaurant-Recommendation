from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import recommendations

app = FastAPI(title="AI Restaurant Recommendation API")

# Setup CORS to allow Next.js frontend to communicate with this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include the recommendation router
app.include_router(recommendations.router, prefix="/api", tags=["Recommendations"])

@app.get("/")
def read_root():
    return {"message": "Welcome to the Restaurant Recommendation API"}
