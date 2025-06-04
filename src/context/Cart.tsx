// src/context/PriceContext.tsx
"use client";
import { createContext, useContext, useState, ReactNode } from "react";

// Define the type for the experience object
interface Experience {
  id: number;
  name: string;
  experience_description: string;
  experience_price: number;
  experience_promo_image: string;
  experience_city: string;
  experience_country: string;
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
  discount: number; // Add discount to the context type
  setDiscount: (discount: number) => void;
  number_of_people: number;
  setPax: (number_of_people: number) => void;
  booking_date: Date;
  setBookingDate: (booking_date: Date) => void;
  payment_type: ('crypto' | 'credit');
  setPaymentType: (payment_type: 'crypto' | 'credit') => void;
};

const PriceContext = createContext<PriceContextType | undefined>(undefined);

export const Cart = ({ children }: { children: ReactNode }) => {
  const [price, setPrice] = useState<number | null>(null);
  const [experienceId, setExperienceId] = useState<number | null>(null);
  const [experience, setExperience] = useState<Experience | null>(null);
  const [discount, setDiscount] = useState<number>(0); // Default discount is 0
  const [number_of_people, setPax] = useState<number>(1);
  const [booking_date, setBookingDate] = useState<Date>(new Date());
  const [payment_type, setPaymentType] = useState<'crypto' | 'credit'>('crypto');

  return (
    <PriceContext.Provider value={{ 
      price, setPrice,
      experienceId, setExperienceId,
      experience, setExperience,
      discount, setDiscount,
      number_of_people, setPax,
      booking_date, setBookingDate,
      payment_type, setPaymentType
    }}>
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