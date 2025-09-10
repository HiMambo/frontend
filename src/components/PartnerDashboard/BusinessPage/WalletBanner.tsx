"use client";

import Image from "next/image";

export default function WalletBanner() {
  return (
    <div className="flex items-center justify-between bg-[#f9f6f1] rounded-2xl p-6 mb-8">
      <div>
        <p className="text-lg font-semibold text-[#4A2C2A] mb-4">
          Only 2 steps left before you can list your experiences and start reaching new customers.
        </p>
        <div className="flex items-center gap-4">
          <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-white font-semibold rounded-xl transition">
          <Image src="/assets/wallet.svg" alt="Camera" width={20} height={20} />

            Wallet Setup
          </button>
          <button className="text-neutral-400 font-medium">Not now</button>
        </div>
      </div>

      <div className="relative flex items-center justify-center">
        <div className="w-20 h-20 rounded-full flex items-center justify-center text-teal-600 font-bold text-xl bg-teal-100 border-4 border-neutral-200">
          EM
        </div>
        <svg className="absolute w-20 h-20 rotate-[-90deg]" viewBox="0 0 36 36">
          <path d="M18 2a16 16 0 1 1-0.0001 32A16 16 0 0 1 18 2" fill="none"
            stroke="#00BFA6" strokeWidth="4" strokeDasharray="25 100"
            strokeLinecap="round" />
        </svg>
        <div className="absolute -bottom-1 -right-1 bg-yellow-300 border-2 border-white p-1 rounded-md shadow">
          <Image src="/assets/camera.svg" alt="Camera" width={20} height={20} />
        </div>
      </div>
    </div>
  );
}
