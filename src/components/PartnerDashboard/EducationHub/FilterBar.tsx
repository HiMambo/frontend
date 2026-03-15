"use client";

import { FaFilter, FaHeart, FaPlay, FaNewspaper, FaMicrophone } from "react-icons/fa";
import { BrandButton } from "@/components/brand";

export type FilterKey = "Favorites" | "Video" | "Article" | "Podcast" | "All";

interface Props {
  selected: FilterKey;
  onChange: (f: FilterKey) => void;
}

export default function FilterBar({ selected, onChange }: Props) {
  const filters: FilterKey[] = ["Favorites", "Video", "Article", "Podcast", "All"];

  return (
    <div className="flex items-center gap-3">
      <BrandButton size="M">
        <FaFilter className="h-3.5 w-3.5" />
        Filters
      </BrandButton>

      {filters.map((f) => (
        <BrandButton
          key={f}
          onClick={() => onChange(f)}
          color="blue"
          selected={selected === f}
          variant="outline"
          size="M"
        >
          {f === "Favorites" && <FaHeart className="h-3.5 w-3.5" />}
          {f === "Video" && <FaPlay className="h-3.5 w-3.5" />}
          {f === "Article" && <FaNewspaper className="h-3.5 w-3.5" />}
          {f === "Podcast" && <FaMicrophone className="h-3.5 w-3.5" />}
          {f}
        </BrandButton>
      ))}
    </div>
  );
}
