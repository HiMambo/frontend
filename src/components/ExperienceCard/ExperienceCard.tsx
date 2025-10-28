"use client";

import { useState } from "react";
import React from "react";
import { useRouter } from "next/navigation";
import { useBooking } from "@/context/BookingContext";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Experience } from "@/lib/api";
import { HomeLayout } from "./HomeLayout";
import { GridLayout } from "./GridLayout";
import { ListLayout } from "./ListLayout";
import { DetailsLayout } from "./DetailsLayout";

interface ExperienceCardProps {
  experience: Experience;
  view?: "list" | "grid" | "home" | "details";
}

export interface SharedExperienceCardProps {
  experience: Experience;
  isFavorited: boolean;
  onFavoriteClick: (e: React.MouseEvent) => void;
  onCartClick: (e: React.MouseEvent) => void;
  onDetailsClick: (e: React.MouseEvent) => void;
  onShareClick: (e: React.MouseEvent) => void;
  getPrice: () => number;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({
  experience,
  view = "list",
}) => {
  const router = useRouter();
  const { setCartExperience } = useBooking();
  const [isFavorited, setIsFavorited] = useState(false);

  // Helper functions
  const getPrice = () => parseFloat(experience.experience_price);

  // Event handlers
  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorited((prev) => !prev);
    try {
      await fetch("/api/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ experience_id: experience.id }), //Placeholders. Needs to be implemented with backend. Add loading state when that happens
      });
    } catch (error) {
      console.error("Failed to favorite", error);
    }
  };

  const handleCartClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    console.log("Adding experience to cart:", experience);
    setCartExperience(experience);
    router.push("/payment");
  };

  const handleDetailsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/experience/${experience.id}`);
  };

  const handleShareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    //Placeholder for share logic
  };

  // Shared props for layout components
  const sharedProps: SharedExperienceCardProps = {
    experience,
    isFavorited,
    onFavoriteClick: handleFavoriteClick,
    onCartClick: handleCartClick,
    onDetailsClick: handleDetailsClick,
    onShareClick: handleShareClick,
    getPrice,
  };

  return (
  <TooltipProvider>
    {{
      home: <HomeLayout {...sharedProps} />,
      grid: <GridLayout {...sharedProps} />,
      list: <ListLayout {...sharedProps} />,
      details: <DetailsLayout {...sharedProps} />,
    }[view]}
  </TooltipProvider>
  );
};

export default ExperienceCard;
