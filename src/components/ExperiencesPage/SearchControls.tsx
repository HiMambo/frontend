"use client";
import { useState } from "react";
import { CustomSelect } from "../HomePage/CustomSelect";
import { DateRangeSelect } from "../HomePage/DateRangeSelect";
import { useSearch } from "@/context/SearchContext";
import { LayoutGrid, LayoutList } from "lucide-react";

type SearchControlsProps = {
  view: "grid" | "list";
  setView: (view: "grid" | "list") => void;
  sortBy: string;
  setSortBy: (value: string) => void;
};

export const SearchControls = ({
  view,
  setView,
  sortBy,
  setSortBy
}: SearchControlsProps) => {
  const [perPage, setPerPage] = useState(10);
  const { searchParams, setTravellers, setDate, setExperienceType } = useSearch();

  return (
    <div className="bg-white shadow-md p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-stretch lg:items-center gap-6">
        {/* Left Section - Heading */}
        <div className="flex items-center justify-center lg:justify-start lg:flex-1">
          <div className="text-lg sm:text-xl font-semibold text-blue-900 text-center lg:text-left">
            Let&apos;s find the right experience for you!
          </div>
        </div>
        
        {/* Right Section - Controls */}
        <div className="flex flex-col items-center lg:items-end gap-3">
          {/* First Row of Controls */}
          <div className="flex flex-wrap justify-center lg:justify-end items-center gap-4">
            <CustomSelect<number>
              label="Travellers"
              value={searchParams.travellers}
              setValue={setTravellers}
              minVal={1}
              maxVal={12}
              layout="horizontal"
            />
            
            <DateRangeSelect
              value={searchParams.date}
              onChange={setDate}
              layout="horizontal"
            />
            
            <CustomSelect<string>
              label="Experience Type"
              options={["Any", "Nature & Wildlife", "Cultural Immersion", "Adventure & Outdoor", "Wellness & Retreats", "Social Impact", "Food & Gastronomy"]}
              value={searchParams.experienceType}
              setValue={setExperienceType}
              layout="horizontal"
            />
          </div>
          
          {/* Second Row of Controls */}
          <div className="flex flex-wrap justify-center lg:justify-end items-center gap-4">
            <CustomSelect<number>
              label="Per Page"
              options={[10, 20, 50, 100]}
              value={perPage}
              setValue={setPerPage}
              layout="horizontal"
            />
            
            <CustomSelect<string>
              label="Sort By"
              options={[
                "Best Match",
                "Newest",
                "Price: Low to High",
                "Price: High to Low"
              ]}
              value={sortBy}
              setValue={setSortBy}
              layout="horizontal"
            />
            
            {/* View Toggle */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">View:</span>
              <div className="flex items-center gap-2">
                {/* Grid View */}
                <button
                  onClick={() => setView("grid")}
                  className={`w-8 h-8 flex items-center justify-center border rounded-lg ${
                    view === "grid" ? "bg-pink-100" : "bg-white"
                  }`}
                  aria-label="Grid View"
                >
                  <LayoutGrid className="w-5 h-5 text-gray-600" />
                </button>
                {/* List View */}
                <button
                  onClick={() => setView("list")}
                  className={`w-8 h-8 flex items-center justify-center border rounded-lg ${
                    view === "list" ? "bg-pink-100" : "bg-white"
                  }`}
                  aria-label="List View"
                >
                  <LayoutList className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};