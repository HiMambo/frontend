"use client";

import Image from "next/image";
import React, { useEffect } from "react";
import { useBooking } from "@/context/BookingContext";
import { SkeletonCard } from "../shared/SkeletonCard";
import ErrorMessage from "../shared/ErrorMessage";
import LocationDisplay from "../ExperienceCard/LocationDisplay";
import { format } from "date-fns";
import { StarRating } from "../ExperienceCard/StarRating";
import { BadgeCheck, CalendarCheck, Clock, Minus, Plus, Timer, Users } from "lucide-react";

const BookingSummary: React.FC = () => {
  const { bookingState, setGuests, cartExperience, priceBreakdown, isHydrated } = useBooking();

  // Component mount and data check
  useEffect(() => {
    console.log("BookingSummary mounted");
  }, []);

  // Experience-dependent effect
  useEffect(() => {
    if (!isHydrated) return;
    if (!cartExperience?.id) {
      console.error("No experience selected.");
    } else {
      console.log("Selected experience:", cartExperience.id);
    }
  }, [cartExperience?.id, isHydrated]);

  if (!isHydrated) {
    console.log("Attempting to load experience from local storage");
    return (
      <SkeletonCard view={"bookingSummary"} />
    );
  }

  if (!cartExperience || !priceBreakdown) {
    return <ErrorMessage message="No experience in cart!" />;
  }

  const travelDate = bookingState.selectedSlot?.start_datetime
    ? format(new Date(bookingState.selectedSlot.start_datetime), "MMMM do yyyy")
    : "Select a time slot";

  const departure = bookingState.selectedSlot?.start_datetime
    ? format(new Date(bookingState.selectedSlot.start_datetime), "HH:mm a")
    : "Select a time slot";

  const duration =
    bookingState.selectedSlot?.start_datetime && bookingState.selectedSlot?.end_datetime
      ? `${Math.round(
          (new Date(bookingState.selectedSlot.end_datetime).getTime() -
            new Date(bookingState.selectedSlot.start_datetime).getTime()) /
            (1000 * 60 * 60)
        )} hours`
      : "Select a time slot";

  const guests = bookingState.guests;
  const canDecrement = guests > 1;
  const canIncrement = guests < 12;

  const handleGuestChange = (increment: boolean) => {
    if (increment && canIncrement) {
      setGuests(guests + 1);
    } else if (!increment && canDecrement) {
      setGuests(guests - 1);
    }
  };

  return (
    <div className="w-[var(--bookingsummary-width)] rounded-600 bg-white flex flex-col gap-[var(--spacing-1200)] overflow-hidden">
      {/* 1. Image Section */}
      <div className="w-full h-[var(--bookingsummary-image-height)] relative">
        <Image
          src={cartExperience.experience_promo_image}
          alt={cartExperience.name}
          layout="fill"
          objectFit="cover"
        />
      </div>

      {/* 2. Main Content Section */}
      <div className="flex flex-col px-[var(--spacing-800)] gap-[var(--spacing-400)]">
        {/* Title */}
        <div className="flex items-center gap-[var(--spacing-400)]">
          <LocationDisplay
            city={cartExperience.experience_city}
            country={cartExperience.experience_country}
            badgeOnly
          />
          <h2 className="body-xxl-label text-secondary">{cartExperience.name}</h2>
        </div>

        {/* Reviews */}
        <div>
          <StarRating 
            rating={cartExperience.rating_avg} 
            size={6} ratingClassName="body-l-button" 
            ratingnumberClassName="body-l-light"
          />
        </div>

        {/* Main Info */}
        <div className="flex flex-col gap-[var(--spacing-400)] body-xl text-primary">
          <LocationDisplay
            city={cartExperience.experience_city}
            country={cartExperience.experience_country}
            className="body-l"
          />
          <div className="flex justify-between items-center border-b-2 border-[var(--text-disabled)] pb-[var(--spacing-200)]">
            <div className="flex items-center gap-[var(--spacing-250)]">
              <Users className="icon-s text-disabled" />
              <span>Travellers</span>
            </div>
            <div className="flex items-center justify-center h-[var(--spacing-1200)] px-[var(--spacing-300)] gap-[var(--spacing-300)]">
              <Minus
                className={`icon-s ${canDecrement ? "text-yellow-500 cursor-pointer" : "text-disabled cursor-not-allowed"}`}
                onClick={() => canDecrement && handleGuestChange(false)}
              />
              <span className="tabular-nums min-w-[2ch] text-center">
                {guests}
              </span>
              <Plus
                className={`icon-s ${canIncrement ? "text-yellow-500 cursor-pointer" : "text-disabled cursor-not-allowed"}`}
                onClick={() => canIncrement && handleGuestChange(true)}
              />
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex items-center gap-[var(--spacing-250)]">
              <CalendarCheck className="icon-s text-disabled" />
              <span>Travel Date</span>
            </div>
            <span>{travelDate}</span>
          </div>
          <div className="flex justify-between">
            <div className="flex items-center gap-[var(--spacing-250)]">
              <Clock className="icon-s text-disabled" />
              <span>Departure</span>
            </div>
            <span>{departure}</span>
          </div>
          <div className="flex justify-between">
            <div className="flex items-center gap-[var(--spacing-250)]">
              <Timer className="icon-s text-disabled" />
              <span>Duration</span>
            </div>
            <span>{duration}</span>
          </div>
          <div className="flex justify-between">
            <div className="flex items-center gap-[var(--spacing-250)]">
              <BadgeCheck className="icon-s text-disabled" />
              <span>Refundable</span>
            </div>
            <span>{cartExperience.refundable || "N/A"}</span>
          </div>
        </div>
      </div>

      {/* 3. Price Breakdown Section */}
      <div className="flex justify-between items-center border-t-2 border-[var(--text-disabled)] px-[var(--spacing-800)] py-[var(--spacing-600)]">
        <span className="body-s text-primary">TOTAL</span>
        <span className="body-xxl text-primary">
          € {priceBreakdown.finalPrice.toFixed(2)}
        </span>
      </div>
    </div>
  );
};

export default BookingSummary;
