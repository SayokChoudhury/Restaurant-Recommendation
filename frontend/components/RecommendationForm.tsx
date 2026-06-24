"use client";
import React, { useState } from 'react';

const LOCATIONS = [
  "BTM", "Banashankari", "Banaswadi", "Bannerghatta Road", "Basavanagudi", 
  "Basaveshwara Nagar", "Bellandur", "Bommanahalli", "Brigade Road", "Brookefield", 
  "CV Raman Nagar", "Central Bangalore", "Church Street", "City Market", 
  "Commercial Street", "Cunningham Road", "Domlur", "East Bangalore", "Ejipura", 
  "Electronic City", "Frazer Town", "HBR Layout", "HSR", "Hebbal", "Hennur", 
  "Hosur Road", "ITPL Main Road, Whitefield", "Indiranagar", "Infantry Road", 
  "JP Nagar", "Jakkur", "Jalahalli", "Jayanagar", "Jeevan Bhima Nagar", "KR Puram", 
  "Kaggadasapura", "Kalyan Nagar", "Kammanahalli", "Kanakapura Road", "Kengeri", 
  "Koramangala", "Koramangala 1st Block", "Koramangala 2nd Block", 
  "Koramangala 3rd Block", "Koramangala 4th Block", "Koramangala 5th Block", 
  "Koramangala 6th Block", "Koramangala 7th Block", "Koramangala 8th Block", 
  "Kumaraswamy Layout", "Langford Town", "Lavelle Road", "MG Road", "Magadi Road", 
  "Majestic", "Malleshwaram", "Marathahalli", "Mysore Road", "Nagarbhavi", 
  "Nagawara", "New BEL Road", "North Bangalore", "Old Airport Road", "Old Madras Road", 
  "Peenya", "RT Nagar", "Race Course Road", "Rajajinagar", "Rajarajeshwari Nagar", 
  "Rammurthy Nagar", "Residency Road", "Richmond Road", "Sadashiv Nagar", 
  "Sahakara Nagar", "Sanjay Nagar", "Sankey Road", "Sarjapur Road", "Seshadripuram", 
  "Shanti Nagar", "Shivajinagar", "South Bangalore", "St. Marks Road", "Thippasandra", 
  "Ulsoor", "Uttarahalli", "Varthur Main Road, Whitefield", "Vasanth Nagar", 
  "Vijay Nagar", "West Bangalore", "Whitefield", "Wilson Garden", "Yelahanka", 
  "Yeshwantpur"
];

const CUISINES = [
  "Afghan", "African", "American", "Andhra", "Arabian", "Asian", "Assamese", "Awadhi",
  "Bakery", "Bar Food", "BBQ", "Bengali", "Beverages", "Bihari", "Biryani", "Burger",
  "Cafe", "Cantonese", "Chettinad", "Chinese", "Continental", "Desserts", "European",
  "Fast Food", "French", "Goan", "Greek", "Gujarati", "Healthy Food", "Hyderabadi",
  "Ice Cream", "Indonesian", "Italian", "Japanese", "Juices", "Kashmiri", "Kerala",
  "Korean", "Lebanese", "Lucknowi", "Maharashtrian", "Malaysian", "Mangalorean",
  "Mediterranean", "Mexican", "Middle Eastern", "Mithai", "Modern Indian", "Mughlai",
  "Naga", "Nepalese", "North Eastern", "North Indian", "Oriya", "Parsi", "Pizza",
  "Portuguese", "Rajasthani", "Rolls", "Russian", "Salad", "Sandwich", "Seafood",
  "Sindhi", "South American", "South Indian", "Spanish", "Sri Lankan", "Steak",
  "Street Food", "Sushi", "Tamil", "Tea", "Tex-Mex", "Thai", "Tibetan", "Turkish",
  "Vegan", "Vietnamese", "Wraps"
];

export default function RecommendationForm({ 
  onResults, 
  setLoading 
}: { 
  onResults: (data: any) => void, 
  setLoading: (loading: boolean) => void 
}) {
  const [location, setLocation] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [budget, setBudget] = useState('medium');
  const [rating, setRating] = useState('4.0');
  const [prompt, setPrompt] = useState('');
  const [isFetching, setIsFetching] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsFetching(true);
    setLoading(true);
    
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
      const cleanApiUrl = apiUrl.endsWith('/') ? apiUrl.slice(0, -1) : apiUrl;
      const response = await fetch(`${cleanApiUrl}/api/recommend`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          location: location,
          budget: budget,
          cuisine: cuisine,
          min_rating: parseFloat(rating),
          additional_preferences: prompt
        }),
      });
      
      if (!response.ok) throw new Error("API Error");
      const data = await response.json();
      onResults(data);
      setIsFetching(false);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch recommendations", error);
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
      const cleanApiUrl = apiUrl.endsWith('/') ? apiUrl.slice(0, -1) : apiUrl;
      alert(`API Connection Failed!\nAttempted to connect to: ${cleanApiUrl}/api/recommend\n\nIf the URL above says 127.0.0.1, it means you need to add NEXT_PUBLIC_API_URL to your Vercel Environment Variables and redeploy.\n\nIf the URL is correct, your Railway backend is likely crashing or taking too long to respond.`);
      setIsFetching(false);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[24px] p-6 md:p-10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter mb-8">
        <div className="flex flex-col gap-2">
          <label className="font-label-md text-label-md text-on-surface-variant flex items-center gap-2" htmlFor="location">
            <span className="material-symbols-outlined text-[18px]">location_on</span> Location
          </label>
          <select 
            value={location} onChange={(e) => setLocation(e.target.value)}
            className="bg-surface-container-highest/40 border border-outline-variant/50 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-colors appearance-none" 
            id="location"
          >
            <option value="">Select a location...</option>
            {LOCATIONS.map(loc => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-label-md text-label-md text-on-surface-variant flex items-center gap-2" htmlFor="cuisine">
            <span className="material-symbols-outlined text-[18px]">restaurant</span> Cuisine
          </label>
          <select 
            value={cuisine} onChange={(e) => setCuisine(e.target.value)}
            className="bg-surface-container-highest/40 border border-outline-variant/50 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-colors appearance-none" 
            id="cuisine"
          >
            <option value="">Any Cuisine</option>
            {CUISINES.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2 md:col-span-2 lg:col-span-1">
          <label className="font-label-md text-label-md text-on-surface-variant flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">payments</span> Budget
          </label>
          <div className="grid grid-cols-3 gap-3">
            <label className="relative cursor-pointer">
              <input onChange={(e) => setBudget(e.target.value)} checked={budget === 'low'} className="peer sr-only" name="budget" type="radio" value="low"/>
              <div className="w-full text-center py-3 rounded-xl border border-outline-variant/50 bg-surface-container-highest/40 text-on-surface-variant peer-checked:bg-primary/20 peer-checked:border-primary peer-checked:text-primary transition-all font-label-md text-label-md">Low</div>
            </label>
            <label className="relative cursor-pointer">
              <input onChange={(e) => setBudget(e.target.value)} checked={budget === 'medium'} className="peer sr-only" name="budget" type="radio" value="medium"/>
              <div className="w-full text-center py-3 rounded-xl border border-outline-variant/50 bg-surface-container-highest/40 text-on-surface-variant peer-checked:bg-primary/20 peer-checked:border-primary peer-checked:text-primary transition-all font-label-md text-label-md">Medium</div>
            </label>
            <label className="relative cursor-pointer">
              <input onChange={(e) => setBudget(e.target.value)} checked={budget === 'high'} className="peer sr-only" name="budget" type="radio" value="high"/>
              <div className="w-full text-center py-3 rounded-xl border border-outline-variant/50 bg-surface-container-highest/40 text-on-surface-variant peer-checked:bg-primary/20 peer-checked:border-primary peer-checked:text-primary transition-all font-label-md text-label-md">High</div>
            </label>
          </div>
        </div>

        <div className="flex flex-col gap-2 md:col-span-2 lg:col-span-1">
          <label className="font-label-md text-label-md text-on-surface-variant flex justify-between items-center" htmlFor="rating">
            <span className="flex items-center gap-2"><span className="material-symbols-outlined text-[18px]">star</span> Min Rating</span>
            <span className="text-primary font-bold">{rating}+</span>
          </label>
          <div className="h-[48px] flex items-center">
            <input 
              value={rating} onChange={(e) => setRating(e.target.value)}
              className="w-full accent-primary h-2 bg-surface-container-highest rounded-full appearance-none outline-none cursor-pointer" 
              id="rating" max="5" min="1" step="0.1" type="range" 
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 md:col-span-2">
          <label className="font-label-md text-label-md text-on-surface-variant flex items-center gap-2" htmlFor="prompt">
            <span className="material-symbols-outlined text-[18px]">auto_awesome</span> AI Prompt (Mood &amp; Vibe)
          </label>
          <textarea 
            value={prompt} onChange={(e) => setPrompt(e.target.value)}
            className="bg-surface-container-highest/40 border border-outline-variant/50 rounded-xl px-4 py-3 text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-colors resize-none" 
            id="prompt" placeholder="e.g., Looking for a quiet, romantic setup for an anniversary dinner with a great wine selection..." rows={3}
          ></textarea>
        </div>
      </div>

      <button 
        type="submit" disabled={isFetching}
        className={`w-full bg-gradient-to-r from-inverse-primary to-secondary-container text-white font-headline-md text-headline-md py-4 rounded-xl shadow-[0_0_20px_rgba(132,43,210,0.4)] hover:shadow-[0_0_30px_rgba(132,43,210,0.7)] transition-all flex justify-center items-center gap-3 relative overflow-hidden group ${isFetching ? 'animate-ai-pulse pointer-events-none' : ''}`}
      >
        <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>
        <span>{isFetching ? 'Processing...' : 'Get AI Recommendations'}</span>
        {!isFetching && <span className="material-symbols-outlined">temp_preferences_custom</span>}
        {isFetching && <span className="material-symbols-outlined animate-spin">progress_activity</span>}
      </button>
    </form>
  );
}
