"use client";
import { useState } from "react";
import { CustomSelect } from "../HomePage/CustomSelect";
import { ListViewToggle, GridViewToggle } from "../shared/IconComponents";

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

  return (
    <div className="bg-surface p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-stretch lg:items-center gap-6 pl-20">
        {/* Left Section - Heading */}
        <div className="justify-center lg:justify-start lg:flex-1">
          <div className="body-xl text-primary text-center">
            Let&apos;s find the right experience for you!
          </div>
        </div>
        
        {/* Right Section - Controls */}
        <div className="flex items-center lg:items-end gap-3">
          <div className="flex flex-wrap justify-center lg:justify-end items-center gap-4">
                        
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
            
            <CustomSelect<number>
              label="Per Page"
              options={[10, 20, 50]}
              value={perPage}
              setValue={setPerPage}
              layout="horizontal"
            />
            
          {/* View Toggle */}
          <div className="flex items-center gap-2">
            <span className="body-m text-muted-foreground">View:</span>
            <button
              onClick={() => setView(view === "grid" ? "list" : "grid")}
              className="w-10 h-10 flex items-center justify-center text-muted-foreground cursor-pointer"
              aria-label={`Switch to ${view === "grid" ? "list" : "grid"} view`}
            >
              {view === "grid" ?
                <GridViewToggle /> :
                <ListViewToggle />
              }
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};