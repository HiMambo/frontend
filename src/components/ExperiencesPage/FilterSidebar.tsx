import React from "react";

import PriceFilter from "./PriceFilter";

interface FilterSidebarProps {
  selectedCategories: string[];
  onCategoryChange: (category: string) => void;

  selectedRating: number[];
  onRatingChange: (rating: number) => void;

  selectedPrice: [number, number];
  onMinPriceChange: (min: number) => void;
  onMaxPriceChange: (max: number) => void;

  selectedDiscount: string[];
  onDiscountChange: (discount: string) => void;

  selectedSDG: string[];
  onSDGChange: (sdg: string) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  selectedCategories,
  onCategoryChange,
  selectedRating,
  onRatingChange,
  selectedPrice,
  onMinPriceChange,
  onMaxPriceChange,
  selectedDiscount,
  onDiscountChange,
  selectedSDG,
  onSDGChange,
}) => {
  return (
    <div className="bg-white p-6 text-gray-600 rounded-lg shadow-md w-full md:w-3/4">
      <h2 className="text-2xl font-bold text-blue-800 mb-6">Filters</h2>

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
        onToggle={onCategoryChange}
      />

      {/* Discount Offer */}
      <FilterSection
        title="Discount Offer"
        options={["20% Cashback", "5% Cashback Offer", "25% Discount Offer"]}
        selected={selectedDiscount}
        onToggle={onDiscountChange}
      />

      {/* Rating */}
      <FilterSection
        title="Rating Item"
        options={[5, 4, 3, 2]}
        selected={selectedRating}
        onToggle={onRatingChange}
        renderLabel={(val) => `${val} Stars`}
      />

      {/* Price */}
      <div className="mb-6">
        <h3 className="font-semibold text-lg text-blue-800 mb-2">Price Range</h3>
        <PriceFilter
          minValue={selectedPrice[0]}
          maxValue={selectedPrice[1]}
          onMinPriceChange={onMinPriceChange}
          onMaxPriceChange={onMaxPriceChange}
        />
      </div>

      {/* Special Features (Placeholder - not hooked up) */}
      <FilterSection
        title="Special Features"
        options={["For families", "Pet friendly", "LGBTQI+"]}
        selected={[]} // Not implemented
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
        onToggle={onSDGChange}
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
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              onChange={() => !disabled && onToggle(option)}
              checked={selected.includes(option)}
              className="form-checkbox accent-yellow-400 h-5 w-5 text-yellow-400"
              disabled={disabled}
            />
            <span className="text-gray-700">{renderLabel(option)}</span>
          </label>
        </li>
      ))}
    </ul>
  </div>
);
