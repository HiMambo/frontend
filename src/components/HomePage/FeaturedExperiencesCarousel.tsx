"use client";

import React from "react";
import ExperienceCard from "@/components/ExperienceCard/ExperienceCard";
import { SkeletonCard } from "@/components/shared/SkeletonCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { AlertCircle } from "lucide-react";
import { Experience } from "@/types/experience";

interface FeaturedExperiencesCarouselProps {
  experiences: Experience[]
  loading: boolean;
  error: string | null;
}

export const FeaturedExperiencesCarousel: React.FC<FeaturedExperiencesCarouselProps> = ({
  experiences,
  loading,
  error,
}) => {
  const view = "home"

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <AlertCircle className="w-12 h-12 text-red-500" />
        <h3 className="text-lg font-semibold text-gray-800">{error}</h3>
      </div>
    );
  }

  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full max-w-6xl"
    >
      <CarouselContent>
        {(loading ? Array(6).fill(null) : experiences).map((experience, index) => (
          <CarouselItem
            key={loading ? `skeleton-${index}` : experience.id}
            className="pl-5 py-8 md:basis-1/2 lg:basis-1/3 max-w-xs sm:max-w-sm mx-auto"
          >
            {loading ? (
              <SkeletonCard index={index} view={view} />
            ) : (
              <ExperienceCard experience={experience} view={view} />
            )}
          </CarouselItem>
        ))}
      </CarouselContent>

      {/* Navigation Buttons */}
      <CarouselPrevious className="left-2 xl:left-[-45px] z-10" />
      <CarouselNext className="right-2 xl:right-[-45px] z-10" />
    </Carousel>
  );
};
