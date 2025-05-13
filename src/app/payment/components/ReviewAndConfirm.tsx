'use client';

import { Button } from "@/components/ui/button"; 

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
        onClick={onConfirm}
        className="w-full mt-4"
      >
        Confirm and Pay
      </Button>
    </div>
  );
}
