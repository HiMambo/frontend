// components/FilterSidebar.tsx
"use client"; // Add this line at the top to indicate it's a client component

import React, { useState } from "react";

const FilterSidebar: React.FC = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState<number[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<[number, number]>([
    0, 1000,
  ]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category]
    );
  };

  const handleRatingChange = (rating: number) => {
    setSelectedRating((prev) =>
      prev.includes(rating)
        ? prev.filter((item) => item !== rating)
        : [...prev, rating]
    );
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPrice = [...selectedPrice];
    newPrice[0] = parseInt(event.target.value);
    setSelectedPrice(newPrice as [number, number]);
  };

  return (
    <div className="bg-white p-4 text-gray-600 rounded-lg shadow-md w-full md:w-3/4">
      <h2 className="text-xl font-semibold mb-4">Filters</h2>

      {/* Categories */}
      <div className="mb-4">
        <h3 className="font-semibold text-lg">Categories</h3>
        <ul className="space-y-2">
          {[
            "Nature & Wildlife",
            "Cultural Immersion",
            "Adventure & Outdoor",
            "Wellness & Retreats",
            "Social Impact",
            "Food & Gastronomy",
          ].map((category) => (
            <li key={category}>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  onChange={() => handleCategoryChange(category)}
                  checked={selectedCategories.includes(category)}
                />
                <span>{category}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Rating */}
      <div className="mb-4">
        <h3 className="font-semibold text-lg">Rating Item</h3>
        <ul className="space-y-2">
          {[5, 4, 3, 2].map((rating) => (
            <li key={rating}>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  onChange={() => handleRatingChange(rating)}
                  checked={selectedRating.includes(rating)}
                />
                <span>{rating} Stars</span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Price Filter */}
      <div className="mb-4">
        <h3 className="font-semibold text-lg">Price Filter</h3>
        <input
          type="range"
          min="0"
          max="1000"
          step="50"
          value={selectedPrice[0]}
          onChange={handlePriceChange}
          className="w-full"
        />
        <div className="flex justify-between text-sm">
          <span>€ {selectedPrice[0]}</span>
          <span>€ 1.000</span>
        </div>
      </div>

      {/* Special Features */}
      <div className="mb-4">
        <h3 className="font-semibold text-lg">Special Features</h3>
        <ul className="space-y-2">
          {["For families", "Pet friendly", "LGBTQI+"].map((feature) => (
            <li key={feature}>
              <label className="flex items-center space-x-2">
                <input type="checkbox" />
                <span>{feature}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Filter By SDG */}
      <div className="mb-4">
        <h3 className="font-semibold text-lg">Filter By SDG</h3>
        <ul className="space-y-2">
          {[
            "SDG 1: No Poverty",
            "SDG 8: Decent Work",
            "SDG 11: Sustainable Cities",
          ].map((sdg) => (
            <li key={sdg}>
              <label className="flex items-center space-x-2">
                <input type="checkbox" />
                <span>{sdg}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FilterSidebar;
