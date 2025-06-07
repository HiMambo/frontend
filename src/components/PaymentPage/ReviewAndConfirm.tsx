'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import CryptoPayment from "./CryptoPayment";
import CenteredCard from "./CenteredCard"
import { useCart } from "@/context/Cart"; // Import the Cart context

type ReviewAndConfirmProps = {
  paymentMethod: 'credit' | 'crypto';
  onConfirm: () => void;
  onBackToPayment: () => void;
};

export default function ReviewAndConfirm({
  paymentMethod,
  onConfirm,
  onBackToPayment
}: ReviewAndConfirmProps) {
  const { discount, setDiscount } = useCart(); // Access discount and setDiscount from the Cart context
  const [promoCode, setPromoCode] = useState(""); // State for promo code
  const [error, setError] = useState<string | null>(null); // State for promo code errors
  const [showCryptoPayment, setShowCryptoPayment] = useState(false);

  const handleConfirm = () => {
    if (paymentMethod === 'crypto') {
      // Show crypto payment flow
      setDiscount(10)
      setShowCryptoPayment(true);
    } else {
      // For credit card payment, proceed with regular confirmation
      setDiscount(0)
      onConfirm();
    }
  };

  const handleCryptoPaymentComplete = () => {
    // Hide crypto payment modal and notify parent component
    setShowCryptoPayment(false);
    onConfirm();
  };

  const handleCryptoPaymentClose = () => {
    // Just hide the crypto payment modal if user exits
    setShowCryptoPayment(false);
  };

  const handleApplyPromoCode = () => {
    // Example promo code validation logic
    if (promoCode === "COLOSSEUM") {
      setDiscount(99.90); //
      setError(null);
    } else if (promoCode === "JAGER") {
      setDiscount(99.90); // Apply a $20 discount
      setError(null);
    } else {
      setError("Invalid promo code");
      setDiscount(0); // Reset discount if promo code is invalid
    }
  };

  // Show crypto payment component if active
  if (showCryptoPayment) {
    return (
      <CryptoPayment 
        onClose={handleCryptoPaymentClose}
        onPaymentComplete={handleCryptoPaymentComplete}
      />
    );
  }

  return (
    <CenteredCard>
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold">Review your details</h3>
          <p><strong>Payment Method:</strong> {paymentMethod === 'credit' ? 'Credit Card' : 'Cryptocurrency'}</p>
          {/* email, booking dates, totals, etc. */}
        </div>

        {/* Back to Payment Button */}
        <Button
          onClick={onBackToPayment}
          variant="outline"
          className="w-full mt-4"
        >
          Change Payment Method
        </Button>

        {/* Promo Code Section */}
        <div className="space-y-2">
          <label htmlFor="promoCode" className="block text-sm font-medium text-gray-700">
            Promo Code
          </label>
          <div className="flex space-x-2">
            <input
              id="promoCode"
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              placeholder="Enter promo code"
            />
            <Button onClick={handleApplyPromoCode} className="px-4">
              Apply
            </Button>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {discount > 0 && <p className="text-green-500 text-sm">Discount applied: {discount}%</p>}
        </div>

        {/* Confirm Booking Button */}
        <Button
          onClick={handleConfirm}
          className="w-full mt-4"
        >
          Confirm and Pay
        </Button>
      </div>
    </CenteredCard>
  );
}
