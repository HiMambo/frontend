"use client";

import { useState, useCallback } from "react";
import { FaPlay, FaNewspaper, FaMicrophone } from 'react-icons/fa';

type ContentType = 'video' | 'article' | 'podcast';

type FilterTypes = {
  All: "all";
  Favorites: "favorites";
  Videos: "video";
  Articles: "article";
  Podcasts: "podcast";
  "Last Added": "all";
};

type CardType = {
  id: string;  // Add this
  title: string;
  author: string;
  progress: string;
  rating: string;
  contentType: ContentType;
  contentUrl: string;
  thumbnail: string;
};

type SortOption = "Alphabetic Order" | "Most Popular" | "Most Recent" | "Best Rating";

// Add proper TypeScript type for categories
type CategoryType = "All" | "Marketing Content" | "Blockchain/Crypto" | "Sustainability";

// Define the RatingDetails type
type RatingDetails = {
  [rating: string]: {
    total: number;
    breakdown: {
      5: number;
      4: number;
      3: number;
      2: number;
      1: number;
    };
  };
};

export default function EducationHub() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>("All");
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [sortMenuOpen, setSortMenuOpen] = useState<boolean>(false);
  const [selectedSort, setSelectedSort] = useState<SortOption>("Most Popular");

  // Add these new state declarations after the existing ones
  const [showPremiumModal, setShowPremiumModal] = useState<boolean>(false);

  // Add this after your existing state declarations
  const [favoriteCards, setFavoriteCards] = useState<Set<string>>(new Set());

  // Add this handler function
  const toggleFavorite = useCallback((cardId: string) => {
    setFavoriteCards(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(cardId)) {
        newFavorites.delete(cardId);
      } else {
        newFavorites.add(cardId);
      }
      return newFavorites;
    });
  }, []);

  // Move filterData before getFilteredCards
  const filterData: FilterTypes = {
    All: "all",
    Favorites: "favorites",
    Videos: "video",
    Articles: "article",
    Podcasts: "podcast",
    "Last Added": "all"
  } as const;

  type FilterKey = keyof typeof filterData;

  const [selectedFilter, setSelectedFilter] = useState<FilterKey>("Videos");

  // Add memoized handlers
  const handleCardExpand = useCallback((index: number) => {
    setExpandedCard(expandedCard === index ? null : index);
  }, [expandedCard]);

  const handleSortChange = useCallback((option: SortOption) => {
    setSelectedSort(option);
    setSortMenuOpen(false);
  }, []);

  // Add proper typing for the cards data
  const cardsData: Record<string, CardType[]> = {
    "Marketing Content": [
      // Videos
      { id: "marketing-1", title: "Social Media Strategies", author: "John Doe", progress: "50% complete", rating: "4.5/5", contentType: 'video', contentUrl: '', thumbnail: '' },
      { id: "2", title: "Content Marketing Basics", author: "Jane Smith", progress: "30% complete", rating: "4.7/5", contentType: 'video', contentUrl: '', thumbnail: '' },
      // Articles
      { id: "3", title: "SEO Fundamentals Guide", author: "Alice Brown", progress: "60% complete", rating: "4.6/5", contentType: 'article', contentUrl: '', thumbnail: '' },
      { id: "2", title: "Content Marketing Basics", author: "Jane Smith", progress: "30% complete", rating: "4.7/5", contentType: 'video', contentUrl: '', thumbnail: '' },
      // Articles
      { id: "3", title: "SEO Fundamentals Guide", author: "Alice Brown", progress: "60% complete", rating: "4.6/5", contentType: 'article', contentUrl: '', thumbnail: '' },
      { id: "4", title: "Email Marketing Best Practices", author: "Bob Green", progress: "40% complete", rating: "4.8/5", contentType: 'article', contentUrl: '', thumbnail: '' },
      // Podcasts
      { id: "5", title: "Marketing Analytics Show", author: "Chris White", progress: "70% complete", rating: "4.9/5", contentType: 'podcast', contentUrl: '', thumbnail: '' },
      { id: "6", title: "Brand Building Talk", author: "Emily Black", progress: "80% complete", rating: "4.7/5", contentType: 'podcast', contentUrl: '', thumbnail: '' },
    ],
    "Blockchain/Crypto": [ // Changed from "Blockchain & Crypto"
      // Videos
      { id: "7", title: "Understanding Blockchain", author: "Alice Johnson", progress: "70% complete", rating: "4.8/5", contentType: 'video', contentUrl: '', thumbnail: '' },
      { id: "8", title: "Crypto Trading 101", author: "Bob Brown", progress: "40% complete", rating: "4.6/5", contentType: 'video', contentUrl: '', thumbnail: '' },
      // Articles
      { id: "9", title: "Smart Contracts Guide", author: "Charlie Blue", progress: "50% complete", rating: "4.7/5", contentType: 'article', contentUrl: '', thumbnail: '' },
      { id: "10", title: "NFTs Explained", author: "Diana Green", progress: "30% complete", rating: "4.5/5", contentType: 'article', contentUrl: '', thumbnail: '' },
      // Podcasts
      { id: "11", title: "DeFi Weekly", author: "Eve White", progress: "60% complete", rating: "4.9/5", contentType: 'podcast', contentUrl: '', thumbnail: '' },
      { id: "12", title: "Blockchain Talk", author: "Frank Black", progress: "80% complete", rating: "4.8/5", contentType: 'podcast', contentUrl: '', thumbnail: '' },
    ],
    "Sustainability": [
      // Videos
      { id: "13", title: "Sustainable Tourism", author: "Emily Green", progress: "80% complete", rating: "4.9/5", contentType: 'video', contentUrl: '', thumbnail: '' },
      { id: "14", title: "Eco-Friendly Practices", author: "Michael Blue", progress: "60% complete", rating: "4.8/5", contentType: 'video', contentUrl: '', thumbnail: '' },
      // Articles
      { id: "15", title: "Green Energy Guide", author: "George Yellow", progress: "50% complete", rating: "4.7/5", contentType: 'article', contentUrl: '', thumbnail: '' },
      { id: "16", title: "Recycling Manual", author: "Hannah Red", progress: "40% complete", rating: "4.6/5", contentType: 'article', contentUrl: '', thumbnail: '' },
      // Podcasts
      { id: "17", title: "Sustainability Now", author: "Ian Purple", progress: "70% complete", rating: "4.8/5", contentType: 'podcast', contentUrl: '', thumbnail: '' },
      { id: "18", title: "Climate Change Talk", author: "Jack Orange", progress: "90% complete", rating: "4.9/5", contentType: 'podcast', contentUrl: '', thumbnail: '' },
    ],
  };

  // Get all cards combined when "All" is selected
  const getAllCards = useCallback((): CardType[] => {
    return Object.values(cardsData).flat();
  }, [cardsData]);

  // Update the getFilteredCards function to handle both category and content type filtering
  const getFilteredCards = useCallback(() => {
    // First get the base set of cards
    let cards = selectedCategory === "All" ? getAllCards() : cardsData[selectedCategory] || [];
    
    // Handle favorites filter
    if (selectedFilter === "Favorites") {
      return cards.filter(card => favoriteCards.has(card.id));
    }
    
    // Handle other content type filters
    if (selectedFilter !== "All" && selectedFilter !== "Last Added") {
      const contentType = filterData[selectedFilter].toLowerCase() as ContentType;
      cards = cards.filter(card => card.contentType === contentType);
    }
    
    // Sort the filtered cards
    switch (selectedSort) {
      case "Alphabetic Order":
        return [...cards].sort((a, b) => a.title.localeCompare(b.title));
      case "Most Popular":
      case "Best Rating":
        return [...cards].sort((a, b) => {
          const ratingA = parseFloat(a.rating);
          const ratingB = parseFloat(b.rating);
          return ratingB - ratingA;
        });
      case "Most Recent":
        return cards;
      default:
        return cards;
    }
  }, [selectedCategory, selectedFilter, selectedSort, getAllCards, cardsData, favoriteCards]);

  // Replace the existing displayedCards declaration
  const displayedCards = getFilteredCards();

  const ratingDetails: RatingDetails = {
    "4.5/5": {
      total: 1250,
      breakdown: {
        5: 750,
        4: 350,
        3: 100,
        2: 35,
        1: 15
      }
    },
    "4.6/5": {
      total: 980,
      breakdown: {
        5: 600,
        4: 280,
        3: 70,
        2: 20,
        1: 10
      }
    },
    "4.7/5": {
      total: 2100,
      breakdown: {
        5: 1400,
        4: 500,
        3: 150,
        2: 35,
        1: 15
      }
    },
    "4.8/5": {
      total: 1800,
      breakdown: {
        5: 1200,
        4: 450,
        3: 100,
        2: 40,
        1: 10
      }
    },
    "4.9/5": {
      total: 3200,
      breakdown: {
        5: 2500,
        4: 500,
        3: 150,
        2: 35,
        1: 15
      }
    }
  };

  const sortOptions: SortOption[] = [
    "Alphabetic Order",
    "Most Popular",
    "Most Recent",
    "Best Rating"
  ];

  const getContentTypeIcon = (type: ContentType) => {
    try {
      switch (type) {
        case 'video':
          return <FaPlay className="w-8 h-8 text-blue-500" />;
        case 'article':
          return <FaNewspaper className="w-8 h-8 text-green-500" />;
        case 'podcast':
          return <FaMicrophone className="w-8 h-8 text-purple-500" />;
        default:
          return null;
      }
    } catch (error) {
      console.error('Error rendering content type icon:', error);
      return null;
    }
  };

  const getRatingBreakdown = (rating: string) => {
    if (!ratingDetails[rating]) {
      console.warn(`No rating details found for rating: ${rating}`);
      return null;
    }
    return ratingDetails[rating];
  };

  const [showTransactionsModal, setShowTransactionsModal] = useState(false);

  return (
    <div className="p-8 bg-gray-100 min-h-screen relative">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">HiMambo Education</h1>

        {/* Categories and Filters Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Categories Section */}
          <div className="p-2 bg-white rounded-lg shadow-md">
            <h2 className="text-xs font-semibold mb-1">Categories</h2>
            <div className="grid grid-cols-5 gap-1 w-full"> {/* Changed from grid-cols-6 to grid-cols-5 */}
              <button
                className={`px-3 py-1 rounded text-[11px] ${
                  selectedCategory === "All" ? "bg-[#FF8C00] text-white" : "bg-gray-200 text-gray-700"
                } hover:bg-[#e67e00] transition-colors duration-200 flex items-center justify-center`}
                onClick={() => setSelectedCategory("All")}
              >
                All
              </button>
              {Object.keys(cardsData).map((category) => (
                <button
                  key={category}
                  className={`px-3 py-1 rounded text-[11px] ${
                    selectedCategory === category ? "bg-[#FF8C00] text-white" : "bg-gray-200 text-gray-700"
                  } hover:bg-[#e67e00] transition-colors duration-200 flex items-center justify-center`}
                  onClick={() => setSelectedCategory(category as CategoryType)}
                >
                  {category}
                </button>
              ))}
              <button
                className="px-3 py-1 rounded text-[11px] bg-purple-100 text-purple-800 hover:bg-purple-200 transition-colors duration-200 flex items-center justify-center"
                onClick={() => setShowPremiumModal(true)}
              >
                Premium
              </button>
            </div>
          </div>

          {/* Filters Section */}
          <div className="p-2 bg-white rounded-lg shadow-md">
            <h2 className="text-xs font-semibold mb-1">Filters</h2>
            <div className="flex items-center gap-1 w-full">
              {Object.entries(filterData).map(([filter]) => (
                <button
                  key={filter}
                  className={`px-3 py-1 rounded text-[11px] ${
                    selectedFilter === filter 
                      ? "bg-[#FF8C00] text-white" 
                      : "bg-gray-200 text-gray-700"
                  } hover:bg-[#e67e00] transition-colors duration-200 flex items-center justify-center flex-1`}
                  onClick={() => setSelectedFilter(filter as FilterKey)}
                  type="button"
                >
                  {filter}
                </button>
              ))}

              {/* Sort By Dropdown */}
              <div className="relative">
                <button
                  className={`px-4 py-1 rounded flex items-center space-x-2 text-[11px] ${
                    sortMenuOpen ? "bg-green-800 text-white" : "bg-green-700 text-white"
                  } hover:bg-green-600 transition-colors duration-200 whitespace-nowrap`}
                  onClick={() => setSortMenuOpen(!sortMenuOpen)}
                >
                  <span>Sort By</span>
                  <svg 
                    className={`w-3 h-3 transition-transform ${sortMenuOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {sortMenuOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-10" 
                      onClick={() => setSortMenuOpen(false)}
                    ></div>
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-20">
                      {sortOptions.map((option) => (
                        <button
                          key={option}
                          className={`w-full px-4 py-2 text-left hover:bg-green-50 ${
                            selectedSort === option ? 'text-green-700' : 'text-gray-700'
                          } text-sm`}
                          onClick={() => {
                            handleSortChange(option);
                            setSortMenuOpen(false);
                          }}
                          type="button"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Blurred overlay when transaction modal is open */}
      {showTransactionsModal && (
        <div className="fixed inset-0 z-40 backdrop-blur-sm bg-black/20 transition-all duration-300" />
      )}
      {/* Transaction History Modal */}
      {showTransactionsModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl p-6 max-w-2xl w-full animate-modalEntry relative">
            <button
              onClick={() => setShowTransactionsModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h3 className="text-xl font-semibold mb-4">Transaction History</h3>
            {/* ...full transaction history table or list here... */}
            <div className="text-center text-gray-500 text-xs mt-4">Showing all transactions</div>
          </div>
        </div>
      )}

      {/* Courses Grid */}
      {/* Blurred overlay when any expanded card is open */}
      {expandedCard !== null && (
        <div className="fixed inset-0 z-40 backdrop-blur-sm bg-black/20 transition-all duration-300" />
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayedCards.map((card: CardType, index: number) => (
          <div key={index} className="relative">
            {/* Favorite Button - Add this at the top */}
            <button
              onClick={() => toggleFavorite(card.id)}
              className="absolute top-2 right-2 z-20 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors duration-200"
            >
              <svg
                className={`w-5 h-5 ${
                  favoriteCards.has(card.id) 
                    ? 'text-red-500 fill-current' 
                    : 'text-gray-400 hover:text-red-500'
                }`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d={favoriteCards.has(card.id)
                    ? "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    : "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"}
                />
              </svg>
            </button>
            
            {/* Add this inside the card div, before the title */}
            <div className="absolute top-2 left-2 z-10">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                card.contentType === 'video' 
                  ? 'bg-blue-100 text-blue-800'
                  : card.contentType === 'article'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-purple-100 text-purple-800'
              }`}>
                {card.contentType.charAt(0).toUpperCase() + card.contentType.slice(1)}
              </span>
            </div>
            {/* Base Card */}
            <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
              <div className="h-40 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                {getContentTypeIcon(card.contentType)}
              </div>
              <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
              <p className="text-sm text-gray-600">{card.author}</p>
              <p className="text-sm text-gray-500 mt-2">{card.progress}</p>

              {/* Rating Section */}
              <div className="relative group mb-4">
                <p className="text-sm text-[#FF8C00] mt-2 cursor-help">{card.rating}</p>
                {getRatingBreakdown(card.rating) && (
                  <div className="absolute bottom-full left-0 mb-2 hidden group-hover:block bg-white p-2 rounded-lg shadow-lg z-10 min-w-[150px] text-xs">
                    <p className="font-semibold mb-1 text-xs">
                      Rating Breakdown ({getRatingBreakdown(card.rating)?.total} reviews)
                    </p>
                    {[5, 4, 3, 2, 1].map((stars) => (
                      <div key={stars} className="flex items-center mb-0.5">
                        <span className="w-8">{stars} ★</span>
                        <div className="flex-grow mx-1 bg-gray-200 h-1.5 rounded">
                          <div 
                            className="bg-[#FF8C00] h-full rounded"
                            style={{
                              width: `${((getRatingBreakdown(card.rating)?.breakdown[stars as 5|4|3|2|1] ?? 0) / (getRatingBreakdown(card.rating)?.total ?? 1)) * 100}%`
                            }}
                          ></div>
                        </div>
                        <span className="w-8 text-right text-xs">
                          {getRatingBreakdown(card.rating)?.breakdown[stars as 5|4|3|2|1] ?? 0}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Learn More Button */}
              <div className="absolute bottom-4 right-4">
                <button
                  onClick={() => handleCardExpand(index)}
                  className="px-3 py-1 bg-[#FF8C00] text-white rounded-lg hover:bg-[#e67e00] text-sm font-medium transition-all duration-300"
                >
                  {expandedCard === index ? 'Close' : 'Learn More'}
                </button>
              </div>
            </div>

            {/* Floating Expanded Content */}
            {expandedCard === index && (
              <>
                {/* Blurred Background Overlay - Added transition */}
                <div 
                  className="fixed inset-0 backdrop-blur-sm bg-white/30 z-40 transition-all duration-300 ease-in-out"
                  onClick={() => setExpandedCard(null)}
                ></div>

                {/* Modal Content - Added transform and opacity transitions */}
                <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
                  <div 
                    className="bg-white rounded-lg shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto relative
                      animate-modalEntry"
                  >
                    {/* Close button */}
                    <button
                      onClick={() => setExpandedCard(null)}
                      className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>

                    {/* Expanded Content - Rest remains the same */}
                    <div className="p-8">
                      <div className="grid grid-cols-2 gap-8">
                        {/* Left Column - Image and Basic Info */}
                        <div>
                          <div className="h-64 bg-gray-200 rounded-lg mb-4"></div>
                          <h2 className="text-2xl font-bold mb-2">{card.title}</h2>
                          <p className="text-gray-600 mb-4">{card.author}</p>
                          <div className="flex items-center space-x-4">
                            <span className="text-[#FF8C00] font-medium">{card.rating}</span>
                            <span className="text-gray-500">{card.progress}</span>
                          </div>
                        </div>

                        {/* Right Column - Details and Actions */}
                        <div>
                          <h3 className="text-xl font-semibold mb-4">Course Overview</h3>
                          <p className="text-gray-700 mb-6 leading-relaxed">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
                            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis 
                            nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                          </p>
                          <div className="space-y-4">
                            <button className="w-full px-4 py-2 bg-[#FF8C00] text-white rounded-lg hover:bg-[#e67e00] font-medium">
                              Start Learning
                            </button>
                            <button className="w-full px-4 py-2 border border-[#FF8C00] text-[#FF8C00] rounded-lg hover:bg-orange-50 font-medium">
                              Add to Wishlist
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Premium Content Modal */}
      {showPremiumModal && (
        <>
          <div 
            className="fixed inset-0 backdrop-blur-sm bg-white/30 z-40 transition-all duration-300 ease-in-out"
            onClick={() => setShowPremiumModal(false)}
          ></div>
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-2xl p-6 max-w-md w-full animate-modalEntry">
              <button
                onClick={() => setShowPremiumModal(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="text-center p-4">
                <h3 className="text-xl font-semibold mb-4">Premium Content</h3>
                <p className="text-gray-700">
                  To access HiMambo&apos;s Education Hub Premium Content, {' '}
                  <a 
                    href="#" 
                    className="text-[#FF8C00] hover:text-[#e67e00] underline font-medium"
                    onClick={(e) => {
                      e.preventDefault();
                      // Add your subscription link handler here
                      console.log('Navigate to subscription page');
                    }}
                  >
                    Subscribe to our Premium Plan now
                  </a>
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}