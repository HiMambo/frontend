'use client';

import { Button } from "@/components/ui/button";
import { Input } from '../ui/input';
import { useEffect } from "react";
import { type Guest, useBooking, } from "@/context/BookingContext";
import { useSteps } from "@/context/BookingStepsContext";

export function GuestForm() {
  const { bookingState, setGuests, updateGuestDetails } = useBooking();
  const { setIsValid, setValidationError } = useSteps();

  const guests = bookingState.guests;
  const guestDetails = bookingState.guestDetails;

  const handleGuestChange = (increment: boolean) => {
    if (increment) {
      setGuests(guests + 1);
    } else if (guests > 1) {
      setGuests(guests - 1);
    }
  };

  const handleGuestDetailChange = (index: number, field: 'firstName' | 'lastName', value: string) => {
    const updatedGuests: Guest[] = [...guestDetails];
    updatedGuests[index] = {
      ...updatedGuests[index],
      [field]: value
    };
    updateGuestDetails(updatedGuests);
  };

  // Step validation
  useEffect(() => {
    const incomplete = guestDetails.some(guest => !guest.firstName.trim() || !guest.lastName.trim());
    if (incomplete) {
      setIsValid(false);
      setValidationError("Please fill out all guest details to proceed");
    } else {
      setIsValid(true);
      setValidationError(null);
      console.log("Guest details:", guestDetails);
    }
  }, [guestDetails, setIsValid, setValidationError]);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">Confirm booking details</h3>
        <p className="text-sm text-muted-foreground">Review guest count and apply discount codes</p>
      </div>

      {/* Guest Count Section */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">
          Number of Guests
        </label>
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleGuestChange(false)}
            disabled={guests <= 1}
            className="w-10 h-10 p-0"
          >
            -
          </Button>
          <span className="text-lg font-semibold min-w-[2rem] text-center">
            {guests}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleGuestChange(true)}
            className="w-10 h-10 p-0"
          >
            +
          </Button>
        </div>
      </div>

      {/* Guest Information Forms */}
      <div className="space-y-4">
        <h4 className="text-md font-medium text-gray-700">Guest Information</h4>
        {guestDetails.map((guest: Guest, index: number) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-3">
            <h5 className="text-sm font-medium text-gray-600">Guest {index + 1}</h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor={`firstName-${index}`}
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  First Name
                </label>
                <Input
                  id={`firstName-${index}`}
                  type="text"
                  value={guest.firstName}
                  onChange={(e) => handleGuestDetailChange(index, 'firstName', e.target.value)}
                  placeholder="First name"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor={`lastName-${index}`}
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Last Name
                </label>
                <Input
                  id={`lastName-${index}`}
                  type="text"
                  value={guest.lastName}
                  onChange={(e) => handleGuestDetailChange(index, 'lastName', e.target.value)}
                  placeholder="Last name"
                  required
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
