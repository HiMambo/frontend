import React from "react";
import Image from "next/image";
import { StarRating } from "./StarRating";
import { ActionButton } from "./ActionButton";
import { SDGIcons } from "./SDGIcons";
import { SharedExperienceCardProps } from "./ExperienceCard";

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
      className="h-[260px] p-4 rounded-lg shadow-lg transition-transform transform hover:scale-[1.02] hover:shadow-xl cursor-pointer overflow-hidden flex flex-col sm:flex-row border-t-indigo-50"
      onClick={onCartClick}
    >
      {/* Image */}
      <div className="relative w-[340px] h-[230px]">
        <Image
          className="rounded"
          src={experience_promo_image}
          alt={name}
          layout="fill"
          objectFit="cover"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col pl-4 pt-1 w-full sm:w-2/3 h-full">
        {/* Header: Title, Location, Rating */}
        <div className="flex flex-col sm:flex-row justify-between">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-800">{name}</h3>
            <p className="text-sm text-gray-600">{experience_city}, {experience_country}</p>
          </div>
          {/* Rating */}
          <div className="pt-1 pl-3">
            <StarRating rating={rating_avg} size={5} />
          </div>
        </div>

        {/* Description (flex-grow, truncate if needed) */}
        <p className="text-gray-500 text-sm mt-5 overflow-hidden text-ellipsis line-clamp-3 pb-2">
          {experience_description}
        </p>

        {/* Bottom section */}
        <div className="mt-auto">
          {/* Price */}
          <div className="flex items-center justify-between">
            <p className="text-lg font-semibold">$ {getPrice().toFixed(2)}</p>
          </div>

          {/* Action Buttons & SDG Icons */}
          <div className="flex flex-col sm:flex-row justify-between gap-4 mt-3">
            <div className="flex items-center gap-2 flex-wrap">
              <ActionButton
                icon="/assets/Magnifier.svg"
                alt="View details"
                tooltip="View details"
                onClick={onDetailsClick}
                size={19}
              />              
              <ActionButton
                icon={isFavorited ? "/assets/HeartFilled.svg" : "/assets/Heart.svg"}
                alt="Like"
                tooltip={isFavorited ? "Remove from favorites" : "Add to favorites"}
                onClick={onFavoriteClick}
                size={20}
              />
              <ActionButton
                icon="/assets/shopping.svg"
                alt="Add to cart"
                tooltip="Proceed to checkout"
                onClick={onCartClick}
                size={25}
              />
            </div>

            <div className="flex items-center flex-wrap gap-2">
              <SDGIcons goals={sustainability_goal} iconSize={40} maxDisplay={5} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};