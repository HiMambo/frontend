'use client';

import { useState } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BookingSummary from "@/components/BookingSummary";
import LoginAndPaymentFlow from "./components/LoginAndPaymentFlow";
import ProgressBar from "./components/ProgressBar";

export default function PaymentPage() {
  const [currentStep, setCurrentStep] = useState(1); // 1 = Login, 2 = Payment, 3 = Review

  return (
    <>
      <Header />
      <div className="justify-center w-full px-4">
        <ProgressBar currentStep={currentStep} />
      </div>
      <main className="grid md:grid-cols-2 gap-6 p-6">
        <LoginAndPaymentFlow setCurrentStep={setCurrentStep} />
        <BookingSummary />
      </main>
      <Footer />
    </>
  );
}

