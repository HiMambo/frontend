"use client"

import { useBooking } from "@/context/BookingContext";
import { Bell } from "lucide-react";

export default function NotificationBadge() {
  const { cartExperience } = useBooking();
  
  return (
    <div className="hidden lg:flex items-center shadow-[inset_0_0_0_3px_var(--text-disabled)] hover:shadow-[inset_0_0_0_3px_var(--teal-500)] rounded-200 relative transition-shadow">
      <Bell className="icon-size-m text-disabled m-[var(--spacing-200)]" />
      {cartExperience &&
        <span className="absolute top-[-20%] right-[-20%] flex items-center justify-center icon-size-s bg-[var(--teal-500)] body-xxs text-inverted rounded-full">
          1
        </span>
      }
    </div>
  );
}