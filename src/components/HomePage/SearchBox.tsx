"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CustomSelect } from "./CustomSelect";
import { DateRangeSelect } from "./DateRangeSelect";
import { SearchIcon } from "@/components/shared/IconComponents";
import { useCart } from "@/context/Cart";

export default function SearchBox() {
  const router = useRouter();

  const { searchParams, setGuests, setDate, setExperienceType } = useCart();

  const handleButtonClick = () => {
    router.push("/experiencepage/");
  };

  return (
    <div className="bg-home-searchbox rounded-xl px-4 py-4 shadow-md w-full max-w-6xl mx-auto flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
      {/* Search box */}
      <div className="flex items-center bg-white rounded-md px-4 py-2 w-full xl:max-w-90">
        <input
          type="text"
          placeholder="Search activities or Destinations"
          className="w-full bg-transparent text-gray-600 placeholder:text-gray-400 focus:outline-none"
        />
        <SearchIcon className="w-5 h-5 text-gray-600" />
      </div>

      {/* Filters and Button in the same row on smaller screens*/}
      <div className="flex flex-wrap items-center justify-center xl:justify-between gap-4 w-full text-white text-sm">
        
        {/* Filters */}
        <div className="flex flex-wrap gap-4 md:gap-6 items-center justify-center flex-grow">
          <CustomSelect
            label="Guests"
            options={["1", "2", "3", "4", "5", "6"]}
            value={searchParams.guests}
            setValue={setGuests}
            formatLabel={(opt) => opt === "1" ? `${opt} Adult` : `${opt} Adults`}
          />

          <DateRangeSelect
            value={searchParams.date}
            onChange={setDate}
          />

          <CustomSelect
            label="Experience Type"
            options={["Any", "Nature & Wildlife", "Cultural Immersion", "Adventure & Outdoor", "Wellness & Retreats", "Social Impact", "Food & Gastronomy"]}
            value={searchParams.experienceType}
            setValue={setExperienceType}
          />
        </div>

        {/* Button */}
        <div className="flex xl:justify-end">
          <Button
            size={"lg"}
            className="bg-primary hover:bg-[#e18533] text-white text-lg font-semibold shadow-md px-6 py-2 rounded-md"
            onClick={handleButtonClick}
          >
            Book now
          </Button>
        </div>
      </div>
    </div>
  );
}
