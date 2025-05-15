'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import CryptoPayment from "./CryptoPayment";

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
  const [showCryptoPayment, setShowCryptoPayment] = useState(false);

  const handleConfirm = () => {
    if (paymentMethod === 'crypto') {
      // Show crypto payment flow
      setShowCryptoPayment(true);
    } else {
      // For credit card payment, proceed with regular confirmation
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

      {/* Confirm Booking Button */}
      <Button
        onClick={handleConfirm}
        className="w-full mt-4"
      >
        Confirm and Pay
      </Button>
    </div>
  );
}
