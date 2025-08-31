"use client";

import { useState, useCallback, useMemo } from "react";
import {
  FaPlay,
  FaNewspaper,
  FaMicrophone,
  FaHeart,
  FaFilter,
} from "react-icons/fa";
import {
  BrandButton,
} from "@/components/brand";

type ContentType = "video" | "article" | "podcast";

type FilterTypes = {
  Filters: "all";
  Favorites: "favorites";
  Videos: "video";
  Articles: "article";
  Podcast: "podcast";
  All: "all";
};

type CardType = {
  id: string;
  title: string;
  author: string; 
  progress: string;
  rating: string;
  contentType: ContentType;
  contentUrl: string;
  thumbnail: string;
  bullets?: string[];
};

type SortOption =
  | "Alphabetic Order"
  | "Most Popular"
  | "Most Recent"
  | "Best Rating";

type CategoryType =
  | "All"
  | "Marketing Content"
  | "Blockchain / Crypto"
  | "Sustainability";

type RatingDetails = {
  [rating: string]: {
    total: number;
    breakdown: { 5: number; 4: number; 3: number; 2: number; 1: number };
  };
};

export default function EducationHub() {
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryType>("All");
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [selectedSort, setSelectedSort] =
    useState<SortOption>("Most Popular");
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [favoriteCards, setFavoriteCards] = useState<Set<string>>(
    new Set()
  );

  const toggleFavorite = useCallback((cardId: string) => {
    setFavoriteCards((prev) => {
      const s = new Set(prev);
      s.has(cardId) ? s.delete(cardId) : s.add(cardId);
      return s;
    });
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const filterData: FilterTypes = {
    Filters: "all",
    Favorites: "favorites",
    Videos: "video",
    Articles: "article",
    Podcast: "podcast",
    All: "all",
  } as const;

  type FilterKey = keyof typeof filterData;
  const [selectedFilter, setSelectedFilter] = useState<FilterKey>("All");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const cardsData: Record<string, CardType[]> = {
    "Marketing Content": [
      {
        id: "mk-1",
        title: "How to Get Your Business Certified for the SDGs",
        author:
          "Learn step-by-step how your business can achieve SDG certification to demonstrate commitment to sustainable development.",
        progress: "",
        rating: "4.8/5",
        contentType: "video",
        contentUrl: "",
        thumbnail: "",
        bullets: ["Boosts reputation", "Get a certificate of…"],
      },
      {
        id: "mk-2",
        title: "How to Get Your Business Certified for the SDGs",
        author:
          "Learn step-by-step how your business can achieve SDG certification to demonstrate commitment to sustainable development.",
        progress: "",
        rating: "4.8/5",
        contentType: "video",
        contentUrl: "",
        thumbnail: "",
        bullets: ["Learn how to…", "Get a certificate of…"],
      },
    ],
    "Blockchain / Crypto": [
      {
        id: "bc-1",
        title: "How to Get Your Business Certified for the SDGs",
        author:
          "Learn step-by-step how your business can achieve SDG certification to demonstrate commitment to sustainable development.",
        progress: "",
        rating: "4.8/5",
        contentType: "video",
        contentUrl: "",
        thumbnail: "",
        bullets: ["Boosts reputation", "Get a certificate of…"],
      },
    ],
    Sustainability: [
      {
        id: "sus-1",
        title: "How to Get Your Business Certified for the SDGs",
        author:
          "Learn step-by-step how your business can achieve SDG certification to demonstrate commitment to sustainable development.",
        progress: "",
        rating: "4.8/5",
        contentType: "video",
        contentUrl: "",
        thumbnail: "",
        bullets: ["Boosts reputation", "Get a certificate of…"],
      },
      {
        id: "sus-2",
        title: "How to Get Your Business Certified for the SDGs",
        author:
          "Learn step-by-step how your business can achieve SDG certification to demonstrate commitment to sustainable development.",
        progress: "",
        rating: "4.8/5",
        contentType: "video",
        contentUrl: "",
        thumbnail: "",
        bullets: ["Learn how to…", "Get a certificate of…"],
      },
      {
        id: "sus-3",
        title: "How to Get Your Business Certified for the SDGs",
        author:
          "Learn step-by-step how your business can achieve SDG certification to demonstrate commitment to sustainable development.",
        progress: "",
        rating: "4.8/5",
        contentType: "video",
        contentUrl: "",
        thumbnail: "",
        bullets: ["Boosts reputation", "Get a certificate of…"],
      },
    ],
  };

  const getAllCards = useCallback(
    (): CardType[] => Object.values(cardsData).flat(),
    [cardsData]
  );

  const displayedCards = useMemo(() => {
    let cards =
      selectedCategory === "All"
        ? getAllCards()
        : cardsData[selectedCategory] || [];

    if (selectedFilter === "Favorites") {
      cards = cards.filter((c) => favoriteCards.has(c.id));
    } else if (
      selectedFilter !== "All" &&
      selectedFilter !== "Filters"
    ) {
      const ct = filterData[selectedFilter] as ContentType;
      cards = cards.filter((c) => c.contentType === ct);
    }

    switch (selectedSort) {
      case "Alphabetic Order":
        return [...cards].sort((a, b) => a.title.localeCompare(b.title));
      case "Most Popular":
      case "Best Rating":
        return [...cards].sort(
          (a, b) => parseFloat(b.rating) - parseFloat(a.rating)
        );
      default:
        return cards;
    }
  }, [selectedCategory, getAllCards, cardsData, selectedFilter, selectedSort, favoriteCards, filterData]);

  const ratingDetails: RatingDetails = {
    "4.8/5": {
      total: 270,
      breakdown: { 5: 200, 4: 50, 3: 15, 2: 4, 1: 1 },
    },
  };


  const contentIcon = (type: ContentType) => {
    if (type === "video") return <FaPlay className="w-5 h-5 translate-x-[1px]" />;
    if (type === "article") return <FaNewspaper className="w-5 h-5" />;
    return <FaMicrophone className="w-5 h-5" />;
  };

  return (
    <div className="min-h-screen bg-[#F1EFEA]">
      <div className="mx-auto max-w-7xl px-6 pt-10 pb-4">
        <h1 className="text-[44px] leading-none font-extrabold text-[#322C28]">
          HiMambo Education
        </h1>

        <div className="mt-6 flex flex-col">
          <div className="md:col-span-8 mb-3">
            <div className="flex flex-wrap gap-3">
              {(
                ["All", "Marketing Content", "Blockchain / Crypto", "Sustainability","Premium"] as CategoryType[]
              ).map((cat) => (
                <BrandButton
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
             selected={selectedCategory === cat}
          variant="outline"
                >
                  {cat}
                </BrandButton>
              ))}
            </div>
          </div>

          <div className="md:col-span-4 flex items-center justify-between md:justify-start gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <BrandButton size="M">
                <FaFilter className="h-3.5 w-3.5" />
                Filters
              </BrandButton>

              {(
                ["Favorites", "Videos", "Articles", "Podcast", "All"] as FilterKey[]
              ).map((f) => (
                <BrandButton
                  key={f}
                  onClick={() => setSelectedFilter(f)}
                  color="blue"
                  selected={selectedFilter === f}
                  variant="outline"
                  size="M"
                >
                  {f === "Favorites" && <FaHeart className="h-3.5 w-3.5" />}
                  {f === "Videos" && <FaPlay className="h-3.5 w-3.5" />}
                  {f === "Articles" && <FaNewspaper className="h-3.5 w-3.5" />}
                  {f === "Podcast" && <FaMicrophone className="h-3.5 w-3.5" />}
                  {f}
                </BrandButton>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 pb-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {displayedCards.map((card, idx) => (
            <div
              key={card.id}
              className="relative rounded-[22px] bg-white border border-[#EFEAE4] shadow-sm hover:shadow-md transition"
            >
              <button
                onClick={() => toggleFavorite(card.id)}
                className="absolute right-3 top-3 z-10 grid place-items-center h-9 w-9 rounded-full bg-white/90 ring-1 ring-black/5 hover:ring-black/10 shadow-[0_1px_0_rgba(0,0,0,.04),0_6px_18px_rgba(0,0,0,.06)]"
                aria-label="favorite"
              >
                <FaHeart
                  className={`h-[18px] w-[18px] ${
                    favoriteCards.has(card.id) ? "text-[#E74C3C]" : "text-[#CFCBC6]"
                  }`}
                />
              </button>

              <div className="relative rounded-t-[22px] overflow-hidden">
                <div className="h-[180px] w-full 
                    bg-[radial-gradient(circle,_rgba(0,0,0,0.12)_1px,_transparent_1px)]
                    [background-size:14px_14px] [background-position:8px_8px]
                    grid place-items-center">
                  <div className="grid place-items-center h-[68px] w-[68px] rounded-full bg-white 
                      ring-1 ring-black/5 shadow-[0_1px_0_rgba(0,0,0,.05),_0_10px_30px_rgba(0,0,0,.06)]">
                    <span className="grid place-items-center h-11 w-11 rounded-full bg-[#111111] text-white">
                      {contentIcon(card.contentType)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-[18px] font-extrabold text-[#443A33]">
                  {card.title}
                </h3>
                <p className="mt-3 text-[15px] leading-snug text-[#6F6B67]">
                  {card.author}
                </p>

                <ul className="mt-3 space-y-1.5 text-[15px] text-[#6F6B67]">
                  {card.bullets?.map((b, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-[8px] h-1.5 w-1.5 rounded-full bg-[#D9D3CC]" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex h-6 min-w-[2rem] px-2 items-center justify-center rounded-md text-xs font-extrabold bg-[#FFE9D6] text-[#E67E22]">
                      {card.rating.replace("/5", "")}
                    </span>
                    <button className="text-xs text-[#9C9790] hover:underline underline-offset-2">
                      {ratingDetails[card.rating]?.total ?? 270} reviews
                    </button>
                  </div>

                  <button
                    onClick={() =>
                      setExpandedCard(expandedCard === idx ? null : idx)
                    }
                    className="group inline-flex items-center gap-2 text-[15px] font-semibold text-[#B2A89C]"
                  >
                    Learn More
                    <span className="grid place-items-center h-6 w-6 rounded-full bg-[#F2F1EE]">
                      <span className="transition-transform group-hover:translate-x-[1px]">
                        →
                      </span>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {expandedCard !== null && (
        <>
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
            onClick={() => setExpandedCard(null)}
          />
          <div className="fixed inset-0 z-50 grid place-items-center p-4">
            <div className="relative w-full max-w-3xl rounded-2xl bg-white shadow-2xl">
              <button
                onClick={() => setExpandedCard(null)}
                className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
                aria-label="close"
              >
                ✕
              </button>
              <div className="p-8">
                <h2 className="text-2xl font-bold mb-3">
                  {displayedCards[expandedCard].title}
                </h2>
                <p className="text-[#6B6B6B]">
                  Detailed course overview… (placeholder)
                </p>
              </div>
            </div>
          </div>
        </>
      )}

      {showPremiumModal && (
        <>
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
            onClick={() => setShowPremiumModal(false)}
          />
          <div className="fixed inset-0 z-50 grid place-items-center p-4">
            <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
              <button
                onClick={() => setShowPremiumModal(false)}
                className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
                aria-label="close"
              >
                ✕
              </button>
              <h3 className="text-lg font-semibold">Premium Content</h3>
              <p className="mt-2 text-sm text-[#6B6B6B]">
                Subscribe to access HiMambo’s Education Hub premium content.
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
