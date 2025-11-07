"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { OctagonHelp } from "@/components/shared/IconComponents";
import { LucideIcon } from "lucide-react";

export interface NextStepItem {
  icon: LucideIcon;
  label: string;
}

interface NextStepsProps {
  items: NextStepItem[];
}

export function NextSteps({ items }: NextStepsProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-600 p-800 bg-[var(--surface)]/50 rounded-600">
      {/* Label / Header */}
      <div 
        className="flex flex-row pl-800 justify-between items-center cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
      >
        <div className="flex flex-row gap-200 items-center">
          <OctagonHelp className="text-disabled icon-size-m" />
          <span className="text-tertiary body-xl">What happens next?</span>
        </div>

        {open ? (
          <ChevronUp className="text-disabled icon-size-l"/>
        ) : (
          <ChevronDown className="text-disabled icon-size-l"/>
        )}
      </div>

      {/* Dropdown */}
      {open && (
        <div className="flex flex-col p-800 gap-600 rounded-600 bg-[var(--surface)]/50">
          {items.map(({ icon: Icon, label }, i) => (
            <div
              key={i}
              className="flex flex-row gap-200 items-center text-left"
            >
              <Icon className="text-disabled icon-size-s shrink-0" />
              <span className="text-tertiary body-l">{label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
