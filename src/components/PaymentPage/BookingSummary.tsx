"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import { useBooking } from "@/context/BookingContext";
import { SDGIcons } from "../ExperienceCard/SDGIcons";
import { SkeletonCard } from "../shared/SkeletonCard";
import ErrorMessage from "../shared/ErrorMessage";
import LocationDisplay from "../ExperienceCard/LocationDisplay";
import { format } from "date-fns";

const BookingSummary: React.FC = () => {
  const { bookingState, cartExperience, priceBreakdown, isHydrated } = useBooking();

  // Component mount and data check
  useEffect(() => {
    console.log("BookingSummary mounted");
  }, []);

  // Experience-dependent effect
  useEffect(() => {
    if (!isHydrated) return; // Don't log too early
    
    if (!cartExperience?.id) {
      console.error("No experience selected.");
    }
    else {
      console.log("Selected experience from context:", cartExperience.id);
    }
  }, [cartExperience?.id, isHydrated]);

  if (!isHydrated) {
    console.log("Attempting to load experience from local storage");
    return (
      <SkeletonCard view={"bookingSummary"} />
    );
  }
  
  if (!cartExperience || !priceBreakdown) {
    console.log("No experience data available.");
    return <ErrorMessage message="No experience in cart!" />;
  }

  console.log("Rendering BookingSummary with experience:", cartExperience);

  const travelDate = bookingState.selectedSlot?.start_datetime
    ? format(new Date(bookingState.selectedSlot.start_datetime), "MMMM do yyyy")
    : "Select a time slot";

  const departure = bookingState.selectedSlot?.start_datetime
    ? format(new Date(bookingState.selectedSlot.start_datetime), "HH:mm a")
    : "Select a time slot";

  const duration = bookingState.selectedSlot?.start_datetime && bookingState.selectedSlot?.end_datetime
    ? `${Math.round(
        (new Date(bookingState.selectedSlot.end_datetime).getTime() - new Date(bookingState.selectedSlot.start_datetime).getTime()) / (1000 * 60 * 60)
      )} hours`
    : "Select a time slot";

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      {/* Top image */}
      <div className="w-full h-48 relative">
        <Image
          src={cartExperience.experience_promo_image}
          alt={cartExperience.name}
          layout="fill"
          objectFit="cover"
        />
      </div>

      <div className="p-6">
        {/* Title */}
        <h2 className="text-xl font-bold text-brand-blue mb-2">
          {cartExperience.name}
        </h2>

      {/* Location + SDG badges */}
      <div className="flex justify-between items-center text-sm mb-4">
        {/* Left side: location */}
        <LocationDisplay city={cartExperience.experience_city} country={cartExperience.experience_country} />
        {/* Right side: SDG icons */}
        <div>
          <SDGIcons iconSize={33} goals={cartExperience.sustainability_goal} maxDisplay={1} />
        </div>
      </div>

        {/* Information Table */}
        <div className="text-sm text-gray-700 space-y-1 mb-6">
          <div className="flex justify-between">
            <span className="font-medium">Travel date</span>
            <span>{travelDate}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Departure</span>
            <span>{departure}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Travellers</span>
            <span>{bookingState.guests}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Duration</span>
            <span>{duration}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Refundability</span>
            <span>{cartExperience.refundable || "N/A"}</span>
          </div>
        </div>

        {/* Payment Section */}
        <div className="bg-gray-50 p-4 rounded-lg">
          {/* Base Price Section (only if more than one traveller) */}
          {bookingState.guests > 1 && (
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-700">Price per person</span>
              <span className="text-gray-700">
                {priceBreakdown.basePriceDiscount > 0 ? (
                  <div className="flex flex-col items-end">
                    <span className="line-through text-gray-400 text-xs">
                      US$ {priceBreakdown.basePrice.toFixed(2)}
                    </span>
                    <span>US$ {priceBreakdown.discountedBasePrice.toFixed(2)}</span>
                  </div>
                ) : (
                  <>US$ {priceBreakdown.basePrice.toFixed(2)}</>
                )}
              </span>
            </div>
          )}

          {/* Total Before Discount */}
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>Total before discount</span>
            <span>
              {priceBreakdown.basePriceDiscount > 0 ? (
                <div className="flex flex-col items-end">
                  <span className="line-through text-gray-400 text-xs">
                    US$ {(priceBreakdown.basePrice * bookingState.guests).toFixed(2)}
                  </span>
                  <span>US$ {priceBreakdown.totalBeforeCryptoDiscount.toFixed(2)}</span>
                </div>
              ) : (
                <>US$ {priceBreakdown.totalBeforeCryptoDiscount.toFixed(2)}</>
              )}
            </span>
          </div>

          <hr className="my-2" />

          {/* Final Price */}
          <div className="flex justify-between text-lg font-bold text-brand-orange relative">
            <span>TOTAL CHARGE</span>
            <span>US$ {priceBreakdown.finalPrice.toFixed(2)}</span>
            {priceBreakdown.cryptoDiscount > 0 && (
              <span className="absolute -top-2 -right-10 bg-pink-500 text-white text-xs font-semibold h-6 px-1 rounded-full flex items-center justify-center">
                -{priceBreakdown.cryptoDiscount}%
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSummary;