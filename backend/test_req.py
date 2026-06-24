import requests

try:
    response = requests.post(
        "http://localhost:8000/api/recommend",
        json={
            "location": "",
            "budget": "medium",
            "cuisine": "",
            "min_rating": 4.0,
            "additional_preferences": ""
        }
    )
    print("Status:", response.status_code)
    print("Response:", response.text)
except Exception as e:
    print("Error:", e)
