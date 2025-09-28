import React from 'react';
import { Star, Heart } from 'lucide-react';

type SkeletonCardProps = {
  view: "grid" | "list" | "home" | "bookingSummary" | "headerRight";
  index?: number;
};

export const SkeletonCard: React.FC<SkeletonCardProps> = ({ view, index = 0 }) => {
  // Predefined variations to avoid hydration mismatch
  const variations = [
    { titleWidth: '75%', locationWidth: '15%', sdgCount: 2, starCount: 4, descLines: 3 },
    { titleWidth: '85%', locationWidth: '30%', sdgCount: 1, starCount: 5, descLines: 2 },
    { titleWidth: '65%', locationWidth: '25%', sdgCount: 3, starCount: 3, descLines: 4 },
    { titleWidth: '80%', locationWidth: '10%', sdgCount: 2, starCount: 4, descLines: 1 },
    { titleWidth: '70%', locationWidth: '30%', sdgCount: 1, starCount: 5, descLines: 3 },
    { titleWidth: '90%', locationWidth: '20%', sdgCount: 2, starCount: 4, descLines: 2 },
  ];

  const variant = variations[index % variations.length];

  switch (view) {
    case "grid":
      return (
        <div className="relative w-full max-w-xs aspect-[2/3] bg-white rounded-lg shadow-md animate-wave flex flex-col overflow-hidden">
          <div className="absolute top-2 right-2 z-10 rounded-full bg-white w-10 h-10 flex items-center justify-center">
            <Heart size={24} fill="#E5E7EB" stroke="none"/>
          </div>
          {/* Image */}
          <div className="h-2/3 bg-gray-200 w-full" />

          {/* Content */}
          <div className="p-4 space-y-2 flex-grow flex flex-col justify-between">
            <div>
              <div className="min-h-[4.5rem]">
                {/* Title and location */}
                <div className="h-5 bg-gray-200 rounded" style={{ width: variant.titleWidth }} />
                <div className="h-3 bg-gray-200 rounded mt-2" style={{ width: variant.locationWidth }} />
              </div>
              
              {/* Star rating */}
              <div className="flex gap-1 mt-2">
                {Array.from({ length: variant.starCount }).map((_, i) => (
                  <Star key={i} className="w-4 h-4" fill="#E5E7EB" stroke="none" />
                ))}
              </div>
            </div>

            {/* Bottom section - Price and SDG badges */}
            <div className="flex justify-between items-center">
              {/* Price with cart icon */}
              <div className="flex items-center gap-2">
                <div className="h-5 w-20 bg-gray-200 rounded" />
                <div className="w-10 h-10 bg-gray-200 rounded-full" />
              </div>

              {/* SDG badges */}
              <div className="flex gap-1">
                {Array.from({ length: variant.sdgCount }).map((_, i) => (
                  <div key={i} className="w-7 h-7 bg-gray-200 rounded-md" />
                ))}
              </div>
            </div>
          </div>
        </div>
      );

    case "list":
      return (
        <div className="group flex flex-col sm:flex-row h-[var(--card-height)] rounded-800 overflow-hidden bg-surface animate-pulse">
          {/* Image placeholder */}
          <div className="relative w-full sm:w-[var(--card-height)] h-[var(--card-height)] flex-shrink-0 bg-gray-200" />
          
          {/* Content */}
          <div className="flex flex-col justify-between p-[var(--spacing-600)] pl-[var(--spacing-1600)] w-full h-full gap-[var(--spacing-400)]">
            {/* Top section: Title + rating + actions */}
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-[var(--spacing-400)]">
                {/* Title */}
                <div 
                  className="h-6 bg-gray-200 rounded" 
                  style={{ width: variant.titleWidth }} 
                />
                {/* Star Rating */}
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="w-5 h-5 bg-gray-200 rounded-full" />
                  ))}
                </div>
              </div>
              
              {/* Top right action buttons */}
              <div className="flex gap-2">
                <div className="w-5 h-5 bg-gray-200 rounded" />
                <div className="w-5 h-5 bg-gray-200 rounded" />
              </div>
            </div>

            {/* Middle section: Location, description, highlights */}
            <div className="flex flex-col gap-[var(--spacing-300)]">
              {/* Location */}
              <div 
                className="h-4 bg-gray-200 rounded" 
                style={{ width: variant.locationWidth }} 
              />
              
              {/* Description (2 lines) */}
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-4 bg-gray-200 rounded w-3/4" />
              </div>
              
              {/* Highlights */}
              <div className="space-y-[var(--spacing-300)]">
                <div className="h-4 bg-gray-200 rounded w-2/3" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
              </div>
            </div>

            {/* Bottom section: SDGs + price & button */}
            <div className="flex justify-between items-end">
              {/* SDG badges */}
              <div className="flex gap-1">
                {Array.from({ length: Math.min(variant.sdgCount, 5) }).map((_, i) => (
                  <div key={i} className="w-9 h-9 bg-gray-200 rounded-md" />
                ))}
              </div>
              
              {/* Price area */}
              <div className="relative h-[40px] flex items-end">
                <div className="h-6 w-24 bg-gray-200 rounded" />
              </div>
            </div>
          </div>
        </div>
      );

    case "home":
      return (
        <div className="relative w-full aspect-[3/5] gap-[var(--spacing-1200)] rounded-800 p-[var(--spacing-800)] overflow-hidden flex flex-col bg-white animate-pulse">
          {/* Image placeholder */}
          <div className="relative h-1/2 w-full bg-gray-200 rounded-600" />

          {/* Content */}
          <div className="flex flex-col gap-[var(--spacing-400)]">
            {/* Title area with fixed height */}
            <div className="h-[calc(var(--leading-body-xxl)*2.3)]">
              <div 
                className="h-6 bg-gray-200 rounded" 
                style={{ width: variant.titleWidth }} 
              />
            </div>
            
            {/* Star Rating */}
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="w-7 h-7 bg-gray-200 rounded-full" />
              ))}
            </div>
            
            <div className="flex flex-col gap-[var(--spacing-300)]">
              {/* Location */}
              <div 
                className="h-4 bg-gray-200 rounded" 
                style={{ width: variant.locationWidth }} 
              />
              
              {/* Description */}
              <div className="space-y-2">
                {Array.from({ length: variant.descLines }).map((_, i) => (
                  <div 
                    key={i} 
                    className="h-5 bg-gray-200 rounded" 
                    style={{ width: i === variant.descLines - 1 ? '65%' : '95%' }} 
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      );
      
    case "bookingSummary":
      return (
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden animate-wave">
          {/* Placeholder Image */}
          <div className="w-full h-48 bg-gray-200" />

          <div className="p-6 space-y-4 mb-2">
            {/* Title */}
            <div className="h-6 bg-gray-200 rounded w-2/3 mb-2" />

            {/* Location and SDGs */}
            <div className="flex items-center justify-between text-sm mb-4">
              <div className="h-4 bg-gray-200 rounded w-1/3" />
              <div className="flex gap-1">
                {Array.from({ length: 1 }).map((_, i) => (
                  <div key={i} className="w-8 h-8 bg-gray-200 rounded-md" />
                ))}
              </div>
            </div>

            {/* Information Table */}
            <div className="space-y-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex justify-between">
                  <div className="h-4 bg-gray-200 rounded w-1/4 mb-1" />
                  <div className="h-4 bg-gray-200 rounded w-1/5" />
                </div>
              ))}
            </div>

            {/* Price Section */}
            <div className="bg-gray-100 p-3 rounded-lg">
              <div className="flex justify-between text-sm mb-2">
                <div className="h-4 bg-gray-300 rounded w-1/4" />
                <div className="h-4 bg-gray-300 rounded w-1/4" />
              </div>
              <hr className="my-2" />
              <div className="flex justify-between text-lg font-bold">
                <div className="h-6 bg-gray-300 rounded w-1/3" />
                <div className="h-6 bg-gray-300 rounded w-1/4" />
              </div>
            </div>
          </div>
        </div>
      );

    case "headerRight":
      return (
        <div className="flex items-center gap-[var(--spacing-400)]">
          <div className="flex items-center space-x-2 bg-gray-100 rounded-full py-2 px-3 animate-pulse">
            <div className="w-8 h-8 bg-gray-300 rounded-full" />
            <div className="w-16 h-4 bg-gray-300 rounded" />
          </div>
          <div className="w-10 h-10 bg-gray-100 rounded-full animate-pulse flex items-center justify-center">
            <div className="w-6 h-6 bg-gray-300 rounded-full" />
          </div>
        </div>
      );

    default:
      return null;
  }
};