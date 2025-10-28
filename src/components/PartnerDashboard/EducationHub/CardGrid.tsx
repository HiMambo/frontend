"use client";

import { FaHeart, FaPlay, FaNewspaper, FaMicrophone } from "react-icons/fa";

type ContentType = "video" | "article" | "podcast";

export type CardType = {
  id: string;
  title: string;
  author: string;
  rating: string;
  contentType: ContentType;
  bullets?: string[];
};

interface Props {
  cards: CardType[];
  favoriteCards: Set<string>;
  onToggleFavorite: (id: string) => void;
  onExpand: (card: CardType) => void;
}

export default function CardGrid({ cards, favoriteCards, onToggleFavorite, onExpand }: Props) {
  const contentIcon = (type: ContentType) => {
    if (type === "video") return <FaPlay />;
    if (type === "article") return <FaNewspaper />;
    return <FaMicrophone />;
  };

  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((card) => (
        <div
          key={card.id}
          className="relative rounded-[22px] bg-white border border-[#EFEAE4] shadow-sm hover:shadow-md transition"
        >
          <button
            onClick={() => onToggleFavorite(card.id)}
            className="absolute right-3 top-3 z-10 grid place-items-center h-9 w-9 rounded-full bg-white/90 ring-1 ring-black/5 hover:ring-black/10"
          >
            <FaHeart
              className={`h-[18px] w-[18px] ${
                favoriteCards.has(card.id) ? "text-[#E74C3C]" : "text-[#CFCBC6]"
              }`}
            />
          </button>

          <div className="h-[180px] grid place-items-center bg-[radial-gradient(circle,_rgba(0,0,0,0.12)_1px,_transparent_1px)] [background-size:14px_14px]">
            <div className="grid place-items-center h-[68px] w-[68px] rounded-full bg-white shadow">
              <span className="grid place-items-center h-11 w-11 rounded-full bg-[#111111] text-white">
                {contentIcon(card.contentType)}
              </span>
            </div>
          </div>

          <div className="p-6">
            <h3 className="text-[18px] font-extrabold text-[#443A33]">{card.title}</h3>
            <p className="mt-3 text-[15px] text-[#6F6B67]">{card.author}</p>

            <ul className="mt-3 space-y-1.5 text-[15px] text-[#6F6B67]">
              {card.bullets?.map((b, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-[8px] h-1.5 w-1.5 rounded-full bg-[#D9D3CC]" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <div className="mt-5 flex items-center justify-between">
              <span className="inline-flex px-2 h-6 items-center rounded-md bg-[#FFE9D6] text-[#E67E22] font-bold text-xs">
                {card.rating}
              </span>
              <button
                onClick={() => onExpand(card)}
                className="text-[15px] font-semibold text-[#B2A89C]"
              >
                Learn More →
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
