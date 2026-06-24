# Google Stitch Prompt: AI Restaurant Recommender Frontend

**Instructions:** Copy the text below and paste it directly into Google Stitch (or your preferred UI generation tool) to generate the frontend codebase.

---

You are an expert Next.js and Tailwind CSS developer with a strong eye for premium, modern UI/UX design. Please generate a complete, single-page frontend for an "AI-Powered Restaurant Recommendation System".

### Tech Stack
*   Next.js (App Router preferred)
*   React
*   Tailwind CSS
*   Lucide React (for elegant icons)

### Design System & Aesthetics
*   The UI must feel exceptionally premium, engaging, and modern.
*   **Theme:** Default to a sleek, sophisticated Dark Mode (deep charcoal/blacks) with vibrant, harmonious accent colors (like a neon purple or electric blue gradient).
*   **Styling:** Utilize glassmorphism heavily—cards and form panels should have translucent backgrounds with `backdrop-blur`.
*   **Animations:** Include smooth micro-animations. Form inputs should have focus states, buttons should have satisfying click/hover effects, and restaurant cards should slightly scale up (`hover:scale-105`) with a soft glow on hover.
*   **Typography:** Use a modern, clean font like `Inter`, `Outfit`, or `Plus Jakarta Sans`.

### Core Layout & Components

**1. Hero Section:**
*   A visually striking headline (e.g., "Discover Your Next Favorite Meal").
*   A brief, elegant subtitle explaining that AI will curate the perfect spot based on exact preferences.

**2. Preference Form (The Filter Engine):**
Create a visually appealing, grid-based form containing:
*   **Location:** Text input (Placeholder: "e.g., Bellandur, Bangalore").
*   **Budget:** Custom stylized Radio buttons or a Dropdown (Low, Medium, High).
*   **Cuisine:** Text input (Placeholder: "e.g., Italian, Sushi").
*   **Minimum Rating:** A styled range slider (1.0 to 5.0) or a number input.
*   **Fuzzy Constraints (AI Prompt):** A spacious Textarea for additional preferences (Placeholder: "e.g., Looking for a quiet, romantic setup for an anniversary dinner...").
*   **Submit Button:** A large, prominent button ("Get AI Recommendations"). Include a mock loading state (spinner/pulse) when clicked.

**3. Results Display (Restaurant Cards):**
Below the form, display a responsive grid (1 column on mobile, 2 or 3 on desktop) of recommended restaurant cards.
Each card MUST include:
*   Restaurant Name (Prominent heading)
*   Cuisine tags/badges
*   Rating (with a star icon) & Estimated Cost
*   Location/Address
*   **The AI Explanation:** A distinct, highlighted box or blockquote inside the card titled "Why we chose this:" that displays the AI-generated reason for the recommendation.

### Mock Data Requirement
To ensure the UI renders perfectly out of the box, wire the UI to use this mock JSON data when the submit button is clicked (simulate a 2-second loading delay):

```json
[
  {
    "id": 1,
    "name": "The Pizza Bakery",
    "location": "The Bay at Ecoworld, Bellandur",
    "cuisine": "Italian, Pizza",
    "cost": 1500,
    "rating": 4.4,
    "explanation": "Perfectly hits your 1500 budget while offering an exceptional 4.4-rated authentic Italian pizza experience right in the heart of Bellandur."
  },
  {
    "id": 2,
    "name": "Tango Kitchen & Bar",
    "location": "Bellandur",
    "cuisine": "Multicuisine",
    "cost": 1400,
    "rating": 4.7,
    "explanation": "With an outstanding 4.7 rating, this spot offers a premium multicuisine menu and great ambiance well within your specified budget."
  }
]
```
