import React from "react";
import Image from "next/image";
import { SharedExperienceCardProps } from "./ExperienceCard";
import LocationDisplay from "./LocationDisplay";
import { StarRating } from "./StarRating";

export const HomeLayout: React.FC<SharedExperienceCardProps> = ({
  experience,
  onDetailsClick,
}) => {
  const {
    name,
    experience_description,
    experience_promo_image = "/assets/Rectangle.png",
    experience_city,
    experience_country,
    rating_avg,
  } = experience;

    return (
    <div
      className="relative w-full aspect-[3/5] gap-[var(--spacing-1200)] rounded-800 p-[var(--spacing-800)] transition-transform transform hover:scale-[1.01] hover:shadow-elevation-1 hover:bg-[var(--surface)] cursor-pointer overflow-hidden flex flex-col"
      onClick={onDetailsClick}
    >
    {/* Image */}
    <div className="relative h-1/2 w-full">
      <Image
        src={experience_promo_image}
        alt={name}
        layout="fill"
        objectFit="cover"
        className="rounded-600"
      />
    </div>

    {/* Content */}
    <div className="flex flex-col gap-[var(--spacing-400)]">
      {/* Title */}
      <div className="h-[calc(var(--leading-body-xxl)*2.3)] overflow-hidden">
        <h3 className="body-xxl-label text-secondary">{name}</h3>
      </div>

      <StarRating
        rating={rating_avg}
        size={5}
        ratingClassName="body-l-button px-[var(--spacing-200)] py-[var(--spacing-050)]"
        ratingnumberClassName="body-l-light"
      />

      <div className="flex flex-col gap-[var(--spacing-300)]">
        <LocationDisplay
          city={experience_city}
          country={experience_country}
          className="body-l"
        />
        <p className="body-xl text-primary">{experience_description}</p>
      </div>
    </div>
  </div>
  );
};