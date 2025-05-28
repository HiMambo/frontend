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

  // Log the context values for debugging
  useEffect(() => {
    console.log("PaymentPage mounted");
    console.log("Context values - experienceId:", experienceId, "price:", price);
  }, [experienceId, price]); // Log whenever experienceId or price changes

  return (
    <>
      <Header />
      <div className="justify-center w-full px-4">
        <ProgressBar currentStep={currentStep} />
      </div>
      <main className="grid md:grid-cols-3 gap-6 p-6">
        {/* Make LoginAndPaymentFlow span 2 columns */}
        <div className="md:col-span-2">
          <LoginAndPaymentFlow setCurrentStep={setCurrentStep} />
        </div>
        {/* BookingSummary stays in 1 column */}
        <div className="md:col-span-1">
          <BookingSummary />
        </div>
      </main>
      <Footer />
    </>
  );
}