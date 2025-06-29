import React from "react";
import Image from "next/image";
import { StarRating } from "./StarRating";
import { ActionButton } from "./ActionButton";
import { SDGIcons } from "./SDGIcons";
import { SharedExperienceCardProps } from "./ExperienceCard";
import LocationDisplay from "./LocationDisplay";

export const GridLayout: React.FC<SharedExperienceCardProps> = ({
  experience,
  isFavorited,
  onFavoriteClick,
  onCartClick,
  onDetailsClick,
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
      className="relative w-full max-w-xs aspect-[2/3] rounded-lg shadow-md transition-transform transform hover:scale-[1.02] hover:shadow-xl cursor-pointer overflow-hidden flex flex-col"
      onClick={onDetailsClick}
    >
      {/* Favorite Icon */}
      <div className="absolute top-2 right-2 z-10">
        <ActionButton
          icon={isFavorited ? "/assets/HeartFilled.svg" : "/assets/Heart.svg"}
          alt="Favorite"
          tooltip={isFavorited ? "Remove from favorites" : "Add to favorites"}
          onClick={onFavoriteClick}
          className="w-10 h-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center transition-colors cursor-pointer"
          size={20}
        />
      </div>

      {/* Image */}
      <div className="relative h-2/3 w-full">
        <Image
          src={experience_promo_image}
          alt={name}
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col justify-between flex-grow bg-white">
        <div>
          <div className="min-h-[4.5rem]">
            <h3 className="font-semibold text-lg text-gray-800 leading-tight">{name}</h3>
            <LocationDisplay city={experience_city} country={experience_country} />
          </div>
          <div className="mt-2">
            <StarRating rating={rating_avg} size={4} showValue={false}/>
          </div>
        </div>

        <div className="flex justify-between items-center mt-2">
          {/* Price + Cart */}
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-black">
              $ {getPrice().toFixed(2)}
            </span>
            <ActionButton
              icon="/assets/shopping.svg"
              alt="Cart"
              tooltip="Checkout"
              onClick={onCartClick}
              size={25}
            />
          </div>

          {/* SDGs */}
          <SDGIcons goals={sustainability_goal} iconSize={30} maxDisplay={2} />
        </div>
      </div>
    </div>
  );
};