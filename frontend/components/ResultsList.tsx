import React from 'react';
import RestaurantCard from './RestaurantCard';

export default function ResultsList({ results, loading, hasSearched }: { results: any[], loading: boolean, hasSearched?: boolean }) {
  if (!loading && results.length === 0 && !hasSearched) return null;

  if (!loading && results.length === 0 && hasSearched) {
    return (
      <section className="mt-16 max-w-7xl mx-auto w-full text-center animate-fade-in-up" id="empty-state">
        <div className="bg-surface-container/50 backdrop-blur-xl border border-white/10 rounded-2xl p-12">
          <span className="material-symbols-outlined text-6xl text-primary mb-4">search_off</span>
          <h2 className="font-headline-lg text-headline-lg text-on-surface mb-2">No Matches Found</h2>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-lg mx-auto">
            We couldn't find any restaurants matching your specific criteria. Try expanding your search by selecting a different location, cuisine, or budget.
          </p>
        </div>
      </section>
    );
  }

  return (
    <>
      {loading && (
        <section className="mt-16 max-w-7xl mx-auto w-full" id="loading-state">
          <div className="text-center mb-8 animate-pulse">
            <h2 className="font-headline-lg text-headline-lg text-primary flex items-center justify-center gap-2">
              <span className="material-symbols-outlined animate-spin text-4xl">graphic_eq</span>
              Synthesizing Matches...
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className={`bg-surface-container rounded-2xl h-[400px] relative overflow-hidden border border-white/5 shadow-xl ${i > 1 ? 'hidden md:block' : ''} ${i > 2 ? 'hidden lg:block' : ''}`}>
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent animate-[shimmer_1.5s_infinite]" style={{ animationDelay: `${(i-1)*0.2}s` }}></div>
                <div className="h-48 bg-surface-container-highest"></div>
                <div className="p-6 flex flex-col gap-4">
                  <div className="h-6 w-3/4 bg-surface-container-highest rounded-md"></div>
                  <div className="h-4 w-1/2 bg-surface-container-highest rounded-md"></div>
                  <div className="h-20 w-full bg-primary/10 rounded-lg mt-auto border border-primary/20"></div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {!loading && results.length > 0 && (
        <section className="mt-16 max-w-7xl mx-auto w-full animate-fade-in-up" id="results-section">
          <div className="flex items-end justify-between mb-8 border-b border-white/10 pb-4">
            <div>
              <h2 className="font-headline-lg text-headline-lg text-on-surface">Curated For You</h2>
              <p className="font-body-md text-body-md text-primary mt-1">Found {results.length} extraordinary matches based on your mood.</p>
            </div>
            <div className="hidden md:flex gap-2">
              <button className="bg-surface-container px-4 py-2 rounded-lg border border-white/10 text-on-surface hover:bg-surface-variant transition-colors flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">map</span> View Map
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {results.map((r, i) => (
              <RestaurantCard key={r.id || i} restaurant={r} index={i} />
            ))}

          </div>
        </section>
      )}
    </>
  );
}
