from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from database import SessionLocal, Restaurant
from schemas import RecommendationRequest, RestaurantResponse
from services.llm_service import get_ai_recommendations

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def map_budget_to_cost(budget: str):
    """
    Maps a qualitative budget string to a min and max cost range.
    Assuming costs are in Indian Rupees (Zomato default).
    """
    budget = budget.lower().strip()
    if budget == 'low':
        return (0, 500)
    elif budget == 'medium':
        return (500, 1500)
    elif budget == 'high':
        return (1500, 100000)
    return (0, 100000) # Default to no upper limit if unknown

@router.post("/recommend", response_model=List[RestaurantResponse])
def get_recommendations(request: RecommendationRequest, db: Session = Depends(get_db)):
    """
    Receives user preferences, queries the SQLite database for deterministic
    hard filters, and returns the filtered list.
    (In Phase 3, this list will be sent to the Groq LLM for final ranking/explanation).
    """
    query = db.query(Restaurant)
    
    # 1. Location Filter (Case-insensitive LIKE)
    query = query.filter(Restaurant.location.ilike(f"%{request.location}%"))
    
    # 2. Cuisine Filter
    if request.cuisine:
        query = query.filter(Restaurant.cuisine.ilike(f"%{request.cuisine}%"))
        
    # 3. Minimum Rating Filter
    if request.min_rating is not None and request.min_rating > 0:
        query = query.filter(Restaurant.rating >= request.min_rating)
        
    # 4. Budget Filter
    if request.budget:
        min_cost, max_cost = map_budget_to_cost(request.budget)
        query = query.filter(Restaurant.cost >= min_cost, Restaurant.cost <= max_cost)
    
    # Group by name to avoid duplicate entries for the same restaurant
    query = query.group_by(Restaurant.name)
    
    # Execute query, limit to 50 to avoid large context sizes later
    results = query.limit(50).all()
    
    if not results:
        return []
        
    # Serialize results to pass to LLM
    restaurants_data = [
        {
            "id": r.id,
            "name": r.name,
            "cuisine": r.cuisine,
            "rating": r.rating,
            "cost": r.cost
        }
        for r in results
    ]
    
    # Call Groq LLM
    ai_recs = get_ai_recommendations(restaurants_data, request.additional_preferences)
    
    # Filter the original results to only include the AI recommendations
    final_results = []
    for r in results:
        if r.id in ai_recs:
            final_results.append(
                RestaurantResponse(
                    id=r.id,
                    name=r.name,
                    location=r.location,
                    cuisine=r.cuisine,
                    cost=r.cost,
                    rating=r.rating,
                    explanation=ai_recs[r.id]
                )
            )
            
    # Sort them in the order they were recommended
    rec_order = {id: idx for idx, id in enumerate(ai_recs.keys())}
    final_results.sort(key=lambda x: rec_order.get(x.id, 999))
    
    return final_results
