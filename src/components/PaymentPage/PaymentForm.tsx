"use client";

import { useState } from "react";
import { CreditCardIcon } from "@/components/shared/IconComponents";
import { CryptoIcon } from "@/components/shared/IconComponents";
import { Button } from "@/components/ui/button";
import { CreditCardForm } from "./CreditCardForm";
import CryptoPayment from "./CryptoPayment";
import CenteredCard from "./CenteredCard";
import { useCart } from "@/context/Cart";

export function PaymentForm({
  disabled,
  method,
  onMethodChange,
  onComplete,
  onBackToGuestDetails,
}: {
  disabled: boolean;
  method: "credit" | "crypto";
  onMethodChange: (m: "credit" | "crypto") => void;
  onComplete: () => void;
  onBackToGuestDetails: () => void;
}) {
  const { setPaymentType, CRYPTO_DISCOUNT } = useCart();
  const [showCryptoPayment, setShowCryptoPayment] = useState(false);

  const handleMethodChange = (m: "credit" | "crypto") => {
    onMethodChange(m);
    setPaymentType(m);
  };

  const handlePaymentSubmit = () => {
    if (method === "crypto") {
      // Directly show crypto payment modal
      setShowCryptoPayment(true);
    } else {
      // For credit card, complete immediately
      onComplete();
    }
  };

  const handleCryptoPaymentComplete = () => {
    setShowCryptoPayment(false);
    onComplete();
  };

  const handleCryptoPaymentClose = () => {
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
    <div style={{ opacity: disabled ? 0.5 : 1 }}>
      <CenteredCard>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold">Select your payment method</h3>
            <p className="text-sm text-muted-foreground">Choose how you&apos;d like to pay for your booking</p>
          </div>

          {/* Back to Guest Details Button */}
          <Button
            onClick={onBackToGuestDetails}
            variant="outline"
            className="w-full"
            disabled={disabled}
          >
            ← Back to Guest Details
          </Button>

          {/* Payment Method Selection */}
          <div className="flex gap-4">
            <Button
              className="h-15 max-w-48 text-base flex-1"
              variant={method === "credit" ? "default" : "outline"}
              onClick={() => handleMethodChange("credit")}
              disabled={disabled}
            >
              <CreditCardIcon className="mr-3 size-10" />
              Credit card
            </Button>
            <Button
              className="h-15 max-w-48 text-base relative flex-1"
              variant={method === "crypto" ? "default" : "outline"}
              onClick={() => handleMethodChange("crypto")}
              disabled={disabled}
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
          {method === "credit" && <CreditCardForm />}

          {/* Crypto Refund Policy */}
          {method === "crypto" && (
            <p className="text-sm text-muted-foreground max-w-prose">
              <em>
                *Cryptocurrency Refund Policy: Due to price volatility and regulatory requirements, refunds (if applicable) will be processed in Travel Credits and credited to your hiMambo.com account.
              </em>
            </p>
          )}

          {/* Payment Submit Button */}
          <Button
            className="w-full"
            disabled={disabled}
            onClick={handlePaymentSubmit}
          >
            {method === "crypto" ? "Pay with Crypto" : "Pay with Credit Card"}
          </Button>
        </div>
      </CenteredCard>
    </div>
  );
}