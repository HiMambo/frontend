"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

const LOCAL_STORAGE_KEY = "cartState";
const CART_EXPIRY_MS = 24 * 60 * 60 * 1000; // 1 day in ms

const CRYPTO_DISCOUNT = 10 //Discount applied if payment_method="crypto"

interface Experience {
  id: number;
  name: string;
  experience_description: string;
  experience_price: string;
  experience_promo_image: string;
  experience_city: string;
  experience_country: string;
  rating_avg: number;
  sustainability_goal: string[];
  travelDate?: string;
  departure?: string;
  travellers?: number;
  duration?: string;
  refundable?: string;
}

type PriceContextType = {
  price: number | null;
  setPrice: (price: number) => void;
  experienceId: number | null;
  setExperienceId: (id: number) => void;
  experience: Experience | null;
  setExperience: (experience: Experience) => void;
  discount: number;
  setDiscount: (discount: number) => void;
  number_of_people: number;
  setPax: (number_of_people: number) => void;
  booking_date: Date;
  setBookingDate: (booking_date: Date) => void;
  payment_type: "crypto" | "credit";
  setPaymentType: (payment_type: "crypto" | "credit") => void;
  clearCart: () => void;
  isHydrated: boolean;
  CRYPTO_DISCOUNT: number;
};

const PriceContext = createContext<PriceContextType | undefined>(undefined);

export const Cart = ({ children }: { children: ReactNode }) => {
  const [price, setPrice] = useState<number | null>(null);
  const [experienceId, setExperienceId] = useState<number | null>(null);
  const [experience, setExperience] = useState<Experience | null>(null);
  const [discount, setDiscount] = useState<number>(CRYPTO_DISCOUNT);
  const [number_of_people, setPax] = useState<number>(1);
  const [booking_date, setBookingDate] = useState<Date>(new Date());
  const [payment_type, setPaymentType] = useState<"crypto" | "credit">("crypto");

  // True when cart state loading from localStorage is complete
  const [isHydrated, setIsHydrated] = useState(false);

  const clearCart = () => {
    setPrice(null);
    setExperienceId(null);
    setExperience(null);
    setPax(1);
    setBookingDate(new Date());
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  };

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        const now = Date.now();
        if (now - parsed.savedAt < CART_EXPIRY_MS) {
          setPrice(parsed.price);
          setExperienceId(parsed.experienceId);
          setExperience(parsed.experience);
          setPax(parsed.number_of_people);
          setBookingDate(new Date(parsed.booking_date));
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
      price,
      experienceId,
      experience,
      number_of_people,
      booking_date,
      savedAt: Date.now(),
    };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cartState));
  }, [
    price,
    experienceId,
    experience,
    number_of_people,
    booking_date,
    isHydrated
  ]);

  return (
    <PriceContext.Provider
      value={{
        price,
        setPrice,
        experienceId,
        setExperienceId,
        experience,
        setExperience,
        discount,
        setDiscount,
        number_of_people,
        setPax,
        booking_date,
        setBookingDate,
        payment_type,
        setPaymentType,
        clearCart,
        isHydrated,
        CRYPTO_DISCOUNT
      }}
    >
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
