import React from 'react';

export default function RestaurantCard({ restaurant, index }: { restaurant: any, index: number }) {
  // Calculate a fake match percentage based on rating for visual flair
  const matchPercent = Math.min(99, Math.floor((restaurant.rating / 5) * 100) + Math.floor(Math.random() * 5));

  return (
    <article className="group bg-surface-container/50 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/10 hover:border-primary/50 hover:shadow-[0_10px_40px_rgba(168,85,247,0.15)] transition-all duration-300 flex flex-col relative transform hover:-translate-y-1">
      <div className="absolute top-4 left-4 z-20 bg-black/60 backdrop-blur-md border border-primary text-primary px-3 py-1.5 rounded-full font-label-md text-xs uppercase flex items-center gap-1 shadow-lg">
        <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span> 
        {matchPercent}% Match
      </div>
      
      
      <div className="p-6 pt-14 flex flex-col flex-grow z-20 relative">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-headline-md text-headline-md text-on-surface">{restaurant.name}</h3>
          <div className="flex items-center gap-1 bg-surface-variant px-2 py-1 rounded-md">
            <span className="material-symbols-outlined text-tertiary-container text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
            <span className="font-label-md text-label-md text-on-surface">{restaurant.rating}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 mb-4 text-on-surface-variant font-body-md text-sm">
          <span className="material-symbols-outlined text-[16px]">location_on</span> {restaurant.location}
        </div>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {restaurant.cuisine ? restaurant.cuisine.split(',').slice(0,3).map((c: string, i: number) => (
            <span key={i} className="bg-white/5 border border-white/10 text-on-surface-variant px-3 py-1 rounded-full text-xs font-label-md">{c.trim()}</span>
          )) : null}
          <span className="bg-white/5 border border-white/10 text-on-surface-variant px-3 py-1 rounded-full text-xs font-label-md flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">payments</span> ₹{restaurant.cost}
          </span>
        </div>
        
        <div className="mt-auto bg-primary/10 border-l-2 border-primary rounded-r-lg p-4 relative overflow-hidden group-hover:bg-primary/[0.15] transition-colors">
          <span className="material-symbols-outlined absolute top-2 right-2 text-primary/20 text-4xl">format_quote</span>
          <h4 className="font-label-md text-xs text-primary uppercase tracking-wider mb-1 flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">psychology</span> AI Insight
          </h4>
          <p className="font-body-md text-sm text-on-surface-variant italic leading-relaxed">
            "{restaurant.explanation || 'An excellent choice matching your exact preferences.'}"
          </p>
        </div>
      </div>
    </article>
  );
}
