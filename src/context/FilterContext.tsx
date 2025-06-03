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
  const [selectedPrice, setSelectedPrice] = useState<[number, number]>([0, 1000]);
  const [selectedDiscount, setSelectedDiscount] = useState<string[]>([]);
  const [selectedSDG, setSelectedSDG] = useState<string[]>([]);

  const toggleItem = <T,>(item: T, list: T[], setList: React.Dispatch<React.SetStateAction<T[]>>) => {
    setList((prev) => (prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]));
  };

  const toggleCategory = (category: string) => toggleItem(category, selectedCategories, setSelectedCategories);
  const toggleRating = (rating: number) => toggleItem(rating, selectedRating, setSelectedRating);
  const toggleDiscount = (discount: string) => toggleItem(discount, selectedDiscount, setSelectedDiscount);
  const toggleSDG = (sdg: string) => toggleItem(sdg, selectedSDG, setSelectedSDG);

  const setMinPrice = (min: number) => setSelectedPrice([min, selectedPrice[1]]);
  const setMaxPrice = (max: number) => setSelectedPrice([selectedPrice[0], max]);

  const filteredExperiences = useMemo(() => {
    return experiences.filter((exp) => {
      const price = parseFloat(exp.experience_price);
    
      const matchesSearch =
        searchQuery.trim() === "" ||
        exp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exp.experience_country.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exp.experience_description?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(exp.experience_country); // Adjust as needed
      const matchesRating = selectedRating.length === 0 || selectedRating.includes(Math.floor(exp.rating_avg));
      const matchesPrice = price >= selectedPrice[0] && price <= selectedPrice[1];
      const matchesDiscount = selectedDiscount.length === 0 || selectedDiscount.includes("SomeDiscount"); // Replace logic
      const matchesSDG = selectedSDG.length === 0 || selectedSDG.some((sdg) => exp.sustainability_goal.includes(sdg));

      return matchesSearch && matchesCategory && matchesRating && matchesPrice && matchesDiscount && matchesSDG;
    });
  }, [experiences, searchQuery, selectedCategories, selectedRating, selectedPrice, selectedDiscount, selectedSDG]);

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
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
