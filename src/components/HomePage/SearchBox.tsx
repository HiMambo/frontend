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
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="bg-home-searchbox rounded-600 px-4 py-4 w-full max-w-6xl mx-auto flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
      {/* Search box */}
      <div className="flex items-center bg-white rounded-md px-4 py-2 w-full xl:max-w-90">
        <input
          type="text"
          placeholder="Search activities or destination"
          value={searchParams.searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full bg-transparent text-gray-600 body-s focus:outline-none"
        />
        <button onClick={handleSearch} className="ml-2 cursor-pointer">
          <SearchIcon className="icon-s text-disabled" />
        </button>
      </div>

      {/* Filters and Button in the same row on smaller screens*/}
      <div className="flex flex-wrap items-end justify-center xl:justify-between gap-4 w-full text-black text-sm">
        
        {/* Filters */}
        <div className="flex flex-wrap gap-1 md:gap-3 items-center justify-center flex-grow">
          <div className="flex-1 max-w-[100px]">
            <CustomSelect<number>
              label="Travellers"
              value={searchParams.travellers}
              setValue={setTravellers}
              minVal={1}
              maxVal={12}
            />
          </div>

          <div className="min-w-[170px] flex-1">
          <DateRangeSelect
            value={searchParams.date}
            onChange={setDate}
          />
          </div>

          <div className="min-w-[200px] flex-1">
          <CustomSelect<string>
            label="Experience Type"
            options={["Any", "Nature & Wildlife", "Cultural Immersion", "Adventure & Outdoor", "Wellness & Retreats", "Social Impact", "Food & Gastronomy"]}
            value={searchParams.experienceType}
            setValue={setExperienceType}
          />
          </div>
        </div>

        {/* Button */}
        <div className="flex xl:justify-end">
          <Button
            size={"lg"}
            className="bg-home-button hover:bg-[#0d5d56] body-l-button text-inverted shadow-md px-10 py-2 rounded-md"
            onClick={handleSearch}
          >
            Search now
          </Button>
        </div>
      </div>
    </div>
  );
}
