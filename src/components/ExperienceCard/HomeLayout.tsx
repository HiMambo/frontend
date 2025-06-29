import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { SDGIcons } from "./SDGIcons";
import { SharedExperienceCardProps } from "./ExperienceCard";
import LocationDisplay from "./LocationDisplay";

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
    sustainability_goal = [],
  } = experience;

    return (
    <div
      className="relative w-full aspect-[3/5] max-w-4xl rounded-lg shadow-md transition-transform transform hover:scale-[1.02] hover:shadow-xl cursor-pointer overflow-hidden flex flex-col"
      onClick={onDetailsClick}
    >
    {/* Image */}
    <div className="relative h-1/2 w-full">
      <Image
        src={experience_promo_image}
        alt={name}
        layout="fill"
        objectFit="cover"
        className="rounded-t-lg"
      />
    </div>

    {/* Content */}
    <div className="flex-grow bg-white p-4 flex flex-col justify-between">
      <div className="flex flex-col gap-1">
        <h3 className="font-bold text-xl text-gray-900">{name}</h3>
        <LocationDisplay city={experience_city} country={experience_country} />
        <p className="text-sm text-gray-500 mt-5">{experience_description}</p>
      </div>

      {/* SDGs */}  
      <div className="flex justify-between items-center mt-4">
      <SDGIcons goals={sustainability_goal} iconSize={50} maxDisplay={2} />

      {/* Learn More */}
      <button
        onClick={onDetailsClick}
        className="flex items-center gap-1 text-sm text-gray-500 underline hover:text-gray-900 transition-colors"
      >
        Learn more
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  </div>
</div>

  );
};