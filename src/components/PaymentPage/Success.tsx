"use client"

import { useBooking } from "@/context/BookingContext";
import { useSession } from "next-auth/react";
import { SiSolana, SiVisa } from "react-icons/si";

export function Success() {
  const { cartExperience, priceBreakdown, payment_type } = useBooking();
  const { data: session } = useSession();

  if (!cartExperience) return;
  if (!priceBreakdown) return;
  return (
        <div className="flex justify-center w-full">
          <div className="w-[var(--width-authscreen)]">
            <div className="flex flex-col bg-surface gap-[var(--spacing-600)] px-[var(--spacing-600)] py-[var(--spacing-400)] items-center w-full">
              {/* Header */}
              <h2 className="heading-h5-light text-secondary text-center border-b-2 border-[var(--text-disabled)] py-[var(--spacing-600)] w-full">
                Thank you for trusting us
              </h2>

              {/* Confirmation content */}
              <span className='flex w-full body-m text-primary text-left'>
                Order Details
              </span>
              <div className="flex flex-col w-full">
                {/* Two-column layout */}
                <div className="flex flex-row justify-between w-full">
                  {/* Left column */}
                  <div className="flex flex-col gap-[var(--spacing-800)] flex-1">
                    {/* Name */}
                    <div>
                      <p className="body-s text-[var(--text-disabled)] mb-[var(--spacing-100)]">Name</p>
                      <p className="body-s text-tertiary py-[var(--spacing-200)]">{session?.user?.name||"Alex Turner"}</p>
                    </div>

                    {/* Billing Address */}
                    <div>
                      <p className="body-s text-[var(--text-disabled)] mb-[var(--spacing-100)]">Billing Address</p>
                      <p className="body-s text-tertiary py-[var(--spacing-200)]">
                        {session?.user?.name||"Alex Turner"}<br />
                        151 O’Connor Street<br />
                        Ottawa, ON, K2P 2L8<br />
                        Canada
                      </p>
                    </div>
                  </div>

                  {/* Right column */}
                  <div className="flex flex-col gap-[var(--spacing-600)] flex-1">
                    {/* Contact Information */}
                    <div>
                      <p className="body-s text-[var(--text-disabled)] mb-[var(--spacing-100)]">Contact Information</p>
                      <p className="body-s text-tertiary py-[var(--spacing-200)]">{session?.user?.email||"alex_turner@mail.com"}</p>
                    </div>

                    {/* Order Details */}
                    <div>
                      <p className="body-s text-[var(--text-disabled)] mb-[var(--spacing-100)]">Order</p>
                      <p className="body-s text-tertiary py-[var(--spacing-200)]">
                        {cartExperience?.name}<br />
                        Total: € {priceBreakdown?.finalPrice.toFixed(2)}<br />
                        Including €{(priceBreakdown.finalPrice * 0.0224).toFixed(2)} in taxes
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method & learn more */}
              <div className="flex w-full justify-between items-center pl-[var(--spacing-250)] pr-[var(--spacing-800)] py-[var(--spacing-600)]">
                <div className="flex items-center gap-[var(--spacing-400)]">
                  <p className="body-m text-primary">Order completed with</p>
                  {payment_type === "crypto" ? <SiSolana className="icon-size-l text-[#172B85]"/> : <SiVisa className="icon-size-l text-[#172B85]"/> }
                </div>
                <a
                  href="#"
                  className="body-s text-primary hover:underline hover:text-[var(--terracotta-600)]"
                >
                  Learn more
                </a>
              </div>
            </div>
          </div>
        </div>
  );
};