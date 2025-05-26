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

interface ExperienceCardProps {
  id: number;
  title: string;
  price: number;
  location: string;
  image: string | null;
  description: string;
  discount?: number | null;
  rating?: number | null;
  sustainabilityGoal?: string[] | null;
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

  return (
    <TooltipProvider>
      <div className="border-t-indigo-50 max-h-72 rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row">
        {/* Image */}
        <div className="w-full md:w-1/4 relative min-h-[200px]">
          <Image
            className="p-4"
            src={imageSrc}
            alt={title}
            layout="fill"
            objectFit="cover"
          />
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col justify-between w-full md:w-3/4">
          <div className="flex justify-between">
            <div className="pt-3">
              <h3 className="mb-4 text-xl font-bold text-gray-800">{title}</h3>
              <p className="text-sm text-gray-600">{location}</p>
              <p className="text-gray-500 text-sm mt-2">{description}</p>
            </div>

            {/* Rating */}
            <div className="flex pt-3 space-x-1">
              {Array.from({ length: safeRating }, (_, index) => (
                <span key={index} className="text-yellow-400">⭐</span>
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
          <div className="flex justify-between">
            <div className="flex items-center space-x-2 mt-4">
              {/* Cart */}
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

              {/* Heart */}
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

              {/* Magnifier */}
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
            <div className="flex items-center space-x-2 mt-4">
              {sustainabilityGoal?.length ? (
                sustainabilityGoal.map((goal, index) => {
                  const imagePath = `/assets/sdg/E-WEB-Goal-${goal.padStart(2, "0")}.png`;
                  return (
                    <div key={index} className="flex items-center">
                      <Image
                        src={imagePath}
                        alt={`Sustainability Goal ${goal}`}
                        width={50}
                        height={50}
                        className="rounded"
                      />
                    </div>
                  );
                })
              ) : (
                <Image
                  src="/assets/Frame2.png"
                  alt="SDG"
                  width={50}
                  height={50}
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
