import React from "react";
import Image from "next/image";
import { StarRating } from "./StarRating";
import { ActionButton } from "./ActionButton";
import { SDGIcons } from "./SDGIcons";
import { SharedExperienceCardProps } from "./ExperienceCard";
import LocationDisplay from "./LocationDisplay";
import { FilledHeart, EmptyHeart, Share, ShoppingCart } from "../shared/IconComponents";
import { Button } from "../ui/button";

export const ListLayout: React.FC<SharedExperienceCardProps> = ({
  experience,
  isFavorited,
  onFavoriteClick,
  onCartClick,
  onDetailsClick,
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
<div 
  className="group flex flex-col sm:flex-row h-[320px] rounded-800 hover:shadow-elevation-1 overflow-hidden hover:scale-[1.01] transition-transform bg-surface text-primary cursor-pointer"
  onClick={onDetailsClick}
>
  {/* Image */}
  <div className="relative w-full sm:w-[320px] h-[320px] flex-shrink-0">
    <Image
      className="object-cover"
      src={experience_promo_image}
      alt={name}
      fill
    />
  </div>

  {/* Content */}
  <div className="flex flex-col justify-between p-[var(--spacing-600)] pl-[var(--spacing-1600)] w-full h-full gap-[var(--spacing-400)]">
    
    {/* === Top section: Title + rating + actions === */}
    <div className="flex justify-between items-start">
      <div className="flex flex-col gap-[var(--spacing-400)]">
        <h3 className="body-xxl-label text-secondary">{name}</h3>
        <StarRating rating={rating_avg} size={5} />
      </div>

      {/* Top right actions */}
      <div className="flex gap-2">
        <ActionButton
          icon={Share}
          tooltip="Share experience"
          onClick={() => {}}
          size={20}
        />
        <ActionButton
          icon={isFavorited ? FilledHeart : EmptyHeart}
          tooltip={isFavorited ? "Remove from favorites" : "Add to favorites"}
          onClick={onFavoriteClick}
          size={20}
        />
      </div>
    </div>

    {/* === Middle section: Location, description, highlights === */}
    <div className="flex flex-col gap-[var(--spacing-300)]">
      <LocationDisplay city={experience_city} country={experience_country} />
      <p className="body-l line-clamp-2">{experience_description}</p>
      <ul className="body-m space-y-[var(--spacing-300)]">
        <li>✔ Highlight placeholder 1</li>
        <li>✔ Highlight placeholder 2</li>
      </ul>
    </div>

    {/* === Bottom section: SDGs + price & button === */}
    <div className="flex justify-between items-end">
      <SDGIcons goals={sustainability_goal} iconSize={36} maxDisplay={5} />

      <div className="relative h-[40px] flex items-end">
        {/* Price */}
        <p className="absolute right-0 bottom-0 font-semibold transition-transform duration-200 group-hover:-translate-y-11 whitespace-nowrap">
          <span className="body-xxl">€ {getPrice().toFixed(2)}</span>
          <span className="body-s ml-1">/person</span>
        </p>
        
        {/* Button */}
        <Button
          onClick={onCartClick}
          className="absolute body-l-button right-0 bottom-0 opacity-0 translate-y-[44px] group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200"
          size="default"
        >
          <ShoppingCart className="icon-s" />
          Book now
        </Button>
      </div>
    </div>
  </div>
</div>
  );
};
