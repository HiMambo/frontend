"use client";
import Image from "next/image";
import React, { useEffect, useMemo } from "react";
import { useCart } from "@/context/Cart";
import { SDGIcons } from "../ExperienceCard/SDGIcons";
import { SkeletonCard } from "../shared/SkeletonCard";
import ErrorMessage from "../shared/ErrorMessage";

const BookingSummary: React.FC = () => {
  const { experience, number_of_people, discount, isHydrated } = useCart(); // Get the experience from the Cart context

  // Component mount and data check
  useEffect(() => {
    console.log("BookingSummary mounted");
  }, []);

  // Experience-dependent effect
  useEffect(() => {
    if (!isHydrated) return; // Don't log too early

    console.log("Selected experience from context:", experience?.id);
    
    if (!experience?.id) {
      console.error("No experience selected.");
    }
  }, [experience?.id, isHydrated]);

  // Calculate total price using useMemo to prevent unnecessary recalculations
  const basePrice = useMemo(() => {
    if (!isHydrated || !experience) return 0;

    return typeof experience.experience_price === 'string'
      ? parseFloat(experience.experience_price)
      : experience.experience_price;
  }, [experience, isHydrated]);

  // Calculate total price based on basePrice
  const totalPrice = useMemo(() => {
    if (!isHydrated || !experience) return 0;

    const multiplierCrypto = (100 - discount) / 100; // Convert discount percentage to multiplier
    const calculated = basePrice * number_of_people * multiplierCrypto;
    console.log("Total discount:", discount);
    console.log("Total price updated:", calculated);
    return calculated;
  }, [basePrice, number_of_people, discount, isHydrated, experience]);

  if (!isHydrated) {
    console.log("Attempting to load experience from local storage");
    return (
      <SkeletonCard view={"bookingSummary"} />
    );
  }
  
  if (!experience) {
    console.log("No experience data available.");
    return <ErrorMessage message="No experience in cart!" />;
  }

  console.log("Rendering BookingSummary with experience:", experience);

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      {/* Top image */}
      <div className="w-full h-48 relative">
        <Image
          src={experience.experience_promo_image}
          alt={experience.name}
          layout="fill"
          objectFit="cover"
        />
      </div>

      <div className="p-6">
        {/* Title */}
        <h2 className="text-xl font-bold text-brand-blue mb-2">
          {experience.name || "Untitled Experience"}
        </h2>

      {/* Location + SDG badges */}
      <div className="flex justify-between items-center text-sm mb-4">
        {/* Left side: location */}
        <div className="text-gray-600">
          {`${experience.experience_city}, ${experience.experience_country}`}
        </div>
        {/* Right side: SDG icons */}
        <div>
          <SDGIcons iconSize={33} goals={experience.sustainability_goal} maxDisplay={1} />
        </div>
      </div>

        {/* Information Table */}
        <div className="text-sm text-gray-700 space-y-1 mb-6">
          <div className="flex justify-between">
            <span className="font-medium">Travel date</span>
            <span>{experience.travelDate || "June 13th 2025"}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Departure</span>
            <span>{experience.departure || "09:30 a.m."}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Travellers</span>
            <span>{experience.travellers || "2"}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Duration</span>
            <span>{experience.duration || "10 hours"}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Refundability</span>
            <span>{experience.refundable || "Refundable"}</span>
          </div>
        </div>

        {/* Payment Section */}
        <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-700">Price per person</span>
          <span className="text-gray-700">
            US$ {basePrice.toFixed(2)}
          </span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>Total before discount</span>
            <span>US$ {(basePrice * number_of_people).toFixed(2)}</span>
          </div>
        )}

        <hr className="my-2" />

        <div className="flex justify-between text-lg font-bold text-brand-orange relative">
          <span>TOTAL CHARGE</span>
          <span>US$ {totalPrice.toFixed(2)}</span>
          {discount > 0 && (
            <span className="absolute -top-2 -right-10 bg-pink-500 text-white text-xs font-semibold h-6 px-1 rounded-full flex items-center justify-center">
              -{discount}%
            </span>
          )}
        </div>
      </div>
      </div>
    </div>
  );
};

export default BookingSummary;