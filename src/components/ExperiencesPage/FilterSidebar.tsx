"use client";

import React from "react";
import { useFilter } from "@/context/FilterContext";
import PriceFilter from "./PriceFilter";
import { FilterSection } from "./FilterSection";
import { Button } from "../ui/button";
import { CategoriesFilterIcon, BudgetFilterIcon, RatingFilterIcon, SpecialFeaturesFilterIcon, DiscountFilterIcon, SDGFilterIcon } from "../shared/IconComponents";

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
    <div className="bg-surface w-full grid gap-[var(--spacing-1200)]">
      <div className="flex items-center justify-between">
        <h2 className="heading-h5 text-secondary">Filter by</h2>
        <div className="h-[1.5rem]">
          {anyFilterSelected && (
            <Button
              variant="ghost"
              size="sm"
              onClick={resetAllFilters}
              className="text-muted-foreground hover:text-foreground h-full p-2 body-l"
            >
              Clear All Filters
            </Button>
          )}
        </div>
      </div>
      {/* Categories */}
      <FilterSection
        title="Categories"
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

        TitleIcon={CategoriesFilterIcon}
      />

      {/* Budget */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-[var(--spacing-250)] border-b-2 border-[var(--text-secondary)] pb-1 text-secondary">
            <BudgetFilterIcon className="icon-s" aria-hidden="true" />
            <h3 className="body-xl">Budget</h3>
          </div>
            {/* Reset Button */}
            <div className="h-[1.5rem]">
              {(!noPriceSelection) && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={resetPriceFilter}
                  className="text-muted-foreground hover:text-foreground h-full p-2 body-m"
                >
                  Reset
                </Button>
              )}
            </div>
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

      {/* Rating */}
      <FilterSection
        title="Rating"
        options={[5, 4, 3]}
        selected={selectedRating}
        onToggle={toggleRating}
        renderLabel={(val) => val === 5 ? `${val} Stars` : `${val}+ Stars`}
        single={true}
        TitleIcon={RatingFilterIcon}
      />

      {/* Discount Offer */}
      <FilterSection
        title="Discount"
        options={["20% Cashback", "5% Cashback Offer", "25% Discount Offer"]}
        selected={selectedDiscount}
        onToggle={toggleDiscount}
        disabled
        TitleIcon={DiscountFilterIcon}
      />

      {/* Special Features */}
      <FilterSection
        title="Special Features"
        options={["For families", "Pet friendly", "LGBTQI+"]}
        selected={[]}
        onToggle={() => {}}
        disabled
        TitleIcon={SpecialFeaturesFilterIcon}
      />

      {/* Filter By SDG */}
      <FilterSection
        title="Filter by SDG"
        options={[
          { value: "1", label: "1: No Poverty" },
          { value: "2", label: "2: Zero Hunger" },
          { value: "3", label: "3: Good Health And Well-Being" },
          { value: "4", label: "4: Quality Education" },
          { value: "5", label: "5: Gender Equality" },
          { value: "6", label: "6: Clean Water And Sanitation" },
          { value: "7", label: "7: Affordable And Clean Energy" },
          { value: "8", label: "8: Decent Work And Economic Growth" },
          { value: "9", label: "9: Industry, Innovation And Infrastructure" },
          { value: "10", label: "10: Reduced Inequalities" },
          { value: "11", label: "11: Sustainable Cities And Communities" },
          { value: "12", label: "12: Responsible Consumption And Production" },
          { value: "13", label: "13: Climate Action" },
          { value: "14", label: "14: Life Below Water" },
          { value: "15", label: "15: Life On Land" },
          { value: "16", label: "16: Peace, Justice And Strong Institutions" },
          { value: "17", label: "17: Partnerships For The Goals" },
        ]}
        selected={selectedSDG}
        onToggle={toggleSDG}
        dropdown={true}
        searchPlaceholder="Search SDGs..."
        dropdownPlaceholder="Select SDGs..."
        emptyMessage="No SDG found."
        renderBadgeLabel={(val) => `SDG ${val}`}
        iconPath={(val) => `/assets/sdg/E-WEB-Goal-${val.padStart(2, "0")}.png`}
        TitleIcon={SDGFilterIcon}
      />
    </div>
  );
};

export default FilterSidebar;