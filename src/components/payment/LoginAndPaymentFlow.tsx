'use client';

import { useState } from 'react';
import { AccordionStep } from './AccordionStep';
import { AuthForm } from './AuthForm';
import { PaymentForm } from './PaymentForm';

export default function LoginAndPaymentFlow() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'credit' | 'crypto'>('crypto');

  return (
    <div className="max-w-md mx-auto space-y-4">
      <AccordionStep
        title={isLoggedIn ? 'Logged in' : 'Step 1: Login/Signup'}
        show={!isLoggedIn}
        completed={isLoggedIn}
      >
        <AuthForm onSuccess={() => setIsLoggedIn(true)} />
      </AccordionStep>

      <AccordionStep
        title="Step 2: Choose Payment method"
        show={isLoggedIn}
        completed={false}
      >
        <PaymentForm
          disabled={!isLoggedIn}
          method={paymentMethod}
          onMethodChange={setPaymentMethod}
        />
      </AccordionStep>
    </div>
  );
}
