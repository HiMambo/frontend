'use client';

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCardForm } from "./CreditCardForm";

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
      <Card className="w-full max-w-md">
        <CardContent className={`p-6 space-y-4 ${disabled ? 'pointer-events-none blur-sm' : ''}`}>
          <div className="text-muted-foreground">
            {disabled ? 'Step 2: Payment (after login)' : 'Logged in'}
          </div>

          <h3 className="text-lg font-semibold">Select your payment method</h3>

          {/* Inline PaymentMethodSelector */}
          <div className="flex gap-4">
            <Button
              variant={method === 'credit' ? 'default' : 'outline'}
              onClick={() => onMethodChange('credit')}
            >
              Credit card
            </Button>
            <Button
              variant={method === 'crypto' ? 'default' : 'outline'}
              onClick={() => onMethodChange('crypto')}
              className="relative"
            >
              Crypto
              <span className="absolute top-[-0.5rem] right-[-0.5rem] bg-pink-500 text-white text-xs px-1 rounded-full">-10%</span>
            </Button>
          </div>

          {/* Only show CreditCardForm when credit card method is selected */}
          {method === 'credit' && <CreditCardForm />}

          <Button
            className="w-full"
            disabled={disabled}
            onClick={onComplete}
          >
            Review booking
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}