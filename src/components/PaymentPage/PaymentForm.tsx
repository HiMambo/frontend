"use client";

import { useState } from "react"
import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";
import { CreditCardForm } from "./CreditCardForm";
import CryptoPayment from "./CryptoPayment";
import { useBooking } from "@/context/BookingContext";
import { useSteps } from "@/context/StepContext";

export function PaymentForm() {
  const [showCryptoPayment, setShowCryptoPayment] = useState(false);
  const [paymentInProgress, setPaymentInProgress] = useState(false);
  const { basePriceDiscount, setBasePriceDiscount, payment_type, setPaymentType, CRYPTO_DISCOUNT } = useBooking();
  const { markStepComplete, goToNextStep, goToPreviousStep } = useSteps();
  const [promoCode, setPromoCode] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handlePaymentSubmit = () => {
    if (payment_type === "crypto") {
      setShowCryptoPayment(true);
      setPaymentInProgress(true);
    } else {
      // credit card payment logic placeholder
      handlePaymentComplete();
    }
  };

  const handlePaymentComplete = () => {
    // Mark step 3 as complete
    markStepComplete(3);
    setPaymentInProgress(false);
    setShowCryptoPayment(false);
    goToNextStep();
  };

  const handleCryptoPaymentClose = () => {
    setShowCryptoPayment(false);
    setPaymentInProgress(false);
  };

  // Show crypto payment component if active
  if (showCryptoPayment) {
    return (
      <CryptoPayment 
        onClose={handleCryptoPaymentClose}
        onComplete={handlePaymentComplete}
      />
    );
  }

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
    <div className="flex flex-col bg-surface gap-[var(--spacing-1000)] p-[var(--spacing-600)] items-center w-full">
      {/* Header */}
      <h2 className="heading-h5-light text-secondary text-center border-b-2 border-[var(--text-disabled)] py-[var(--spacing-600)] w-full">
        Payment
      </h2>

      {/* Payment content */}
      <div className="flex flex-col gap-[var(--spacing-800)] items-center w-full">
        {/* Payment method description */}
        <div className="text-center">
          <h3 className="body-l font-semibold text-secondary">Select your payment method</h3>
          <p className="body-m text-tertiary mt-[var(--spacing-200)]">Choose how you&apos;d like to pay for your booking</p>
        </div>

        {/* Payment Method Selection */}
        <div className="flex gap-[var(--spacing-800)] justify-center w-full body-l-button">
          {/* Credit Card Option */}
          <span
            className={`transition-colors ${
              payment_type === "credit"
                ? "underline text-[var(--terracotta-600)] decoration-2 underline-offset-10"
                : "text-primary hover:underline hover:decoration-2 hover:underline-offset-10 cursor-pointer"
            } ${paymentInProgress ? "opacity-50 cursor-not-allowed" : ""}`}
            onClick={() => !paymentInProgress && setPaymentType("credit")}
          >
            Credit card
          </span>

          {/* Crypto Option */}
          <span
            className={`relative transition-colors ${
              payment_type === "crypto"
                ? "underline text-[var(--terracotta-600)] decoration-2 underline-offset-10"
                : "text-primary hover:underline hover:decoration-2 hover:underline-offset-10 cursor-pointer"
            } ${paymentInProgress ? "opacity-50 cursor-not-allowed" : ""}`}
            onClick={() => !paymentInProgress && setPaymentType("crypto")}
          >
            Crypto
            <span className="absolute top-[-1em] right-[-4em] flex items-center justify-center px-[var(--spacing-200)] h-5 bg-[var(--teal-500)] body-xs text-inverted rounded-full">
              -{CRYPTO_DISCOUNT}%
            </span>
          </span>
        </div>

        {/* Credit Card Form */}
        {payment_type === "credit" && (
          <div className="w-full max-w-[var(--width-authforms)]">
            <CreditCardForm />
          </div>
        )}

        {/* Crypto Refund Policy */}
        {payment_type === "crypto" && (
          <p className="body-s text-tertiary italic text-center max-w-[var(--width-authforms)]">
            *Cryptocurrency Refund Policy: Due to price volatility and regulatory requirements, refunds (if applicable) will be processed in Travel Credits and credited to your hiMambo.com account.
          </p>
        )}

        {/* Promo Code Section */}
        <div className="flex flex-col gap-[var(--spacing-400)] w-full max-w-[var(--width-authforms)]">
          <label htmlFor="promoCode" className="body-m text-secondary">
            Promo Code (Optional)
          </label>
          <div className="flex gap-[var(--spacing-400)]">
            <Input
              id="promoCode"
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="flex-1 h-[var(--height-input)] body-m text-tertiary"
              placeholder="Enter promo code"
              disabled={paymentInProgress}
            />
            <Button 
              onClick={handleApplyPromoCode} 
              disabled={paymentInProgress}
            >
              Apply
            </Button>
          </div>
          {error && <p className="body-s text-red-500">{error}</p>}
          {basePriceDiscount > 0 && (
            <p className="body-s text-green-600 font-medium">
              Discount applied: {basePriceDiscount}%
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-[var(--spacing-600)] items-center w-full">
          {/* Payment Submit Button */}
          <Button
            className="w-[var(--width-authforms)]"
            onClick={handlePaymentSubmit}
            disabled={paymentInProgress}
          >
            {paymentInProgress 
              ? "Processing..." 
              : payment_type === "crypto" 
                ? "Pay with Crypto" 
                : "Pay with Credit Card"
            }
          </Button>

          {/* Back Button */}
          <Button
            onClick={goToPreviousStep}
            variant="outline"
            className="w-[var(--width-authforms)]"
            disabled={paymentInProgress}
          >
            Back to Slot Selection
          </Button>
        </div>
      </div>
    </div>
  );
}