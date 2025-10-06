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
        <div className="relative w-[var(--width-experience-gridcard)] flex flex-col rounded-800 overflow-hidden bg-white shadow-md animate-wave">
          {/* Favorite Icon */}
          <div className="absolute top-[var(--spacing-400)] right-[var(--spacing-400)] z-10 rounded-full bg-white w-10 h-10 flex items-center justify-center">
            <Heart size={24} fill="#E5E7EB" stroke="none" />
          </div>

          {/* Image */}
          <div className="relative w-full h-[var(--height-image-gridcard)] bg-gray-200" />

          {/* Content */}
          <div className="flex flex-col justify-between p-[var(--spacing-800)] gap-[var(--spacing-600)] flex-grow">
            {/* Title + Rating */}
            <div className="flex flex-col gap-[var(--spacing-400)]">
              <div className="min-h-[3.6rem] space-y-2">
                <div className="h-5 bg-gray-200 rounded" style={{ width: variant.titleWidth }} />
                <div className="h-3 bg-gray-200 rounded" style={{ width: variant.locationWidth }} />
              </div>
              {/* Star rating */}
              <div className="flex gap-1">
                {Array.from({ length: variant.starCount }).map((_, i) => (
                  <Star key={i} className="w-4 h-4" fill="#E5E7EB" stroke="none" />
                ))}
              </div>
            </div>

            {/* Description placeholders */}
            <div className="flex flex-col gap-[var(--spacing-300)]">
              <div className="h-4 bg-gray-200 rounded w-[70%]" />
              <div className="h-4 bg-gray-200 rounded w-[80%]" />
              <div className="h-4 bg-gray-200 rounded w-[60%]" />
            </div>

            {/* Bottom section */}
            <div className="flex justify-between items-end mt-auto">
              {/* SDG placeholders */}
              <div className="flex gap-1">
                {Array.from({ length: variant.sdgCount }).map((_, i) => (
                  <div key={i} className="w-7 h-7 bg-gray-200 rounded-md" />
                ))}
              </div>

              {/* Price + button placeholder */}
              <div className="relative h-[40px] flex items-end">
                <div className="flex flex-col gap-0 items-end">
                  <div className="h-5 w-20 bg-gray-200 rounded mb-2" />
                  <div className="h-10 w-24 bg-gray-200 rounded" />
                </div>
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
        <div className="w-[var(--bookingsummary-width)] rounded-600 bg-white flex flex-col gap-[var(--spacing-1200)] overflow-hidden animate-pulse">
          {/* 1. Image Section */}
          <div className="w-full h-[var(--bookingsummary-image-height)] bg-gray-200" />

          {/* 2. Main Content Section */}
          <div className="flex flex-col px-[var(--spacing-800)] gap-[var(--spacing-400)]">
            {/* Title */}
            <div className="h-6 bg-gray-200 rounded w-2/3" />

            {/* Star Rating */}
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="w-6 h-6 bg-gray-200 rounded-full" />
              ))}
            </div>

            {/* Main Info */}
            <div className="flex flex-col gap-[var(--spacing-400)]">
              {/* Location */}
              <div className="h-4 bg-gray-200 rounded w-1/2" />
              
              {/* Travellers */}
              <div className="flex justify-between items-center border-b-2 border-gray-200 pb-[var(--spacing-200)]">
                <div className="h-4 bg-gray-200 rounded w-1/4" />
                <div className="flex items-center gap-[var(--spacing-300)]">
                  <div className="w-4 h-4 bg-gray-200 rounded" />
                  <div className="h-4 bg-gray-200 rounded w-6" />
                  <div className="w-4 h-4 bg-gray-200 rounded" />
                </div>
              </div>

              {/* Travel Date */}
              <div className="flex justify-between">
                <div className="h-4 bg-gray-200 rounded w-1/3" />
                <div className="h-4 bg-gray-200 rounded w-1/4" />
              </div>

              {/* Departure */}
              <div className="flex justify-between">
                <div className="h-4 bg-gray-200 rounded w-1/3" />
                <div className="h-4 bg-gray-200 rounded w-1/5" />
              </div>

              {/* Duration */}
              <div className="flex justify-between">
                <div className="h-4 bg-gray-200 rounded w-1/3" />
                <div className="h-4 bg-gray-200 rounded w-1/5" />
              </div>

              {/* Refundable */}
              <div className="flex justify-between">
                <div className="h-4 bg-gray-200 rounded w-1/3" />
                <div className="h-4 bg-gray-200 rounded w-1/6" />
              </div>
            </div>
          </div>

          {/* 3. Price Breakdown Section */}
          <div className="flex justify-between items-center border-t-2 border-gray-200 px-[var(--spacing-800)] py-[var(--spacing-600)]">
            <div className="h-4 bg-gray-200 rounded w-16" />
            <div className="h-6 bg-gray-200 rounded w-24" />
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