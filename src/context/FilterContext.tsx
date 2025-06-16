"use client";

import React, { createContext, useContext, useState, useMemo } from "react";
import { Experience } from "@/types/experience";

interface FilterContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  selectedCategories: string[];
  toggleCategory: (category: string) => void;

  selectedRating: number[];
  toggleRating: (rating: number) => void;

  selectedPrice: [number, number];
  setMinPrice: (min: number) => void;
  setMaxPrice: (max: number) => void;

  selectedDiscount: string[];
  toggleDiscount: (discount: string) => void;

  selectedSDG: string[];
  toggleSDG: (sdg: string) => void;

  filteredExperiences: Experience[];
  availablePriceRange: [number, number];

  resetPriceFilter: () => void;
  noPriceSelection: boolean;

  anyFilterSelected: boolean;
  resetAllFilters: () => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const useFilter = (): FilterContextType => {
  const context = useContext(FilterContext);
  if (!context) throw new Error("useFilter must be used within a FilterProvider");
  return context;
};

interface FilterProviderProps {
  children: React.ReactNode;
  experiences: Experience[];
}

export const FilterProvider: React.FC<FilterProviderProps> = ({ children, experiences }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState<number[]>([]);
  const [selectedDiscount, setSelectedDiscount] = useState<string[]>([]);
  const [selectedSDG, setSelectedSDG] = useState<string[]>([]);

  const toggleItem = <T,>(item: T, list: T[], setList: React.Dispatch<React.SetStateAction<T[]>>) => {
    setList((prev) => (prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]));
  };

  const toggleCategory = (category: string) => toggleItem(category, selectedCategories, setSelectedCategories);
  const toggleRating = (rating: number) => toggleItem(rating, selectedRating, setSelectedRating);
  const toggleDiscount = (discount: string) => toggleItem(discount, selectedDiscount, setSelectedDiscount);
  const toggleSDG = (sdg: string) => toggleItem(sdg, selectedSDG, setSelectedSDG);

  const setMinPrice = (min: number) => {
    if (userIntendedPrice === null) {
      setUserIntendedPrice([min, availablePriceRange[1]]);
    } else {
      setUserIntendedPrice([min, userIntendedPrice[1]]);
    }
  };

  const setMaxPrice = (max: number) => {
    if (userIntendedPrice === null) {
      setUserIntendedPrice([availablePriceRange[0], max]);
    } else {
      setUserIntendedPrice([userIntendedPrice[0], max]);
    }
  };

  const [userIntendedPrice, setUserIntendedPrice] = useState<[number, number] | null>(null);
  const noPriceSelection = userIntendedPrice === null;

  const resetPriceFilter = () => {
    setUserIntendedPrice(null);
  };

  // First stage: apply all filters except price
  const nonPriceFilteredExperiences = useMemo(() => {
    return experiences.filter((exp) => {
      const matchesSearch =
        searchQuery.trim() === "" ||
        exp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exp.experience_country.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exp.experience_description?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategories.length === 0 || selectedCategories.includes(exp.experience_country); // Missing backend

      const matchesRating =
        selectedRating.length === 0 || exp.rating_avg >= Math.min(...selectedRating);

      const matchesDiscount =
        selectedDiscount.length === 0 || selectedDiscount.includes("SomeDiscount"); // Missing logic

      const matchesSDG =
        selectedSDG.length === 0 ||
        selectedSDG.every((sdg) => exp.sustainability_goal.includes(sdg));

      return matchesSearch && matchesCategory && matchesRating && matchesDiscount && matchesSDG;
    });
  }, [experiences, searchQuery, selectedCategories, selectedRating, selectedDiscount, selectedSDG]);

  // Calculate min and max price of filtered experiences
  const availablePriceRange: [number, number] = useMemo(() => {
    if (nonPriceFilteredExperiences.length === 0) return [0, 0];
    const prices = nonPriceFilteredExperiences.map((exp) => parseFloat(exp.experience_price));
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    return [min, max];
  }, [nonPriceFilteredExperiences]);

  // Clamp user's intended values to available range
  const selectedPrice: [number, number] = useMemo(() => {
    if (!availablePriceRange || availablePriceRange.length < 2) return [0, 0];
  
    const [availableMin, availableMax] = availablePriceRange;
    
    if (userIntendedPrice === null) {
      return [availableMin, availableMax];
    }
    // Only destructure after null check
    const [intendedMin, intendedMax] = userIntendedPrice;
  
  // If user hasn't set anything yet, use full available range
    if (noPriceSelection) {
      return [availableMin, availableMax];
  }
  
  // Otherwise clamp intended values to available range
  const clampedMin = Math.max(availableMin, Math.min(intendedMin, availableMax));
  const clampedMax = Math.min(availableMax, Math.max(intendedMax, availableMin));
  
  return [clampedMin, clampedMax];
}, [userIntendedPrice, availablePriceRange, noPriceSelection]);

  // Second stage: apply price filter on already filtered results
  const filteredExperiences = useMemo(() => {
    return nonPriceFilteredExperiences.filter((exp) => {
      const price = parseFloat(exp.experience_price);
      return price >= selectedPrice[0] && price <= selectedPrice[1];
    });
  }, [nonPriceFilteredExperiences, selectedPrice]);

  const anyFilterSelected = (
    selectedCategories.length > 0 ||
    selectedRating.length > 0 ||
    selectedDiscount.length > 0 ||
    selectedSDG.length > 0 ||
    !noPriceSelection
  );

  const resetAllFilters = () => {
    setSelectedCategories([]);
    setSelectedRating([]);
    setSelectedDiscount([]);
    setSelectedSDG([]);
    resetPriceFilter();
  };

  return (
    <FilterContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        selectedCategories,
        toggleCategory,
        selectedRating,
        toggleRating,
        selectedPrice,
        setMinPrice,
        setMaxPrice,
        selectedDiscount,
        toggleDiscount,
        selectedSDG,
        toggleSDG,
        filteredExperiences,
        availablePriceRange,
        resetPriceFilter,
        noPriceSelection,
        anyFilterSelected,
        resetAllFilters
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
