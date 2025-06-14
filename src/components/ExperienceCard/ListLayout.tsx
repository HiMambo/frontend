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
      className="rounded-lg shadow-lg transition-transform transform hover:scale-[1.02] hover:shadow-xl cursor-pointer overflow-hidden flex flex-col sm:flex-row border-t-indigo-50"
      onClick={onCartClick}
    >
      {/* Image */}
      <div className="w-full sm:w-1/3 relative min-h-[200px]">
        <Image
          className="p-4"
          src={experience_promo_image}
          alt={name}
          layout="fill"
          objectFit="cover"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col justify-between w-full sm:w-2/3">
        <div className="flex flex-col sm:flex-row sm:justify-between">
          <div className="pt-3 sm:pt-0">
            <h3 className="mb-2 text-lg sm:text-xl font-bold text-gray-800">
              {name}
            </h3>
            <p className="text-sm text-gray-600">{experience_city}, {experience_country}</p>
            <p className="text-gray-500 text-sm mt-2">{experience_description}</p>
          </div>

          {/* Rating */}
          <div className="pt-3 sm:pt-0 sm:pl-4">
            <StarRating rating={rating_avg} size={5} />
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mt-4">
          <p className="text-lg font-semibold">
            $ {getPrice().toFixed(2)}
          </p>
        </div>

        {/* Icons & Tags */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 mt-4">
          {/* Action Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            <ActionButton
              icon="/assets/shopping.svg"
              alt="Add to cart"
              tooltip="Proceed to checkout"
              onClick={onCartClick}
              size={25}
            />
            <ActionButton
              icon={isFavorited ? "/assets/HeartFilled.svg" : "/assets/Heart.svg"}
              alt="Like"
              tooltip={isFavorited ? "Remove from favorites" : "Add to favorites"}
              onClick={onFavoriteClick}
              size={20}
            />
            <ActionButton
              icon="/assets/Magnifier.svg"
              alt="View details"
              tooltip="View details"
              onClick={onDetailsClick}
              size={19}
            />
          </div>

          {/* Sustainability Icons */}
          <div className="flex items-center flex-wrap gap-2">
            <SDGIcons goals={sustainability_goal} iconSize={40} maxDisplay={5} />
          </div>
        </div>
      </div>
    </div>
  );
};