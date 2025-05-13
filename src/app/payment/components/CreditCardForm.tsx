'use client';

import { Input } from "@/components/ui/input";

export function CreditCardForm() {
  return (
    <div className="space-y-3 mt-2">
      <Input placeholder="Card number" />
      <div className="flex gap-2">
        <Input placeholder="Expiry (MM/YY)" />
        <Input placeholder="CVC" />
      </div>
    </div>
  );
}
