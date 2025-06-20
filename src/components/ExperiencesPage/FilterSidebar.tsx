"use client";

import React from "react";
import { useFilter } from "@/context/FilterContext";
import PriceFilter from "./PriceFilter";
import { FilterSection } from "./FilterSection";
import { Button } from "../ui/button";

const FilterSidebar: React.FC = () => {
  const {
    selectedCategories,
    toggleCategory,
    selectedRating,
    toggleRating,
    availablePriceRange,
    selectedPrice,
    setMinPrice,
    setMaxPrice,
    selectedDiscount,
    toggleDiscount,
    selectedSDG,
    toggleSDG,
    resetPriceFilter,
    noPriceSelection,
    anyFilterSelected,
    resetAllFilters
  } = useFilter();

  return (
    <div className="text-gray-600 w-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-blue-800">Filter by</h2>
        {anyFilterSelected && (
          <Button
            variant="ghost"
            size="sm"
            onClick={resetAllFilters}
            className="text-muted-foreground hover:text-foreground h-auto p-1 text-base"
          >
            Clear All Filters
          </Button>
        )}
      </div>
      {/* Categories */}
      <FilterSection
        title="Category"
        options={[
          "Nature & Wildlife",
          "Cultural Immersion",
          "Adventure & Outdoor",
          "Wellness & Retreats",
          "Social Impact",
          "Food & Gastronomy",
        ]}
        selected={selectedCategories}
        onToggle={toggleCategory}
        disabled
      />

      {/* Discount Offer */}
      <FilterSection
        title="Discount"
        options={["20% Cashback", "5% Cashback Offer", "25% Discount Offer"]}
        selected={selectedDiscount}
        onToggle={toggleDiscount}
        disabled
      />

      {/* Rating */}
      <FilterSection
        title="Rating"
        options={[5, 4, 3]}
        selected={selectedRating}
        onToggle={toggleRating}
        renderLabel={(val) => val === 5 ? `${val} Stars` : `${val}+ Stars`}
        single={true}
      />

      {/* Price */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-lg text-blue-800">Price Range</h3>
            {/* Reset Button, conditionally rendered */}
            {(!noPriceSelection) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={resetPriceFilter}
                className="text-muted-foreground hover:text-foreground h-auto p-1"
              >
                Reset
              </Button>
            )}
        </div>
        <PriceFilter
          min={availablePriceRange[0]}
          max={availablePriceRange[1]}
          minValue={selectedPrice[0]}
          maxValue={selectedPrice[1]}
          onMinPriceChange={setMinPrice}
          onMaxPriceChange={setMaxPrice}
        />
      </div>

      {/* Special Features */}
      <FilterSection
        title="Special Features"
        options={["For families", "Pet friendly", "LGBTQI+"]}
        selected={[]}
        onToggle={() => {}}
        disabled
      />

      {/* Filter By SDG */}
      <FilterSection
        title="SDGs"
        options={[
          { value: "1", label: "SDG 1: No Poverty" },
          { value: "2", label: "SDG 2: Zero Hunger" },
          { value: "3", label: "SDG 3: Good Health And Well-Being" },
          { value: "4", label: "SDG 4: Quality Education" },
          { value: "5", label: "SDG 5: Gender Equality" },
          { value: "6", label: "SDG 6: Clean Water And Sanitation" },
          { value: "7", label: "SDG 7: Affordable And Clean Energy" },
          { value: "8", label: "SDG 8: Decent Work And Economic Growth" },
          { value: "9", label: "SDG 9: Industry, Innovation And Infrastructure" },
          { value: "10", label: "SDG 10: Reduced Inequalities" },
          { value: "11", label: "SDG 11: Sustainable Cities And Communities" },
          { value: "12", label: "SDG 12: Responsible Consumption And Production" },
          { value: "13", label: "SDG 13: Climate Action" },
          { value: "14", label: "SDG 14: Life Below Water" },
          { value: "15", label: "SDG 15: Life On Land" },
          { value: "16", label: "SDG 16: Peace, Justice And Strong Institutions" },
          { value: "17", label: "SDG 17: Partnerships For The Goals" },
        ]}
        selected={selectedSDG}
        onToggle={toggleSDG}
        dropdown={true}
        searchPlaceholder="Search SDGs..."
        dropdownPlaceholder="Select SDGs..."
        emptyMessage="No SDG found."
        renderBadgeLabel={(val) => `SDG ${val}`}
        iconPath={(val) => `/assets/sdg/E-WEB-Goal-${val.padStart(2, "0")}.png`}
      />
    </div>
  );
};

export default FilterSidebar;