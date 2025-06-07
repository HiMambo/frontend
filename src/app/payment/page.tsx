'use client';

import { useState, useEffect } from 'react';
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import BookingSummary from "@/components/PaymentPage/BookingSummary";
import LoginAndPaymentFlow from "@/components/PaymentPage/LoginAndPaymentFlow";
import ProgressBar from "@/components/PaymentPage/ProgressBar";
import { useCart } from "@/context/Cart"; // Import the Cart context

export default function PaymentPage() {
  const [currentStep, setCurrentStep] = useState(1); // 1 = Login, 2 = Payment, 3 = Review
  const { experienceId, price } = useCart(); // Access the context values

  // Log only once on mount, then only when values actually change
  useEffect(() => {
    console.log("PaymentPage mounted");
  }, []); // Only log mount once

  useEffect(() => {
    console.log("Context values updated - experienceId:", experienceId, "price:", price);
  }, [experienceId, price]); // Only log when these actually change

  return (
    <>
      <Header />
      <div className="justify-center w-full px-4">
        <ProgressBar currentStep={currentStep} />
      </div>
      <main className="grid md:grid-cols-5 gap-6 p-6">
        {/* Make LoginAndPaymentFlow span 2 columns */}
        <div className="md:col-span-3">
          <LoginAndPaymentFlow setCurrentStep={setCurrentStep} />
        </div>
        {/* BookingSummary stays in 1 column */}
        <div className="md:col-span-2">
          <BookingSummary />
        </div>
      </main>
      <Footer />
    </>
  );
}