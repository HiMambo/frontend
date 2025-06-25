'use client';

import { useState, useEffect } from 'react';
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import BookingSummary from "@/components/PaymentPage/BookingSummary";
import LoginAndPaymentFlow from "@/components/PaymentPage/LoginAndPaymentFlow";
import ProgressBar from "@/components/PaymentPage/ProgressBar";
import { useCart } from "@/context/Cart";

export default function PaymentPage() {
  const [currentStep, setCurrentStep] = useState(1); // 1 = Login, 2 = Payment, 3 = Review
  const { cartExperience, priceBreakdown, isHydrated } = useCart(); // Access the context values

  useEffect(() => {
    console.log("PaymentPage mounted");
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    
    console.log("Context values updated - experience.Id:", cartExperience?.id, "price:", priceBreakdown?.finalPrice);
  }, [cartExperience?.id, priceBreakdown?.finalPrice, isHydrated]);

  return (
    <>
      <Header />
      <div className="justify-center w-full px-4">
        <ProgressBar currentStep={currentStep} />
      </div>
      <main className="grid md:grid-cols-5 gap-6 p-6">
        {/* Make LoginAndPaymentFlow */}
        <div className="md:col-span-3">
          <LoginAndPaymentFlow setCurrentStep={setCurrentStep} />
        </div>
        {/* BookingSummary */}
        <div className="md:col-span-2">
          <BookingSummary />
        </div>
      </main>
      <Footer />
    </>
  );
}