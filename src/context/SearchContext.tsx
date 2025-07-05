"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { DateRange } from "react-day-picker";

interface SearchParams {
  travellers: number;
  date: DateRange | undefined;
  experienceType: string;
}

type SearchContextType = {
  searchParams: SearchParams;
  setSearchParams: (params: Partial<SearchParams>) => void;
  setTravellers: (travellers: number) => void;
  setDate: (date: DateRange | undefined) => void;
  setExperienceType: (type: string) => void;
  resetSearch: () => void;
};

const defaultSearchParams: SearchParams = {
  travellers: 1,
  date: undefined,
  experienceType: "Any"
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [searchParams, setSearchParamsState] = useState<SearchParams>(defaultSearchParams);

  const setSearchParams = useCallback((params: Partial<SearchParams>) => {
    setSearchParamsState(prev => ({ ...prev, ...params }));
  }, []);

  const setTravellers = useCallback((travellers: number) => {
    setSearchParamsState(prev => ({ ...prev, travellers }));
  }, []);

  const setDate = useCallback((date: DateRange | undefined) => {
    setSearchParamsState(prev => ({ ...prev, date }));
  }, []);

  const setExperienceType = useCallback((experienceType: string) => {
    setSearchParamsState(prev => ({ ...prev, experienceType }));
  }, []);

  const resetSearch = useCallback(() => {
    setSearchParamsState(defaultSearchParams);
  }, []);

  const value = {
    searchParams,
    setSearchParams,
    setTravellers,
    setDate,
    setExperienceType,
    resetSearch,
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};