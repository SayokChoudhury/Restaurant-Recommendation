import json
from groq import Groq
from core.config import settings

# Initialize Groq client. It will use the GROQ_API_KEY from settings.
client = Groq(api_key=settings.GROQ_API_KEY) if settings.GROQ_API_KEY else None

def get_ai_recommendations(restaurants_data, user_preferences):
    """
    Takes a list of filtered restaurants and user's fuzzy preferences.
    Calls Groq LLM to rank top 3-5 and generate explanations.
    Returns a dictionary mapping restaurant ID -> explanation.
    """
    if not client:
        # Fallback if no API key is provided
        return {r["id"]: "Groq API key missing. (Mock AI explanation)" for r in restaurants_data[:5]}
        
    prompt = f"""
You are an elite, highly-knowledgeable culinary concierge and restaurant recommender.
The user has the following specific preferences and mood: "{user_preferences or 'Find me the best places'}"

Here is a JSON list of high-quality restaurants that match their basic constraints:
{json.dumps(restaurants_data, indent=2)}

Please select the top 3-5 restaurants from this list that most perfectly align with the user's specific mood and preferences.
You MUST reply in pure JSON format as an object containing a "recommendations" array.
Each object in the array must have exactly two keys:
- "id": the integer ID of the restaurant from the list provided.
- "explanation": a compelling, mouth-watering 1-2 sentence explanation of why this restaurant fits the user's preferences. Speak directly to the user in a sophisticated, engaging tone.

Output format:
{{
  "recommendations": [
    {{"id": 10, "explanation": "With its exquisite ambiance and premium wine selection, this spot perfectly captures the romantic anniversary vibe you're looking for."}}
  ]
}}
"""
    try:
        response = client.chat.completions.create(
            messages=[
                {
                    "role": "system",
                    "content": "You are a helpful JSON-only API assistant."
                },
                {
                    "role": "user",
                    "content": prompt,
                }
            ],
            model=settings.GROQ_MODEL,
            temperature=0.7,
            response_format={"type": "json_object"}
        )
        content = response.choices[0].message.content
        
        # Clean up potential markdown formatting from LLM response
        if content.strip().startswith("```json"):
            content = content.strip()[7:-3]
        elif content.strip().startswith("```"):
            content = content.strip()[3:-3]
            
        parsed = json.loads(content.strip())
        
        recs = parsed.get("recommendations", [])
        return {int(item["id"]): item["explanation"] for item in recs}
        
    except Exception as e:
        print(f"Error calling Groq API: {e}")
        # Fallback mechanism in case of LLM failure
        return {r["id"]: "Failed to generate AI explanation." for r in restaurants_data[:5]}
