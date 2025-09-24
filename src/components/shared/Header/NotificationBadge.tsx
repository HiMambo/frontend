"use client"

import { ShoppingCart } from "../IconComponents";
import { useBooking } from "@/context/BookingContext";
import Link from "next/link";

export default function NotificationBadge() {
  const { cartExperience } = useBooking();
  
  return (
    <Link href={cartExperience ? "/payment" : "#"} >
        <div className="hidden lg:flex items-center border-3 border-[var(--text-disabled)] hover:border-[var(--teal-500)] rounded-200 relative">
            <ShoppingCart className="icon-m text-disabled m-[var(--spacing-100)]" />
            {cartExperience &&
            <span className="absolute top-[-0.75rem] right-[-0.75rem] flex items-center justify-center icon-s bg-[var(--teal-500)] body-xxs text-inverted rounded-full">
                1
            </span>
            }
        </div>
    </Link>
  );
}