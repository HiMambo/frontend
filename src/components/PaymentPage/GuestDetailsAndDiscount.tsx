'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from '../ui/input';
import CenteredCard from "./CenteredCard";
import { useCart } from "@/context/Cart";

type Guest = {
  firstName: string;
  lastName: string;
};

type GuestDetailsAndDiscountProps = {
  guests: number;
  setGuests: (guests: number) => void;
  guestDetails: Guest[];
  setGuestDetails: (guests: Guest[]) => void;
  onComplete: () => void;
};

export default function GuestDetailsAndDiscount({
  guests,
  setGuests,
  guestDetails,
  setGuestDetails,
  onComplete
}: GuestDetailsAndDiscountProps) {
  const { basePriceDiscount, setBasePriceDiscount } = useCart();
  const [promoCode, setPromoCode] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleGuestChange = (increment: boolean) => {
    if (increment) {
      setGuests(guests + 1);
    } else if (guests > 1) {
      setGuests(guests - 1);
    }
  };

  const handleGuestDetailChange = (index: number, field: 'firstName' | 'lastName', value: string) => {
    const updatedGuests = [...guestDetails];
    updatedGuests[index] = {
      ...updatedGuests[index],
      [field]: value
    };
    setGuestDetails(updatedGuests);
  };

  const validateGuestDetails = () => {
    return guestDetails.every(guest => 
      guest.firstName.trim() !== '' && guest.lastName.trim() !== ''
    );
  };

  const handleComplete = () => {
    if (!validateGuestDetails()) {
      setError("Please fill in all guest names");
      return;
    }
    setError(null);
    console.log("Guest details:", guestDetails);
    onComplete();
  };

  const handleApplyPromoCode = () => {
    console.log("Current discount in context:", basePriceDiscount);
    if (promoCode === "COLOSSEUM") {
      const discountValue = 20;
      setBasePriceDiscount(discountValue);
      setError(null);
      console.log("Promo code applied: ", discountValue, "% discount for ", promoCode);
    } else if (promoCode === "JAGER") {
      const discountValue = 99.90;
      setBasePriceDiscount(discountValue);
      setError(null);
      console.log("Promo code applied: ", discountValue, "% discount for ", promoCode);
    } else if (promoCode.trim() === "") {
      setError("Please enter a promo code");
    } else {
      setError("Invalid promo code");
      setBasePriceDiscount(0);
    }
  };

  return (
    <CenteredCard>
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
          {guestDetails.map((guest, index) => (
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
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
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
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    placeholder="Last name"
                    required
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Promo Code Section */}
        <div className="space-y-3">
          <label htmlFor="promoCode" className="block text-sm font-medium text-gray-700">
            Promo Code (Optional)
          </label>
          <div className="flex space-x-2">
            <Input
              id="promoCode"
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm"
              placeholder="Enter promo code"
            />
            <Button onClick={handleApplyPromoCode} className="px-4">
              Apply
            </Button>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {basePriceDiscount > 0 && (
            <p className="text-green-600 text-sm font-medium">
              ✓ Discount applied: {basePriceDiscount}%
            </p>
          )}
        </div>

        {/* Continue Button */}
        <Button
          onClick={handleComplete}
          className="w-full"
        >
          Continue to Payment
        </Button>
      </div>
    </CenteredCard>
  );
}