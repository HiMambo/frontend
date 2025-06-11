"use client";

import { useFilter } from "@/context/FilterContext";
import Image from "next/image";
import { SearchIcon } from "../shared/IconComponents";

const SearchInput = () => {
  const { searchQuery, setSearchQuery } = useFilter();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="bg-yellow-400 py-10 px-4 flex justify-center">
      <div className="flex items-center space-x-4 bg-white text-[#FF2AAA] rounded-full px-4 py-2 shadow-md w-full max-w-xl">
 
        <SearchIcon className="w-6 h-6" />
        <input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          placeholder="Search with AI! Just tell us what you want!"
          className="w-full bg-transparent text-xs focus:outline-none sm:text-lg"
        />
      </div>
    </div>
  );
};

export default SearchInput;
