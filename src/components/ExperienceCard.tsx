"use client";

import { useState } from "react";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/Cart";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Star, StarOff } from "./shared/IconComponents";

interface ExperienceCardProps {
  id: number;
  title: string;
  price: number;
  location: string;
  image: string | null;
  description: string;
  discount?: number | null;
  rating?: number | null;
  sustainabilityGoal?: string[];
  view?: "list" | "grid";
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({
  id,
  title,
  price,
  location,
  image,
  description,
  discount = null,
  rating = 4,
  sustainabilityGoal = [],
  view = "list",
}) => {
  const imageSrc = image ?? "/assets/Rectangle.png";
  const safeRating = rating ?? 4;
  const router = useRouter();
  const { setPrice, setExperienceId } = useCart();
  const [isFavorited, setIsFavorited] = useState(false);

  const handleFavoriteClick = async () => {
    setIsFavorited((prev) => !prev);
    try {
      await fetch("/api/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ experienceId: id }),
      });
    } catch (error) {
      console.error("Failed to favorite", error);
    }
  };

  const handleCartClick = () => {
    setPrice(price);
    setExperienceId(id);
    router.push("/payment");
  };

  const handleMagnifierClick = () => {
    router.push(`/experience/${id}`);
  };

  if (view === "grid") {
    return (
      <TooltipProvider>
        <div
          className="relative w-full max-w-xs aspect-[2/3] rounded-lg shadow-md transition-transform transform hover:scale-[1.02] hover:shadow-xl cursor-pointer overflow-hidden flex flex-col"
          onClick={handleMagnifierClick}
        >
          {/* Favorite Icon */}
          <div className="absolute top-2 right-2 z-10">
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFavoriteClick();
                  }}
                  className="w-10 h-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center"
                >
                  <Image
                    src={
                      isFavorited
                        ? "/assets/HeartFilled.svg"
                        : "/assets/Heart.svg"
                    }
                    alt="Favorite"
                    width={20}
                    height={20}
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                {isFavorited ? "Remove from favorites" : "Add to favorites"}
              </TooltipContent>
            </Tooltip>
          </div>

          {/* Image */}
          <div className="relative h-2/3 w-full">
            <Image
              src={imageSrc}
              alt={title}
              layout="fill"
              objectFit="cover"
              className="rounded-t-lg"
            />
          </div>

          {/* Content */}
          <div className="p-4 flex flex-col justify-between flex-grow bg-white">
            <div>
              <h3 className="font-semibold text-lg text-gray-800">{title}</h3>
              <p className="text-sm text-gray-500 mt-1">{location}</p>
              <div className="flex items-center space-x-1 text-yellow-400 mt-2">
                {Array.from({ length: 5 }, (_, index) =>
                  index < safeRating ? (
                    <Star key={index} className="w-4 h-4" />
                  ) : (
                    <StarOff key={index} className="w-4 h-4" />
                  )
                )}
              </div>
            </div>

            <div className="flex justify-between items-center mt-2">
              {/* Price + Cart */}
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-black">${price}</span>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCartClick();
                      }}
                      className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                    >
                      <Image
                        src="/assets/shopping.svg"
                        alt="Cart"
                        width={25}
                        height={25}
                      />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>Checkout</TooltipContent>
                </Tooltip>
              </div>

              {/* SDGs */}
              <div className="flex items-center gap-[2px]">
                {sustainabilityGoal.length > 0 && (
                  <>
                    {sustainabilityGoal.slice(0, 3).map((goal, index) => {
                      const imagePath = `/assets/sdg/E-WEB-Goal-${goal.padStart(2, "0")}.png`;
                      return (
                        <Image
                          key={index}
                          src={imagePath}
                          alt={`SDG ${goal}`}
                          width={30}
                          height={30}
                          className="rounded"
                        />
                      );
                    })}
                    {sustainabilityGoal.length > 3 && (
                      <span className="text-xs text-gray-500 font-medium">
                        +{sustainabilityGoal.length - 3}
                      </span>
                    )}
                  </>
                )}
              </div>
            </div>

          </div>
        </div>
      </TooltipProvider>
    );
  }

  // List view
  return (
    <TooltipProvider>
      <div 
      className="rounded-lg shadow-lg transition-transform transform hover:scale-[1.02] hover:shadow-xl overflow-hidden flex flex-col sm:flex-row border-t-indigo-50"
      >
        {/* Image */}
        <div className="w-full sm:w-1/3 relative min-h-[200px]">
          <Image
            className="p-4"
            src={imageSrc}
            alt={title}
            layout="fill"
            objectFit="cover"
          />
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col justify-between w-full sm:w-2/3">
          <div className="flex flex-col sm:flex-row sm:justify-between">
            <div className="pt-3 sm:pt-0">
              <h3 className="mb-2 text-lg sm:text-xl font-bold text-gray-800">
                {title}
              </h3>
              <p className="text-sm text-gray-600">{location}</p>
              <p className="text-gray-500 text-sm mt-2">{description}</p>
            </div>

            {/* Rating */}
            <div className="flex pt-3 sm:pt-0 sm:pl-4 space-x-1 text-yellow-400">
              {Array.from({ length: 5 }, (_, index) => (
                <span key={index}>
                  {index < safeRating ? (
                    <Star className="w-5 h-5" />
                  ) : (
                    <StarOff className="w-5 h-5" />
                  )}
                </span>
              ))}
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between mt-4">
            <p className="text-lg font-semibold text-brand-yellow">
              $ {price.toFixed(2)}
              {discount && (
                <span className="line-through text-gray-500 ml-2">
                  $ {discount.toFixed(2)}
                </span>
              )}
            </p>
          </div>

          {/* Icons & Tags */}
          <div className="flex flex-col sm:flex-row justify-between gap-4 mt-4">
            {/* Action Buttons */}
            <div className="flex items-center gap-2 flex-wrap">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors cursor-pointer">
                    <Image
                      src="/assets/shopping.svg"
                      alt="Add to cart"
                      width={25}
                      height={25}
                      onClick={handleCartClick}
                    />
                  </div>
                </TooltipTrigger>
                <TooltipContent>Proceed to checkout</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors cursor-pointer">
                    <Image
                      src={
                        isFavorited
                          ? "/assets/HeartFilled.svg"
                          : "/assets/Heart.svg"
                      }
                      alt="Like"
                      width={20}
                      height={20}
                      onClick={handleFavoriteClick}
                    />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  {isFavorited ? "Remove from favorites" : "Add to favorites"}
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors cursor-pointer">
                    <Image
                      src="/assets/Magnifier.svg"
                      alt="View details"
                      width={19}
                      height={19}
                      onClick={handleMagnifierClick}
                    />
                  </div>
                </TooltipTrigger>
                <TooltipContent>View details</TooltipContent>
              </Tooltip>
            </div>

            {/* Sustainability Icons */}
            <div className="flex items-center flex-wrap gap-2">
              {sustainabilityGoal?.length ? (
                sustainabilityGoal.map((goal, index) => {
                  const imagePath = `/assets/sdg/E-WEB-Goal-${goal.padStart(
                    2,
                    "0"
                  )}.png`;
                  return (
                    <Image
                      key={index}
                      src={imagePath}
                      alt={`Sustainability Goal ${goal}`}
                      width={40}
                      height={40}
                      className="rounded"
                    />
                  );
                })
              ) : (
                <Image
                  src="/assets/Frame2.png"
                  alt="SDG"
                  width={40}
                  height={40}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default ExperienceCard;
