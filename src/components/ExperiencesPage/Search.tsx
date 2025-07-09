"use client";

import { useState, useEffect } from "react";
import { useSearch } from "@/context/SearchContext";
import { SearchIcon } from "../shared/IconComponents";

const SearchInput = () => {
  const { searchParams, setSearchQuery } = useSearch();
  const [inputValue, setInputValue] = useState(searchParams.searchQuery);

  // Sync local input value if the context searchQuery changes externally
  useEffect(() => {
    setInputValue(searchParams.searchQuery);
  }, [searchParams.searchQuery]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearch = () => {
    setSearchQuery(inputValue.trim());
  };

  return (
    <div className="bg-yellow-400 py-10 px-4 flex justify-center">
      <div className="flex items-center space-x-4 bg-white text-[#FF2AAA] rounded-full px-4 py-2 shadow-md w-full max-w-xl">
 
        <button
          onClick={handleSearch}
          aria-label="Search"
        >
          <SearchIcon className="w-6 h-6 cursor-pointer" />
        </button>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          placeholder="Search with AI! Just tell us what you want!"
          className="w-full bg-transparent text-xs focus:outline-none sm:text-lg"
        />
      </div>
    </div>
  );
};

export default SearchInput;
