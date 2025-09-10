"use client";

import { SessionProvider } from "next-auth/react";
import { BookingProvider } from "@/context/BookingContext";
import { SearchProvider } from "@/context/SearchContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <SearchProvider>
        <BookingProvider>
          {children}
        </BookingProvider>
      </SearchProvider>
    </SessionProvider>
  );
}
