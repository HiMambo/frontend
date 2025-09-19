'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import BookingSummary from "@/components/PaymentPage/BookingSummary";
import BookingFlow from "@/components/PaymentPage/BookingFlow";
import { useBooking } from '@/context/BookingContext';
import { useSearch } from '@/context/SearchContext';
import { BookingStepsProvider } from "@/context/BookingStepsContext";

export default function PaymentPage() {
  const { data: session } = useSession();
  const { setGuests, cartExperience, priceBreakdown, isHydrated } = useBooking();
  const { searchParams } = useSearch();

  useEffect(() => {
    console.log("PaymentPage mounted", { session });
  }, [session]);

  useEffect(() => {
    if (!isHydrated) return;
    console.log("Context values updated - experience.Id:", cartExperience?.id, "price:", priceBreakdown?.finalPrice);
  }, [cartExperience?.id, priceBreakdown?.finalPrice, isHydrated]);

  useEffect(() => {
    setGuests(searchParams.travellers);
  }, [searchParams.travellers, setGuests]);

  return (
    <>
      <Header />
      <BookingStepsProvider>
        <main className="grid md:grid-cols-5 gap-6 p-6 bg-surface">
          <div className="md:col-span-3">
            <BookingFlow />
          </div>
          <div className="md:col-span-2">
            <BookingSummary />
          </div>
        </main>
      </BookingStepsProvider>
      <Footer />
    </>
  );
}