// src/context/PriceContext.tsx
"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type PriceContextType = {
  price: number | null;
  setPrice: (price: number) => void;
  experienceId: number | null;
  setExperienceId: (id: number) => void;
  discount: number; // Add discount to the context type
  setDiscount: (discount: number) => void;
  number_of_people: number; // Add discount to the context type
  setPax: (discount: number) => void;
};

const PriceContext = createContext<PriceContextType | undefined>(undefined);

export const Cart = ({ children }: { children: ReactNode }) => {
  const [price, setPrice] = useState<number | null>(null);
  const [experienceId, setExperienceId] = useState<number | null>(null);
  const [discount, setDiscount] = useState<number>(0); // Default discount is 0
  const [number_of_people, setPax] = useState<number>(1); // Default discount is 0

  return (
    <PriceContext.Provider value={{ price, setPrice, experienceId, setExperienceId, discount, setDiscount, number_of_people, setPax }}>
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