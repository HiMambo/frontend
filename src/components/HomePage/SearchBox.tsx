"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CustomSelect } from "./CustomSelect";
import { DateRangeSelect } from "./DateRangeSelect";
import { SearchIcon } from "@/components/shared/IconComponents";
import { useSearch } from "@/context/SearchContext";

export default function SearchBox() {
  const router = useRouter();
  const { searchParams, setSearchQuery, setTravellers, setDate, setExperienceType } = useSearch();

  const handleSearch = () => {
    router.push("/experiencepage/");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div
      className="bg-home-searchbox rounded-600 px-[var(--spacing-600)] py-[var(--spacing-400)] flex items-end gap-[var(--spacing-1200)] mx-auto"
      style={{
        width: "min(74vw, 1421px)",
        minWidth: "700px",
      }}
    >
      {/* Section 1: Search Input (flexible) */}
      <div className="flex-1 flex items-center bg-white text-tertiary rounded-300 px-4 h-10">
        <input
          type="text"
          placeholder="Search activities or destination"
          value={searchParams.searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full bg-transparent body-s focus:outline-none h-full"
        />
        <button onClick={handleSearch} className="ml-2 cursor-pointer">
          <SearchIcon className="icon-s" />
        </button>
      </div>

      {/* Section 2: Search Parameters */}
      <div className="flex gap-[var(--spacing-800)]">
        <div className="flex-1">
          <CustomSelect<number>
            label="Travellers"
            value={searchParams.travellers}
            setValue={setTravellers}
            minVal={1}
            maxVal={12}
          />
        </div>

        <div className="flex-1 min-w-[170px]">
          <DateRangeSelect value={searchParams.date} onChange={setDate} />
        </div>

        <div className="flex-1 min-w-[180px]">
          <CustomSelect<string>
            label="Experience Type"
            options={["Any", "Nature & Wildlife", "Cultural Immersion", "Adventure & Outdoor", "Wellness & Retreats", "Social Impact", "Food & Gastronomy"]}
            value={searchParams.experienceType}
            setValue={setExperienceType}
          />
        </div>
      </div>

      {/* Section 3: Button */}
      <div className="flex-none">
        <Button
          size="lg"
          className="bg-home-button body-l-button text-inverted px-10 py-2 rounded-md hover:bg-[#0d5d56] hover:text-inverted hover:shadow-lg"
          onClick={handleSearch}
        >
          Search now
        </Button>
      </div>

    </div>
  );
}
