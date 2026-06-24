from pydantic import BaseModel
from typing import Optional, List, Union

class RecommendationRequest(BaseModel):
    location: str
    budget: str  # e.g., low, medium, high
    cuisine: Optional[str] = None
    min_rating: Optional[float] = 0.0
    additional_preferences: Optional[str] = None

class RestaurantResponse(BaseModel):
    id: int
    name: str
    location: Optional[str] = None
    cuisine: Optional[str] = None
    cost: Union[float, str, None] = None
    rating: Union[float, str, None] = None
    explanation: Optional[str] = None
    
    class Config:
        from_attributes = True
