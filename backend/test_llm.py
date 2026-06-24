import sys
import os

sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from services.llm_service import get_ai_recommendations
from core.config import settings

print(f"Key: {settings.GROQ_API_KEY[:5]}...")
print(f"Model: {settings.GROQ_MODEL}")

restaurants = [
    {"id": 1, "name": "Bistro", "cuisine": "French", "rating": 4.5, "cost": 1000},
    {"id": 2, "name": "Pasta Place", "cuisine": "Italian", "rating": 4.2, "cost": 800}
]

res = get_ai_recommendations(restaurants, "romantic dinner")
print("Response:", res)
