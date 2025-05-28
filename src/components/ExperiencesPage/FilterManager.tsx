"use client";

import React, { useState } from "react";
import FilterSidebar from "./FilterSidebar";

const FilterManager: React.FC = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState<number[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<[number, number]>([0, 1000]);
  const [selectedDiscount, setSelectedDiscount] = useState<string[]>([]);
  const [selectedSDG, setSelectedSDG] = useState<string[]>([]);

  const toggleItem = <T,>(item: T, list: T[], setList: React.Dispatch<React.SetStateAction<T[]>>) => {
    setList((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  return (
    <FilterSidebar
      selectedCategories={selectedCategories}
      onCategoryChange={(category) => toggleItem(category, selectedCategories, setSelectedCategories)}
      selectedRating={selectedRating}
      onRatingChange={(rating) => toggleItem(rating, selectedRating, setSelectedRating)}
      selectedPrice={selectedPrice}
      onMinPriceChange={(value) => setSelectedPrice([value, selectedPrice[1]])}
      onMaxPriceChange={(value) => setSelectedPrice([selectedPrice[0], value])}
      selectedDiscount={selectedDiscount}
      onDiscountChange={(discount) => toggleItem(discount, selectedDiscount, setSelectedDiscount)}
      selectedSDG={selectedSDG}
      onSDGChange={(sdg) => toggleItem(sdg, selectedSDG, setSelectedSDG)}
    />
  );
};

export default FilterManager;
