"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">hiMAMBO!</h1>
      <nav className="space-x-4">
        <Link href="/" className="text-gray-700">
          Home
        </Link>
        <Link href="/search" className="text-gray-700">
          Search
        </Link>
        <Link href="/payment" className="text-gray-700">
          Payment
        </Link>
      </nav>
    </header>
  );
}
