import sys
import os
import asyncio

sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from database import SessionLocal
from routers.recommendations import get_recommendations
from schemas import RecommendationRequest

db = SessionLocal()
request = RecommendationRequest(
    location="BTM",
    cuisine="North Indian",
    budget="medium",
    min_rating=4.0,
    additional_preferences="Spicy food"
)

try:
    results = get_recommendations(request, db)
    print("Results:", results)
except Exception as e:
    print("Error:", e)
finally:
    db.close()
