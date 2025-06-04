"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useCart } from "@/context/Cart";

// Define the type for the experience object
interface Experience {
  id: number;
  name: string;
  experience_description: string;
  experience_price: number;
  experience_promo_image: string;
  experience_city: string;
  experience_country: string;
  travelDate?: string;
  departure?: string;
  travellers?: number;
  duration?: string;
  refundable?: string;
}

const BookingSummary: React.FC = () => {
  const { experience, number_of_people, payment_type } = useCart(); // Get the experience from the Cart context
  const [multiplierCrypto, setMultiplierCrypto] = useState(1.0); // Multiplier for crypto discount
  const [totalPrice, setTotalPrice] = useState(0.0); // Total price

  // Component mount and data check
  useEffect(() => {
    console.log("BookingSummary mounted");
    console.log("Selected experience from context:", experience);
    
    if (!experience) {
      console.error("No experience selected.");
    }
  }, [experience]);

  // Update multiplier and total price when payment type or experience changes
  useEffect(() => {
    if (payment_type === "crypto") {
      setMultiplierCrypto(0.9); // Apply a 10% discount for crypto
      console.log("Discount for crypto applied");
    } else {
      setMultiplierCrypto(1.0); // No discount for fiat
      console.log("No discount with fiat");
    }
  }, [payment_type]);

  useEffect(() => {
    if (experience) {
      const calculatedPrice =
        experience.experience_price * number_of_people * multiplierCrypto;
      setTotalPrice(calculatedPrice);
      console.log("Total price updated:", calculatedPrice);
    }
  }, [experience, number_of_people, multiplierCrypto]);

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
              US$ {experience.experience_price?.toFixed(2) || "0.00"}
            </span>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between text-lg font-bold text-brand-orange">
            <span>TOTAL CHARGE</span>
            <span>US$ {totalPrice.toFixed(2) || "0.00"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSummary;