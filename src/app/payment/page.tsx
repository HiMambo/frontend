'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Header from "@/components/shared/Header/Header";
import Footer from "@/components/shared/Footer";
import BookingSummary from "@/components/PaymentPage/BookingSummary";
import BookingFlow from "@/components/PaymentPage/BookingFlow";
import { useBooking } from '@/context/BookingContext';
import { useSearch } from '@/context/SearchContext';
import { StepProvider } from "@/context/StepContext";
import { BOOKING_STEP_DEFINITIONS } from "@/lib/bookingSteps";
import { Button } from '@/components/ui/button';
import { ChevronLeftDuo } from '@/components/shared/IconComponents';
import { FAQ } from '@/components/shared/FAQ';

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
    <StepProvider stepDefinitions={BOOKING_STEP_DEFINITIONS}>
      <main className="flex flex-col gap-[var(--spacing-1600)] py-[var(--spacing-800)] px-[var(--spacing-2400)] bg-surface">
        {/* === Top Section === */}
        <section className="items-center justify-center">
          <Link href="/experiencepage">
              <Button
                variant="outlineYellow"
                size="custom"
                className="px-[var(--spacing-400)] py-[var(--spacing-300)] gap-[var(--spacing-200)]"
              >
                <ChevronLeftDuo className="icon-size-s" />
                Go Back
              </Button>
            </Link>
        </section>

        {/* === Main Section === */}
        <section className="flex justify-between">
          <BookingFlow />
          <BookingSummary />
        </section>

        {/* === FAQ Section === */}
        <FAQ />
      </main>
    </StepProvider>
    <Footer />
  </>
);

}