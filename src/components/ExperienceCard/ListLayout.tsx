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
      <div className="flex flex-col justify-between p-200 pl-400 w-full">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h3 className="body-xl-label text-secondary">{name}</h3>
            {/* Rating + placeholder for reviews */}
            <div className="flex items-center gap-2 mt-2">
              <StarRating rating={rating_avg} size={5} />
              <span className="text-sm">
                {/* Placeholder for reviews count */}
                (XXX reviews)
              </span>
            </div>
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

        {/* Location */}
        <div className="mt-2">
          <LocationDisplay city={experience_city} country={experience_country} />
        </div>

        {/* Description */}
        <p className="body-m mt-1 line-clamp-2">
          {experience_description}
        </p>

        {/* Highlights (placeholders for tick marks) */}
        <ul className="mt-1 body-s space-y-1">
          <li>✔ Highlight placeholder 1</li>
          <li>✔ Highlight placeholder 2</li>
        </ul>

        {/* Bottom section */}
        <div className="flex justify-between items-end mt-4">
          {/* SDG Icons */}
          <SDGIcons goals={sustainability_goal} iconSize={36} maxDisplay={5} />

          {/* Price + Add to cart (fixed height container) */}
          <div className="relative h-[40px] flex items-end">
            {/* Price */}
            <p className="absolute right-0 bottom-0 font-semibold transition-transform duration-200 group-hover:-translate-y-11 whitespace-nowrap">
              <span className="body-xl">€ {getPrice().toFixed(2)}</span>
              <span className="body-xs ml-1">/person</span>
            </p>
            
            {/* Button */}
            <Button
              onClick={onCartClick}
              className="absolute body-m-button text-inverted right-0 bottom-0 opacity-0 translate-y-[44px] group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 hover:bg-[var(--terracotta-900)] hover:text-[var(--yellow-500)] !px-8 !py-4"
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