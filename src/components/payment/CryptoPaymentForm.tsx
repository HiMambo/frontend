'use client';

export function CryptoPaymentForm() {
  return (
    <div className="space-y-3 mt-2">
      <select className="w-full border rounded-md p-2">
        <option>(BTC, ETH, SOL...)</option>
      </select>
      <p className="text-xs text-muted-foreground italic">
        *Cryptocurrency Refund Policy: Due to price volatility... Travel Credits.
      </p>
    </div>
  );
}
