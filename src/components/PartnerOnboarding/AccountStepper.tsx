"use client";

import clsx from "clsx";
import { Building2, FileCheck2, MapPin, Rocket, UserPlus } from "lucide-react";

const ICONS = [UserPlus, Building2, FileCheck2, MapPin, Rocket];

export default function AccountStepper({
  steps,
  activeIndex = 0,
}: {
  steps: string[];
  activeIndex?: number;
}) {
  return (
    <div className="relative max-w-4xl mx-auto">
      {/* Track */}
      <div className="absolute left-0 right-0 top-[18px] h-1 bg-neutral-200 rounded-full" />
      {/* Filled */}
      <div
        className="absolute left-0 top-[18px] h-1 bg-home-button rounded-full transition-all"
        style={{ width: `${(activeIndex / (steps.length - 1)) * 100}%` }}
      />
      {/* Steps */}
      <div
        className="relative z-10 grid"
        style={{
          gridTemplateColumns: `repeat(${steps.length}, minmax(0,1fr))`,
        }}
      >
        {steps.map((label, i) => {
          const Icon = ICONS[i] ?? UserPlus;
          const isActive = i <= activeIndex;
          return (
            <div key={i} className="flex flex-col items-center">
              <div
                className={clsx(
                  "w-9 h-9 rounded-full border-2 flex items-center justify-center transition-all",
                  isActive
                    ? "bg-home-button border-home-button text-white"
                    : "bg-white border-neutral-300 text-neutral-500"
                )}
              >
                <Icon className="w-4 h-4" />
              </div>
              <span className="mt-150 text-xs text-neutral-700 text-center">
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
