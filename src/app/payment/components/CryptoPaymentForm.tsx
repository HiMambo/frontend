'use client';

export function CryptoPaymentForm() {
  return (
    <div className="space-y-3 mt-2">
      {/* Crypto Currency Selector */}
      <select className="w-full border rounded-md p-2">
        <option>(Select Cryptocurrency)</option>
        <option value="BTC">Bitcoin (BTC)</option>
        <option value="ETH">Ethereum (ETH)</option>
        <option value="SOL">Solana (SOL)</option>
      </select>

      {/* Network Selector */}
      <select className="w-full border rounded-md p-2 mt-3">
        <option>(Select Network)</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="1">3</option>
        {/* Add more options for other networks as needed */}
      </select>

      {/* Refund Policy */}
      <p className="text-xs text-muted-foreground italic mt-2">
        *Cryptocurrency Refund Policy: Due to price volatility... Travel Credits.
      </p>
    </div>
  );
}
