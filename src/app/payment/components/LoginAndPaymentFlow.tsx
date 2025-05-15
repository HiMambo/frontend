'use client'

import { useEffect, useState } from 'react';
import { AccordionStep } from './AccordionStep';
import { AuthForm } from './AuthForm';
import { PaymentForm } from './PaymentForm';
import ReviewAndConfirm from './ReviewAndConfirm';

type Props = {
  setCurrentStep: (step: number) => void;
};

export default function LoginAndPaymentFlow({ setCurrentStep }: Props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'credit' | 'crypto'>('crypto');
  const [reviewOpen, setReviewOpen] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  // Update current step
  useEffect(() => {
    if (!isLoggedIn) {
      setCurrentStep(1);
    } else if (!reviewOpen) {
      setCurrentStep(2);
    } else if (!bookingConfirmed) {
      setCurrentStep(3);
    } else {
      setCurrentStep(4); // New step for confirmed booking
    }
  }, [isLoggedIn, reviewOpen, bookingConfirmed, setCurrentStep]);

  // Handle going back to payment
  const handleBackToPayment = () => {
    setReviewOpen(false);
  };

  // Handle payment form completion (proceed to review)
  const handlePaymentComplete = () => {
    setReviewOpen(true);
  };

  // Handle booking confirmation (after payment)
  const handleBookingConfirmed = () => {
    setBookingConfirmed(true);
  };

  return (
    <div className="mx-auto space-y-4">
      {/* Step 1: Auth */}
      <AccordionStep
        title={isLoggedIn ? 'Logged in' : 'Step 1: Login/Signup'}
        show={!isLoggedIn}
        completed={isLoggedIn}
      >
        <AuthForm onSuccess={() => setIsLoggedIn(true)} />
      </AccordionStep>

      {/* Step 2: Payment */}
      <AccordionStep
        title={reviewOpen ? 'Payment Method Added' : 'Step 2: Choose Payment method'}
        show={isLoggedIn && !reviewOpen}
        completed={reviewOpen}
      >
        <PaymentForm
          disabled={!isLoggedIn}
          method={paymentMethod}
          onMethodChange={setPaymentMethod}
          onComplete={handlePaymentComplete}
        />
      </AccordionStep>

      {/* Step 3: Review */}
      <AccordionStep
        title={bookingConfirmed ? "Booking confirmed!" : 'Step 3: Review & Confirm'}
        show={reviewOpen && !bookingConfirmed}
        completed={bookingConfirmed}
      >
        <ReviewAndConfirm
          paymentMethod={paymentMethod}
          onConfirm={handleBookingConfirmed}
          onBackToPayment={handleBackToPayment}
        />
      </AccordionStep>

      {/* Step 4: Confirmation */}
      {bookingConfirmed && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="text-lg font-medium text-green-800">Booking Confirmed!</h3>
          <p className="text-green-700">Thank you for your booking.</p>
        </div>
      )}
    </div>
  );
}
