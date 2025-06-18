import React from 'react';
import { Star, ArrowRight, Heart } from 'lucide-react';

type SkeletonCardProps = {
  view: "grid" | "list" | "home";
  index: number;
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
        <div className="h-[260px] p-4 rounded-lg shadow-lg cursor-pointer overflow-hidden flex flex-col sm:flex-row border-t-indigo-50 bg-white animate-pulse">
          {/* Image */}
          <div className="relative w-[335px] h-[230px] bg-gray-200 rounded flex-shrink-0" />
          
          {/* Content */}
          <div className="flex flex-col pl-4 pt-1 w-full sm:w-2/3 h-full">
            {/* Header: Title, Location, Rating */}
            <div className="flex flex-col sm:flex-row justify-between">
              <div className="flex-1">
                {/* Title */}
                <div 
                  className="h-6 bg-gray-200 rounded mb-1" 
                  style={{ width: variant.titleWidth }} 
                />
                {/* Location skeleton */}
                <div 
                  className="h-4 bg-gray-200 rounded" 
                  style={{ width: variant.locationWidth }} 
                />
              </div>
              
              {/* Rating */}
              <div className="pl-3 pt-1 flex space-x-1">
                {Array.from({ length: variant.starCount }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-gray-200 stroke-none" />
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="mt-5 space-y-2 flex-grow">
              {Array.from({ length: Math.min(variant.descLines, 3) }).map((_, i) => (
                <div 
                  key={i} 
                  className="h-4 bg-gray-200 rounded" 
                  style={{ 
                    width: i === Math.min(variant.descLines, 3) - 1 ? '60%' : '95%' 
                  }} 
                />
              ))}
            </div>

            {/* Bottom section */}
            <div className="mt-auto pt-4">
              {/* Price skeleton */}
              <div className="flex items-center justify-between mb-3">
                <div className="h-6 w-24 bg-gray-200 rounded" />
              </div>
              
              {/* Action Buttons & SDG Icons */}
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                {/* Action buttons */}
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="w-10 h-10 bg-gray-200 rounded-full" />
                  <div className="w-10 h-10 bg-gray-200 rounded-full" />
                  <div className="w-10 h-10 bg-gray-200 rounded-full" />
                </div>
                
                {/* SDG badges */}
                <div className="flex items-center flex-wrap gap-1">
                  {Array.from({ length: variant.sdgCount }).map((_, i) => (
                    <div key={i} className="w-10 h-10 bg-gray-200 rounded-md" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      );

    case "home":
      return (
        <div className="relative w-full aspect-[3/5] max-w-4xl rounded-lg shadow-md animate-wave overflow-hidden flex flex-col bg-white">
          {/* Image placeholder */}
          <div className="h-1/2 w-full bg-gray-200" />

          {/* Content */}
          <div className="flex-grow p-4 space-y-3 flex flex-col justify-between">
            <div>
              {/* Title and location */}
              <div className="h-6 bg-gray-200 rounded" style={{ width: variant.titleWidth }} />
              <div className="h-3 bg-gray-200 rounded mt-2" style={{ width: variant.locationWidth }} />
              
              {/* Description lines */}
              <div className="mt-8 space-y-2">
                {Array.from({ length: variant.descLines }).map((_, i) => (
                  <div 
                    key={i} 
                    className="h-4 bg-gray-200 rounded" 
                    style={{ width: i === variant.descLines - 1 ? '65%' : '95%' }} 
                  />
                ))}
              </div>
            </div>

            {/* Bottom section - SDG badges and Learn more */}
            <div className="flex justify-between items-center">
              {/* SDG badges */}
              <div className="flex gap-1">
                {Array.from({ length: variant.sdgCount }).map((_, i) => (
                  <div key={i} className="w-12 h-12 bg-gray-200 rounded-md" />
                ))}
              </div>

              {/* Learn more placeholder */}
              <div className="flex items-center gap-1">
                <div className="h-4 w-20 bg-gray-200 rounded" />
                <ArrowRight className="w-5 h-5 text-gray-200" />
              </div>
            </div>
          </div>
        </div>
      );

    default:
      return null;
  }
};