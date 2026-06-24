"use client";
import { useState } from "react";
import RecommendationForm from "../components/RecommendationForm";
import ResultsList from "../components/ResultsList";

export default function Home() {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  return (
    <main className="flex-grow pt-[100px] pb-32 md:pb-24 px-margin-mobile md:px-margin-desktop max-w-[1440px] mx-auto w-full flex flex-col relative z-10">
      <section className="text-center max-w-3xl mx-auto mt-lg mb-xl relative z-10">
        <h1 className="font-display-lg text-display-lg md:text-[64px] md:leading-[1.1] bg-clip-text text-transparent bg-gradient-to-br from-white via-primary to-secondary mb-6 tracking-tight">
          Discover Your Next Favorite Meal
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
          Our AI engine curates the perfect dining spot based on your exact mood, budget, and cravings. Experience effortless culinary discovery.
        </p>
      </section>

      <section className="max-w-4xl mx-auto w-full relative z-10">
        <div className="absolute -inset-1 bg-gradient-to-r from-primary-container/20 to-secondary/20 rounded-2xl blur-2xl opacity-50"></div>
        <RecommendationForm onResults={(data) => { setResults(data); setHasSearched(true); }} setLoading={setLoading} />
      </section>
      
      <ResultsList results={results} loading={loading} hasSearched={hasSearched} />
    </main>
  );
}
