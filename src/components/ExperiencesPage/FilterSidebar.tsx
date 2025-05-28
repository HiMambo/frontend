"use client"; 

import React, { useState, useEffect } from "react";

const FilterSidebar: React.FC = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState<number[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<[number, number]>([
    0, 1000,
  ]);
  const [selectedDiscount, setSelectedDiscount] = useState<string[]>([]);
  const [selectedSDG, setSelectedSDG] = useState<string[]>([]);

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

  const handleMinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(event.target.value), selectedPrice[1] - 50);
    setSelectedPrice([value, selectedPrice[1]]);
  };

  const handleMaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(event.target.value), selectedPrice[0] + 50);
    setSelectedPrice([selectedPrice[0], value]);
  };

  const handleDiscountChange = (discount: string) => {
    setSelectedDiscount((prev) =>
      prev.includes(discount)
        ? prev.filter((item) => item !== discount)
        : [...prev, discount]
    );
  };

  const handleSDGChange = (sdg: string) => {
    setSelectedSDG((prev) =>
      prev.includes(sdg) ? prev.filter((item) => item !== sdg) : [...prev, sdg]
    );
  };

  return (
    <div className="bg-white p-6 text-gray-600 rounded-lg shadow-md w-full md:w-3/4">
      <h2 className="text-2xl font-bold text-blue-800 mb-6">Filters</h2>

      {/* Categories */}
      <div className="mb-6">
        <h3 className="font-semibold text-lg text-blue-800 mb-2">Categories</h3>
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
                  className="form-checkbox accent-yellow-400 h-5 w-5 text-yellow-400"
                />
                <span className="text-gray-700">{category}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Discount Offer */}
      <div className="mb-6">
        <h3 className="font-semibold text-lg text-blue-800 mb-2">
          Discount Offer
        </h3>
        <ul className="space-y-2">
          {["20% Cashback", "5% Cashback Offer", "25% Discount Offer"].map(
            (offer) => (
              <li key={offer}>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    onChange={() => handleDiscountChange(offer)}
                    checked={selectedDiscount.includes(offer)}
                    className="form-checkbox h-5 w-5 accent-yellow-400 text-yellow-400"
                  />
                  <span className="text-gray-700">{offer}</span>
                </label>
              </li>
            )
          )}
        </ul>
      </div>

      {/* Rating */}
      <div className="mb-6">
        <h3 className="font-semibold text-lg text-blue-800 mb-2">
          Rating Item
        </h3>
        <ul className="space-y-2">
          {[5, 4, 3, 2].map((rating) => (
            <li key={rating}>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  onChange={() => handleRatingChange(rating)}
                  checked={selectedRating.includes(rating)}
                  className="form-checkbox h-5 w-5 accent-yellow-400 text-yellow-400"
                />
                <span className="text-gray-700">{rating} Stars</span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Price Filter */}
       <div className="mb-6">
        <h3 className="font-semibold text-lg text-blue-800 mb-2">
          Price Filter
        </h3>
        <div className="relative h-6">
          {/* Min Slider */}
          <input
            type="range"
            min="0"
            max="1000"
            step="50"
            value={selectedPrice[0]}
            onChange={handleMinChange}
            className="w-full absolute z-10 pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto"
          />

          {/* Max Slider */}
          <input
            type="range"
            min="0"
            max="1000"
            step="50"
            value={selectedPrice[1]}
            onChange={handleMaxChange}
            className="w-full absolute z-20 pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto"
          />
        </div>
        <div className="flex justify-between text-sm text-gray-700 mt-2">
          <span>€ {selectedPrice[0]}</span>
          <span>€ {selectedPrice[1]}</span>
        </div>
      </div>

      {/* Special Features */}
      <div className="mb-6">
        <h3 className="font-semibold text-lg text-blue-800 mb-2">
          Special Features
        </h3>
        <ul className="space-y-2">
          {["For families", "Pet friendly", "LGBTQI+"].map((feature) => (
            <li key={feature}>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="form-checkbox accent-yellow-400 h-5 w-5 text-yellow-400"
                />
                <span className="text-gray-700">{feature}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Filter By SDG */}
      <div className="mb-6">
        <h3 className="font-semibold text-lg text-blue-800 mb-2">
          Filter By SDG
        </h3>
        <ul className="space-y-2">
          {[
            "SDG 1: No Poverty",
            "SDG 8: Decent Work",
            "SDG 11: Sustainable Cities",
          ].map((sdg) => (
            <li key={sdg}>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  onChange={() => handleSDGChange(sdg)}
                  checked={selectedSDG.includes(sdg)}
                  className="form-checkbox accent-yellow-400 h-5 w-5 text-yellow-400"
                />
                <span className="text-gray-700">{sdg}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FilterSidebar;
