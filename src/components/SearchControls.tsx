"use client";

import { useState } from "react";

const SearchControls = () => {
  const [perPage, setPerPage] = useState("");
  const [sortBy, setSortBy] = useState("Best Match");
  const [view, setView] = useState("grid");

  return (
    <div className="bg-white shadow-md p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6">
        {/* Heading */}
        <div className="text-lg sm:text-xl font-semibold text-blue-900 text-center lg:text-left">
          Let&apos;s find the right experience for you!
        </div>

        {/* Controls */}
        <div className="flex flex-wrap justify-center lg:justify-end items-center gap-4">
          {/* Per Page */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Per Page:</span>
            <input
              type="number"
              value={perPage}
              onChange={(e) => setPerPage(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-1 text-sm w-20"
              placeholder="10"
            />
          </div>

          {/* Sort By */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-1 text-sm"
            >
              <option value="Best Match">Best Match</option>
              <option value="Newest">Newest</option>
              <option value="Price: Low to High">Price: Low to High</option>
              <option value="Price: High to Low">Price: High to Low</option>
            </select>
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">View:</span>
            <div className="flex items-center gap-2">
              {/* Grid View */}
              <button
                onClick={() => setView("grid")}
                className={`w-8 h-8 flex items-center justify-center border rounded-lg ${
                  view === "grid" ? "bg-pink-100" : "bg-white"
                }`}
                aria-label="Grid View"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z"
                  />
                </svg>
              </button>

              {/* List View */}
              <button
                onClick={() => setView("list")}
                className={`w-8 h-8 flex items-center justify-center border rounded-lg ${
                  view === "list" ? "bg-pink-100" : "bg-white"
                }`}
                aria-label="List View"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchControls;
