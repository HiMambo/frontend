"use client";

import { useState } from "react";
import { CreditCardIcon } from "@/components/shared/IconComponents";
import { CryptoIcon } from "@/components/shared/IconComponents";
import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";
import { CreditCardForm } from "./CreditCardForm";
import CryptoPayment from "./CryptoPayment";
import { useBooking } from "@/context/BookingContext";
import { useBookingSteps } from "@/context/BookingStepsContext";

export function PaymentForm() {
  const [showCryptoPayment, setShowCryptoPayment] = useState(false);
  const [paymentInProgress, setPaymentInProgress] = useState(false);
  const { basePriceDiscount, setBasePriceDiscount, payment_type, setPaymentType, CRYPTO_DISCOUNT } = useBooking();
  const { markStepComplete, goToNextStep, goToPreviousStep } = useBookingSteps();
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
    <div>
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold">Select your payment method</h3>
          <p className="text-sm text-muted-foreground">Choose how you&apos;d like to pay for your booking</p>
        </div>

        {/* Payment Method Selection */}
        <div className="flex gap-4">
          <Button
            className="h-15 max-w-48 text-base flex-1"
            variant={payment_type === "credit" ? "default" : "outline"}
            onClick={() => setPaymentType("credit")}
            disabled={paymentInProgress}
          >
            <CreditCardIcon className="mr-3 size-10" />
            Credit card
          </Button>
          <Button
            className="h-15 max-w-48 text-base relative flex-1"
            variant={payment_type === "crypto" ? "default" : "outline"}
            onClick={() => setPaymentType("crypto")}
            disabled={paymentInProgress}
          >
            <div className="flex items-center gap-2">
              <CryptoIcon className="size-12 mr-3" />
              <span>Crypto</span>
            </div>
            <span className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 bg-pink-500 text-white text-xs font-semibold h-6 px-1 rounded-full flex items-center justify-center">
              -{CRYPTO_DISCOUNT}%
            </span>
          </Button>
        </div>

        {/* Credit Card Form */}
        {payment_type === "credit" && <CreditCardForm />}

        {/* Crypto Refund Policy */}
        {payment_type === "crypto" && (
          <p className="text-sm text-muted-foreground max-w-prose">
            <em>
              *Cryptocurrency Refund Policy: Due to price volatility and regulatory requirements, refunds (if applicable) will be processed in Travel Credits and credited to your hiMambo.com account.
            </em>
          </p>
        )}

        {/* Promo Code Section */}
        <div className="space-y-3">
          <label htmlFor="promoCode" className="block text-sm font-medium text-gray-700">
            Promo Code (Optional)
          </label>
          <div className="flex space-x-2">
            <Input
              id="promoCode"
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm"
              placeholder="Enter promo code"
              disabled={paymentInProgress}
            />
            <Button 
              onClick={handleApplyPromoCode} 
              className="px-4"
              disabled={paymentInProgress}
            >
              Apply
            </Button>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {basePriceDiscount > 0 && (
            <p className="text-green-600 text-sm font-medium">
              Discount applied: {basePriceDiscount}%
            </p>
          )}
        </div>

        {/* Back Button */}
        <Button
          onClick={goToPreviousStep}
          variant="outline"
          className="w-full"
          disabled={paymentInProgress}
        >
          Back to Slot Selection
        </Button>

        {/* Payment Submit Button */}
        <Button
          className="w-full"
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
      </div>
    </div>
  );
}