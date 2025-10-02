import React from "react";
import Image from "next/image";
import { StarRating } from "./StarRating";
import { Button } from "../ui/button";
import LocationDisplay from "./LocationDisplay";
import { SDGIcons } from "./SDGIcons";
import { SharedExperienceCardProps } from "./ExperienceCard";
import { EmptyHeart, FilledHeart, Share, ShoppingCart } from "../shared/IconComponents";
import { ActionButton } from "./ActionButton";
import { Gift, Timer } from "lucide-react";

export const DetailsLayout: React.FC<SharedExperienceCardProps> = ({
  experience,
  onCartClick,
  isFavorited,
  onFavoriteClick,
  getPrice,
}) => {
  const {
    name,
    experience_description,
    experience_promo_image = "/assets/Rectangle.png",
    experience_city,
    experience_country,
    rating_avg,
    sustainability_goal = [],
  } = experience;

  return (
    <div className="relative flex w-full h-[var(--experiencedetails-image-height)] gap-[var(--spacing-800)]">
      {/* === Image === */}
      <div className="relative w-[var(--experiencedetails-image-width)] h-full rounded-600 overflow-hidden flex-shrink-0">
        <Image
          src={experience_promo_image}
          alt={name}
          fill
          className="object-cover"
        />
      </div>

      {/* === Content === */}
      <div className="flex flex-col justify-between px-[var(--spacing-800)] py-[var(--spacing-1200)] gap-[var(--spacing-600)] w-full">
        {/* --- Top div --- */}
        <div className="flex flex-col gap-[var(--spacing-400)]">
          <h3 className="body-xxl-label text-secondary">{name}</h3>
          <StarRating rating={rating_avg} size={5} renderPartner />
        </div>

        {/* --- Content div --- */}
        <div className="flex flex-col gap-[var(--spacing-300)] items-start">
          <LocationDisplay city={experience_city} country={experience_country} />
          <p className="body-l text-primary">{experience_description}</p>
          <p className="body-m text-primary flex items-center gap-[var(--spacing-250)]">
            <Timer className="icon-size-s text-disabled" />
            Lorem ipsum dolor sit amet
          </p>
          <p className="body-m text-primary flex items-center gap-[var(--spacing-250)]">
            <Gift className="icon-size-s text-disabled" />
            Consectetur adipiscing elit
          </p>
        </div>

        {/* --- Bottom div --- */}
        <div className="flex justify-between items-end w-full">
          {/* SDGs */}
          <SDGIcons goals={sustainability_goal} iconClassName="icon-size-l" maxDisplay={3} />

          {/* Price & Button */}
          <div className="flex flex-col gap-[var(--spacing-100)] items-end">
            <p className="font-semibold body-xxl">
              € {getPrice().toFixed(2)}
              <span className="body-s ml-1">/person</span>
            </p>
            <Button
              onClick={onCartClick}
              size="default"
              className="body-l-button w-full"
            >
              <ShoppingCart className="icon-size-s" />
              Add to cart
            </Button>
          </div>
        </div>
        {/* === Action buttons === */}
        <div className="absolute top-[var(--spacing-200)] right-[var(--spacing-200)] flex gap-[var(--spacing-600)]">
          <ActionButton
            icon={Share}
            tooltip="Share experience" 
            onClick={() => {}} 
          />
          <ActionButton
            icon={isFavorited ? FilledHeart : EmptyHeart}
            tooltip={isFavorited ? "Remove from favorites" : "Add to favorites"}
            onClick={onFavoriteClick}
          />
        </div>
      </div>
    </div>
  );
};
