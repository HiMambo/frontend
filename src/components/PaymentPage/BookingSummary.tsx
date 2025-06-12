"use client";
import Image from "next/image";
import React, { useEffect, useMemo } from "react";
import { useCart } from "@/context/Cart";

const BookingSummary: React.FC = () => {
  const { experience, number_of_people, payment_type, discount } = useCart(); // Get the experience from the Cart context

  // Component mount and data check
  useEffect(() => {
    console.log("BookingSummary mounted");
  }, []);

  // Experience-dependent effect
  useEffect(() => {
    console.log("Selected experience from context:", experience);
    
    if (!experience) {
      console.error("No experience selected.");
    }
  }, [experience]);

  // Calculate total price using useMemo to prevent unnecessary recalculations
  const basePrice = useMemo(() => {
    if (!experience) return 0;

    return typeof experience.experience_price === 'string'
      ? parseFloat(experience.experience_price)
      : experience.experience_price;
  }, [experience]);

  // Calculate total price based on basePrice
  const totalPrice = useMemo(() => {
    const multiplierCrypto = (100 - discount) / 100; // Convert discount percentage to multiplier
    const calculated = basePrice * number_of_people * multiplierCrypto;
    console.log("Total discount:", discount);
    console.log("Total price updated:", calculated);
    return calculated;
  }, [basePrice, number_of_people, payment_type, discount]);

  if (!experience) {
    console.warn("No experience data available.");
    return <div>No experience data available.</div>;
  }

  console.log("Rendering BookingSummary with experience:", experience);

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      {/* Top image */}
      <div className="w-full h-48 relative">
        <Image
          src={experience.experience_promo_image || "/placeholder.png"} // Use a placeholder if no image is available
          alt={experience.name || "Experience Image"}
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
          <div className="flex items-center space-x-2">
            <span className="text-gray-600">{`${experience.experience_city}, ${experience.experience_country}` || "Unknown Location"}</span>
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
            <span className="text-gray-700">1 Adult</span>
            <span className="text-gray-700">
              US$ {basePrice.toFixed(2) || "0.00"}
            </span>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between text-lg font-bold text-brand-orange">
            <span>TOTAL CHARGE</span>
            <span>US$ {totalPrice.toFixed(3) || "0.00"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSummary;