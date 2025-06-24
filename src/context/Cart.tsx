"use client";

import { createContext, useContext, useState, useEffect, useMemo, useCallback, ReactNode } from "react";
import { DateRange } from "react-day-picker";

const LOCAL_STORAGE_KEY = "cartState";
const CART_EXPIRY_MS = 24 * 60 * 60 * 1000; // 1 day in ms

const CRYPTO_DISCOUNT = 10 //Discount applied if payment_method="crypto"

interface CartExperience {
  //Normal experience interface
  id: number;
  name: string;
  experience_description: string;
  experience_price: string;
  experience_promo_image: string;
  experience_city: string;
  experience_country: string;
  rating_avg: number;
  sustainability_goal: string[];
  //Additional info for booking
  travelDate?: string;
  departure?: string;
  travellers: number;
  duration?: string;
  refundable?: string;
}

interface SearchParams {
  guests: string;
  date: DateRange | undefined;
  experienceType: string;
}

interface PriceBreakdown {
  basePrice: number;
  basePriceDiscount: number;
  discountedBasePrice: number;
  totalBeforeCryptoDiscount: number;
  cryptoDiscount: number;
  finalPrice: number;
}

type PriceContextType = {
  // Existing cart functionality
  cartExperience: CartExperience | null;
  setCartExperience: (cartExperience: CartExperience) => void;
  clearCart: () => void;
  isHydrated: boolean;

  // Search parameters
  searchParams: SearchParams;
  setSearchParams: (params: Partial<SearchParams>) => void;
  setGuests: (guests: string) => void;
  setDate: (date: DateRange | undefined) => void;
  setExperienceType: (type: string) => void;

  // Centralized price calculations
  priceBreakdown: PriceBreakdown | null;
  basePriceDiscount: number;
  setBasePriceDiscount: (basePriceDiscount: number) => void;
  CRYPTO_DISCOUNT: number;

  // Legacy setters and states
  booking_date: Date;
  setBookingDate: (booking_date: Date) => void;
  payment_type: "crypto" | "credit";
  setPaymentType: (payment_type: "crypto" | "credit") => void;
};

const PriceContext = createContext<PriceContextType | undefined>(undefined);

export const Cart = ({ children }: { children: ReactNode }) => {
  // Cart state
  const [cartExperience, setCartExperience] = useState<CartExperience | null>(null);
  const [basePriceDiscount, setBasePriceDiscount] = useState<number>(0);

  // Search parameters state
  const [searchParams, setSearchParamsState] = useState<SearchParams>({
    guests: "1",
    date: undefined,
    experienceType: "Any"
  });

  ///Legacy
  const [booking_date, setBookingDate] = useState<Date>(new Date());
  const [payment_type, setPaymentType] = useState<"crypto" | "credit">("crypto");

  // True when cart state loading from localStorage is complete
  const [isHydrated, setIsHydrated] = useState(false);

  // Centralized price calculation
  const priceBreakdown = useMemo((): PriceBreakdown | null => {
    if (!isHydrated || !cartExperience) return null;

    const basePrice = parseFloat(cartExperience.experience_price);
    if (isNaN(basePrice) || basePrice <= 0) return null;

    const travellers = cartExperience.travellers;
    
    // Apply base price discount first
    const basePriceDiscountMultiplier = (100 - basePriceDiscount) / 100;
    const discountedBasePrice = basePrice * basePriceDiscountMultiplier;
    
    // Calculate total before crypto discount
    const totalBeforeCryptoDiscount = discountedBasePrice * travellers;
    
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
  }, [cartExperience, basePriceDiscount, payment_type, isHydrated]);

  // Search parameter setters
  const setSearchParams = useCallback((params: Partial<SearchParams>) => {
    setSearchParamsState(prev => ({ ...prev, ...params }));
  }, []);

  const setGuests = useCallback((guests: string) => {
    setSearchParamsState(prev => ({ ...prev, guests }));
  }, []);

  const setDate = useCallback((date: DateRange | undefined) => {
    setSearchParamsState(prev => ({ ...prev, date }));
  }, []);

  const setExperienceType = useCallback((experienceType: string) => {
    setSearchParamsState(prev => ({ ...prev, experienceType }));
  }, []);

  const clearCart = useCallback(() => {
    setCartExperience(null);
    setBookingDate(new Date());
    setSearchParamsState({
      guests: "1",
      date: undefined,
      experienceType: "Any"
    });
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  }, []);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        const now = Date.now();
        if (now - parsed.savedAt < CART_EXPIRY_MS) {
          setCartExperience(parsed.cartExperience);
          setBookingDate(new Date(parsed.booking_date));
          setSearchParamsState(parsed.searchParams);
        } else {
          localStorage.removeItem(LOCAL_STORAGE_KEY); // Expired
        }
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error);
        localStorage.removeItem(LOCAL_STORAGE_KEY);
      }
    }
    setIsHydrated(true);
  }, []);

  // Save to localStorage whenever the state changes
  useEffect(() => {
    if (!isHydrated) return;
    const cartState = {
      cartExperience,
      booking_date,
      searchParams,
      savedAt: Date.now(),
    };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cartState));
  }, [
    cartExperience,
    booking_date,
    searchParams,
    isHydrated
  ]);

  const cartContextValue = useMemo(
    () => ({
      // Existing cart functionality
      cartExperience,
      setCartExperience,
      clearCart,
      isHydrated,

      // Search parameters
      searchParams,
      setSearchParams,
      setGuests,
      setDate,
      setExperienceType,

      // Centralized price calculations
      priceBreakdown,
      basePriceDiscount,
      setBasePriceDiscount,
      CRYPTO_DISCOUNT,

      // Legacy functionality
      booking_date,
      setBookingDate,
      payment_type,
      setPaymentType,
    }),
    [
      cartExperience,
      isHydrated,
      clearCart,
      searchParams,
      setSearchParams,
      setGuests,
      setDate,
      setExperienceType,
      priceBreakdown,
      basePriceDiscount,

      booking_date,
      payment_type,
    ]
  );

  return (
    <PriceContext.Provider value={cartContextValue}>
      {children}
    </PriceContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(PriceContext);
  if (!context) {
    throw new Error("useCart must be used within a Cart");
  }
  return context;
};
