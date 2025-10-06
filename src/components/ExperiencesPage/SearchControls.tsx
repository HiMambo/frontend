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
    <div className="w-[var(--width-search-controls)] flex items-center justify-between">
      {/* Left Section - Heading */}
      <div className="flex flex-col gap-[var(--spacing-150)]">
        <span className="body-xl text-primary">
          Let&apos;s find the right experience for you!
        </span>
        <span className="body-m text-disabled ">
          About 10 results (X.XX seconds) {/* Placeholder */}
        </span>
      </div>

      {/* Right Section - Controls */}
      <div className="flex items-center gap-[var(--spacing-600)]">
        {/* Sort By */}
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

        {/* Per Page */}
        <CustomSelect<number>
          label="Per Page"
          options={[10, 20, 50]}
          value={perPage}
          setValue={setPerPage}
          layout="horizontal"
        />

        {/* View Toggle */}
        <div className="flex items-center gap-2">
          <span className="body-m text-tertiary">View:</span>
          <button
            onClick={() => setView(view === "grid" ? "list" : "grid")}
            aria-label={`Switch to ${view === "grid" ? "list" : "grid"} view`}
            className="cursor-pointer"
          >
            {view === "grid" ? (
              <GridViewToggle className="icon-size-l" />
            ) : (
              <ListViewToggle className="icon-size-l" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
