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
import ErrorMessage from "../shared/ErrorMessage";
import { Experience } from "@/lib/api";

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
    return <ErrorMessage message={error} />;
  }

  return (
<Carousel
  opts={{
    align: "center", // instead of "start"
  }}
  className="w-full max-w-6xl mx-auto"
>
  <CarouselContent className="gap-1"> {/* use flex gap instead of pl */}
    {(loading ? Array(6).fill(null) : experiences).map((experience, index) => (
      <CarouselItem
        key={loading ? `skeleton-${index}` : experience.id}
        className="py-8 md:basis-1/2 lg:basis-1/3 max-w-sm"
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
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};
