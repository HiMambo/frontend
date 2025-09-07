"use client";

import { useState, useMemo, useCallback } from "react";
import CategorySelector, { CategoryType } from "./CategorySelector";
import FilterBar, { FilterKey } from "./FilterBar";
import CardGrid, { CardType } from "./CardGrid";

export default function EducationHub() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>("All");
  const [selectedFilter, setSelectedFilter] = useState<FilterKey>("All");
  const [favoriteCards, setFavoriteCards] = useState<Set<string>>(new Set());
  const [expandedCard, setExpandedCard] = useState<CardType | null>(null);

const cardsData = useMemo<Record<CategoryType, CardType[]>>(
  () => ({
    All: [],
    "Marketing Content": [
      {
        id: "mk-1",
        title: "How to Get Your Business Certified for the SDGs",
        author: "Learn step-by-step how your business can achieve SDG certification.",
        rating: "4.8/5",
        contentType: "video",
        bullets: ["Boosts reputation", "Get a certificate of…"],
      },
      {
        id: "mk-2",
        title: "Marketing for SDG Businesses",
        author: "Best practices to promote your certified business.",
        rating: "4.7/5",
        contentType: "article",
        bullets: ["Learn how to…", "Certificate helps marketing…"],
      },
    ],
    "Blockchain / Crypto": [
      {
        id: "bc-1",
        title: "Crypto Compliance & SDGs",
        author: "How blockchain aligns with sustainability goals.",
        rating: "4.6/5",
        contentType: "article",
        bullets: ["Regulation", "Certification"],
      },
    ],
    Sustainability: [
      {
        id: "sus-1",
        title: "Sustainable Tourism",
        author: "Engaging communities responsibly.",
        rating: "4.9/5",
        contentType: "podcast",
        bullets: ["Local impact", "Global recognition"],
      },
      {
        id: "sus-2",
        title: "Green Business Practices",
        author: "Implement eco-friendly policies in your company.",
        rating: "4.8/5",
        contentType: "video",
        bullets: ["Practical steps", "Improve brand reputation"],
      },
      {
        id: "sus-3",
        title: "ESG Metrics Simplified",
        author: "Understanding environmental, social & governance indicators.",
        rating: "4.7/5",
        contentType: "article",
        bullets: ["Track progress", "Boost investor trust"],
      },
    ],
    Premium: [],
  }),
  []
);



  const getAllCards = useCallback(() => Object.values(cardsData).flat(), [cardsData]);

  const displayedCards = useMemo(() => {
    let cards = selectedCategory === "All" ? getAllCards() : cardsData[selectedCategory];

    if (selectedFilter === "Favorites") {
      cards = cards.filter((c) => favoriteCards.has(c.id));
    } else if (selectedFilter !== "All") {
      const type = selectedFilter.toLowerCase() as CardType["contentType"];
      cards = cards.filter((c) => c.contentType === type);
    }

    return cards;
  }, [selectedCategory, selectedFilter, favoriteCards, getAllCards, cardsData]);

const toggleFavorite = (id: string) => {
  setFavoriteCards((prevFavorites) => {
    const updatedFavorites = new Set(prevFavorites);

    if (updatedFavorites.has(id)) {
      updatedFavorites.delete(id);
    } else {
      updatedFavorites.add(id);
    }

    return updatedFavorites;
  });
};


  return (
    <div className="min-h-screen bg-[#F1EFEA]">
      <div className="mx-auto max-w-7xl px-6 pt-10 pb-4">
        <h1 className="text-[44px] font-extrabold text-[#322C28]">HiMambo Education</h1>

        <CategorySelector selected={selectedCategory} onChange={setSelectedCategory} />
        <FilterBar selected={selectedFilter} onChange={setSelectedFilter} />
      </div>

      <div className="mx-auto max-w-7xl px-6 pb-16">
        <CardGrid
          cards={displayedCards}
          favoriteCards={favoriteCards}
          onToggleFavorite={toggleFavorite}
          onExpand={setExpandedCard}
        />
      </div>

      {expandedCard && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/30">
          <div className="bg-white rounded-2xl p-8 max-w-lg w-full relative">
            <button onClick={() => setExpandedCard(null)} className="absolute top-4 right-4">✕</button>
            <h2 className="text-2xl font-bold mb-4">{expandedCard.title}</h2>
            <p>{expandedCard.author}</p>
          </div>
        </div>
      )}
    </div>
  );
}
