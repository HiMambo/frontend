"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { StarRating } from "./StarRating";
import { ActionButton } from "./ActionButton";
import { SDGIcons } from "./SDGIcons";
import LocationDisplay from "./LocationDisplay";
import { FilledHeart, EmptyHeart, ShoppingCart, Share } from "../shared/IconComponents";
import { SharedExperienceCardProps } from "./ExperienceCard";
import { ShieldCheck, Timer } from "lucide-react";

export const GridLayout: React.FC<SharedExperienceCardProps> = ({
  experience,
  isFavorited,
  onFavoriteClick,
  onCartClick,
  onDetailsClick,
  onShareClick,
  getPrice,
}) => {
  const {
    name,
    experience_promo_image = "/assets/Rectangle.png",
    experience_city,
    experience_country,
    rating_avg,
    sustainability_goal = [],
  } = experience;

  return (
    <div
      className="group relative w-[var(--width-experience-gridcard)] flex flex-col rounded-800 overflow-hidden bg-surface hover:shadow-elevation-1 transition-all duration-300 cursor-pointer"
      onClick={onDetailsClick}
    >
      {/* Favorite Button */}
      <div className="absolute top-[var(--spacing-400)] right-[var(--spacing-300)] flex gap-[var(--spacing-600)] z-10">
        <ActionButton
          icon={Share}
          tooltip="Share experience"
          onClick={onShareClick}
        />
        <ActionButton
          icon={isFavorited ? FilledHeart : EmptyHeart}
          tooltip={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
          onClick={onFavoriteClick}
        />
      </div>

      {/* Image */}
      <div className="relative w-full h-[var(--height-image-gridcard)]">
        <Image
          src={experience_promo_image}
          alt={name}
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between p-[var(--spacing-800)] gap-[var(--spacing-600)] flex-grow">
        {/* Title + Rating */}
        <div className="flex flex-col gap-[var(--spacing-400)]">
          <div className="min-h-[3.6rem] body-xxl-label text-secondary line-clamp-2">
            {name}
          </div>
          <StarRating rating={rating_avg} size={5} />
        </div>

        {/* Description Area */}
        <div className="flex flex-col gap-[var(--spacing-300)]">
          <LocationDisplay city={experience_city} country={experience_country} />
          <p className="body-l text-primary line-clamp-2">{experience.experience_description}</p>
          <p className="body-m text-primary flex items-center gap-[var(--spacing-250)]">
            <Timer className="icon-size-s text-disabled" />
            Lorem ipsum dolor sit amet
          </p>
          <p className="body-m text-primary flex items-center gap-[var(--spacing-250)]">
            <ShieldCheck className="icon-size-s text-disabled" />
            Consectetur adipiscing elit
          </p>
        </div>

        {/* Bottom Section */}
        <div className="flex justify-between items-end mt-auto">
          {/* SDGs */}
          <SDGIcons
            goals={sustainability_goal}
            iconClassName="icon-size-l"
            maxDisplay={3}
          />

          {/* Price + Button */}
          <div className="relative h-[40px] flex items-end">
            <div className="flex flex-col gap-0 items-end">
              {/* Price */}
              <p className="transition-transform duration-200 translate-y-[120%] group-hover:translate-y-0 whitespace-nowrap">
                <span className="body-xxl">€ {getPrice().toFixed(2)}</span>
                <span className="body-s ml-1">/person</span>
              </p>

              {/* Button */}
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  onCartClick(e);
                }}
                className="body-l-button opacity-0 translate-y-[100%] group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 w-full"
                size="default"
              >
                <ShoppingCart className="icon-size-s" />
                Book now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
