'use client';

import { CreditCardIcon } from '@/components/shared/IconComponents';
import { CryptoIcon } from '@/components/shared/IconComponents';;

import { Button } from "@/components/ui/button";
import { CreditCardForm } from "./CreditCardForm";
import CenteredCard from "./CenteredCard"
export function PaymentForm({
  disabled,
  method,
  onMethodChange,
  onComplete, 
}: {
  disabled: boolean;
  method: 'credit' | 'crypto';
  onMethodChange: (m: 'credit' | 'crypto') => void;
  onComplete: () => void; 
}) {

  return (
    <div style={{ opacity: disabled ? 0.5 : 1 }}>
      <CenteredCard>
        <div className="text-muted-foreground">
              {disabled ? 'Step 2: Payment (after login)' : 'Logged in'}
            </div>

            <h3 className="text-lg font-semibold">Select your payment method</h3>

            {/* Inline PaymentMethodSelector */}
            <div className="flex gap-4">
              <Button
                className="h-12 px-6 text-base relative"
                variant={method === 'credit' ? 'default' : 'outline'}
                onClick={() => onMethodChange('credit')}
              >
                <CreditCardIcon className="mr-2 size-8" />
                Credit card
              </Button>
              <Button
                className="h-12 px-6 text-base relative"
                variant={method === 'crypto' ? 'default' : 'outline'}
                onClick={() => onMethodChange('crypto')}
              >
                <div className="flex items-center gap-2">
                  <CryptoIcon className="size-9 mr-2" />
                  <span>Crypto</span>
                </div>
                <span className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 bg-pink-500 text-white text-xs font-semibold h-6 px-1 rounded-full flex items-center justify-center">
                  -10%
                </span>
              </Button>
            </div>

            {/* Only show CreditCardForm when credit card method is selected */}
            {method === 'credit' && <CreditCardForm />}

            {/* Show Crypto Refund Policy only when crypto is selected */}
            {method === 'crypto' && (
              <p className="mt-2 text-sm text-muted-foreground max-w-prose">
                <em>
                  *Cryptocurrency Refund Policy: Due to price volatility and regulatory requirements, refunds (if applicable) will be processed in Travel Credits and credited to your hiMambo.com account.
                </em>
              </p>
            )}

            <Button
              className="w-full"
              disabled={disabled}
              onClick={onComplete}
            >
              Proceed to pay
            </Button>
      </CenteredCard>
    </div>
  );
}