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

  // Update current step
  useEffect(() => {
    if (!isLoggedIn) {
      setCurrentStep(1);
    } else if (!reviewOpen) {
      setCurrentStep(2);
    } else {
      setCurrentStep(3);
    }
  }, [isLoggedIn, reviewOpen, setCurrentStep]);

  // Handle going back to payment
  const handleBackToPayment = () => {
    setReviewOpen(false);
  };

  // Handle payment form completion (complete booking)
  const handlePaymentComplete = () => {
    setReviewOpen(true);
  };

  return (
    <div className="max-w-md mx-auto space-y-4">
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
        title={reviewOpen ? 'Payment Added' : 'Step 2: Choose Payment method'}
        show={isLoggedIn && !reviewOpen}
        completed={reviewOpen}
      >
        <PaymentForm
          disabled={!isLoggedIn}
          method={paymentMethod}
          onMethodChange={setPaymentMethod}
          onComplete={handlePaymentComplete} // Pass the completion handler here
        />
      </AccordionStep>

      {/* Step 3: Review */}
      <AccordionStep
        title="Step 3: Review & Confirm"
        show={reviewOpen}
        completed={false}
      >
        <ReviewAndConfirm
          paymentMethod={paymentMethod}
          onConfirm={() => alert('Booking Confirmed!')}
          onBackToPayment={handleBackToPayment} // Pass back to payment handler
        />
      </AccordionStep>
    </div>
  );
}
