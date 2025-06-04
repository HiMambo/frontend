"use client";

import React from "react";
import { useFilter } from "@/context/FilterContext";
import PriceFilter from "./PriceFilter";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";

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
    noPriceSelection
  } = useFilter();

  return (
    <div className="text-gray-600 w-full">
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
      />

      {/* Discount Offer */}
      <FilterSection
        title="Discount Offer"
        options={["20% Cashback", "5% Cashback Offer", "25% Discount Offer"]}
        selected={selectedDiscount}
        onToggle={toggleDiscount}
      />

      {/* Rating */}
      <FilterSection
        title="Rating Item"
        options={[5, 4, 3, 2]}
        selected={selectedRating}
        onToggle={toggleRating}
        renderLabel={(val) => `${val} Stars`}
      />

      {/* Price */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-lg text-blue-800">Price Range</h3>
          <div className="w-[72px] h-[32px]">
            {/* Reset Button, conditionally rendered */}
            {(!noPriceSelection) && (
              <Button
                variant="outline"
                size="sm"
                onClick={resetPriceFilter}
                className="text-muted-foreground hover:text-foreground border-gray-300"
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

      {/* Special Features (placeholder) */}
      <FilterSection
        title="Special Features"
        options={["For families", "Pet friendly", "LGBTQI+"]}
        selected={[]}
        onToggle={() => {}}
        disabled
      />

      {/* Filter By SDG */}
      <FilterSection
        title="Filter By SDG"
        options={[
          "SDG 1: No Poverty",
          "SDG 8: Decent Work",
          "SDG 11: Sustainable Cities",
        ]}
        selected={selectedSDG}
        onToggle={toggleSDG}
      />
    </div>
  );
};

export default FilterSidebar;


const FilterSection = <T extends string | number>({
  title,
  options,
  selected,
  onToggle,
  renderLabel = (val: T) => String(val),
  disabled = false,
}: {
  title: string;
  options: T[];
  selected: T[];
  onToggle: (val: T) => void;
  renderLabel?: (val: T) => string;
  disabled?: boolean;
}) => (
  <div className="mb-6">
    <h3 className="font-semibold text-lg text-blue-800 mb-2">{title}</h3>
    <ul className="space-y-2">
      {options.map((option) => (
        <li key={String(option)}>
          <label className="flex items-center space-x-2 cursor-pointer select-none">
            <Checkbox
              id={String(option)}
              checked={selected.includes(option)}
              disabled={disabled}
              onCheckedChange={() => !disabled && onToggle(option)}
              className="filter-checkbox"
            />
            <span className={`text-gray-700 ${disabled ? "opacity-50" : ""}`}>
              {renderLabel(option)}
            </span>
          </label>
        </li>
      ))}
    </ul>
  </div>
);