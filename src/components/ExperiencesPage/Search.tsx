"use client";

import { useFilter } from "@/context/FilterContext";
import Image from "next/image";

const SearchInput = () => {
  const { searchQuery, setSearchQuery } = useFilter();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="bg-yellow-400 py-10 px-4 flex justify-center">
      <div className="flex items-center space-x-4 bg-white rounded-full px-4 py-2 shadow-md w-full max-w-xl">
 
        <Image 
        src="search.svg" alt='search' className='w-6 h-6' 
        layout="intrinsic" 
        width={100} 
        height={50}
        />
        <input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          placeholder="Search with AI! Just tell us what you want!"
          className="w-full bg-transparent text-xs text-[#FF2AAA] placeholder-[#FF2AAA]-500 focus:outline-none sm:text-lg"
        />
      </div>
    </div>
  );
};

export default SearchInput;
