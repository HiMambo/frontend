"use client";

import { createContext, useContext, useState, useMemo, useCallback, ReactNode } from "react";
import { useSearch } from "@/context/SearchContext";
import type { Experience, ExperienceSlot } from "@/lib/api";
import { usePersistentState } from "@/hooks/usePeristentState";

// Types
export type Guest = { firstName: string; lastName: string; };

interface BookingState {
  guests: number;
  guestDetails: Guest[];
  selectedSlot: ExperienceSlot | null;
  isBookingInProgress: boolean;
  confirmationCode?: string;
  bookingError?: string;
}

interface PriceBreakdown {
  basePrice: number;
  basePriceDiscount: number;
  discountedBasePrice: number;
  totalBeforeCryptoDiscount: number;
  cryptoDiscount: number;
  finalPrice: number;
}

type BookingContextType = {
  // Booking state
  bookingState: BookingState;
  setGuests: (guests: number) => void;
  updateGuestDetails: (guests: Guest[]) => void;
  setSelectedSlot: (slot: ExperienceSlot | null) => void;

  // Cart state
  cartExperience: Experience | null;
  setCartExperience: (exp: Experience) => void;
  clearCart: () => void;
  isHydrated: boolean;
  priceBreakdown: PriceBreakdown | null;
  basePriceDiscount: number;
  setBasePriceDiscount: (discount: number) => void;
  payment_type: "crypto" | "credit";
  setPaymentType: (paymentType: "crypto" | "credit") => void;
  CRYPTO_DISCOUNT: number;
};

const BookingContext = createContext<BookingContextType | undefined>(undefined);

// Constants
const LOCAL_STORAGE_KEY = "cartState";
const CART_EXPIRY_MS = 24 * 60 * 60 * 1000; // 1 day in ms
const CRYPTO_DISCOUNT = 10;

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const { searchParams } = useSearch();

  // --- Booking State ---
  const initializeGuestDetails = (count: number, existingGuests: Guest[] = []): Guest[] => {
    return Array.from({ length: count }, (_, i) => ({
      firstName: existingGuests[i]?.firstName || "",
      lastName: existingGuests[i]?.lastName || "",
    }));
  };

  const [bookingState, setBookingState] = useState<BookingState>({
    guests: searchParams.travellers,
    guestDetails: initializeGuestDetails(searchParams.travellers),
    selectedSlot: null,
    isBookingInProgress: false,
  });

  const updateGuestDetails = useCallback((guestDetails: Guest[]) => {
    setBookingState(prev => ({ ...prev, guestDetails }));
  }, []);

  const setGuests = useCallback((newGuestCount: number) => {
    setBookingState(prev => ({
      ...prev,
      guests: newGuestCount,
      guestDetails: initializeGuestDetails(newGuestCount, prev.guestDetails),
    }));
  }, []);

  const setSelectedSlot = useCallback((slot: ExperienceSlot | null) => {
    setBookingState(prev => ({ ...prev, selectedSlot: slot }));
  }, []);

  // --- Cart State (Persisted) ---
  const [cartExperience, setCartExperience, isHydrated] = usePersistentState<Experience | null>(
    LOCAL_STORAGE_KEY,
    null,
    CART_EXPIRY_MS
  );

  // --- Central Price State ---
  const [basePriceDiscount, setBasePriceDiscount] = useState<number>(0);
  const [payment_type, setPaymentType] = useState<"crypto" | "credit">("crypto");

  const priceBreakdown = useMemo<PriceBreakdown | null>(() => {
    if (!isHydrated || !cartExperience) return null;

    const basePrice = parseFloat(cartExperience.experience_price);
    if (isNaN(basePrice) || basePrice <= 0) return null;

    const guests = bookingState.guests;
    
    // Apply base price discount first
    const basePriceDiscountMultiplier = (100 - basePriceDiscount) / 100;
    const discountedBasePrice = basePrice * basePriceDiscountMultiplier;
    
    // Calculate total before crypto discount
    const totalBeforeCryptoDiscount = discountedBasePrice * guests;
    
    // Apply crypto discount
    const cryptoDiscount = payment_type === "crypto" ? CRYPTO_DISCOUNT : 0;
    const cryptoDiscountMultiplier = (100 - cryptoDiscount) / 100;
    const finalPrice = totalBeforeCryptoDiscount * cryptoDiscountMultiplier;

    const roundToTwoDecimals = (num: number) => Math.round(num * 100) / 100;

    return {
      basePrice: roundToTwoDecimals(basePrice),
      basePriceDiscount,
      discountedBasePrice: roundToTwoDecimals(discountedBasePrice),
      totalBeforeCryptoDiscount: roundToTwoDecimals(totalBeforeCryptoDiscount),
      cryptoDiscount,
      finalPrice: roundToTwoDecimals(finalPrice),
    };
  }, [cartExperience, basePriceDiscount, payment_type, bookingState.guests, isHydrated]);

  const clearCart = useCallback(() => {
    setCartExperience(null);
    setBasePriceDiscount(0);
    setSelectedSlot(null);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  }, [
    setCartExperience,
    setBasePriceDiscount,
    setSelectedSlot
  ]);

  const value = useMemo(() => ({
    // Booking state
    bookingState,
    setGuests,
    updateGuestDetails,
    setSelectedSlot,

    // Cart state
    cartExperience,
    setCartExperience,
    clearCart,
    isHydrated,

    // Price state
    priceBreakdown,
    basePriceDiscount,
    setBasePriceDiscount,
    payment_type,
    setPaymentType,
    CRYPTO_DISCOUNT,
  }), [
    bookingState,
    setGuests,
    updateGuestDetails,
    setSelectedSlot,
    cartExperience,
    setCartExperience,
    clearCart,
    isHydrated,
    priceBreakdown,
    basePriceDiscount,
    setBasePriceDiscount,
    payment_type,
    setPaymentType,
  ]);

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) throw new Error("useBooking must be used within a BookingProvider");
  return context;
};
