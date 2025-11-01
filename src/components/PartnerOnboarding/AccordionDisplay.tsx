"use client";

import { ChevronDown, ChevronUp } from "lucide-react";

export function AccordionDisplay({
  title,
  open,
  onToggle,
  children,
  className = "",
}: {
  title: string;
  open: boolean;
  onToggle: () => void;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`${className}`}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="w-full flex flex-row items-center justify-between cursor-pointer"
      >
        <span className="body-xxl-label text-primary">{title}</span>
        {open ? (
          <ChevronUp className="icon-size-l text-disabled" />
        ) : (
          <ChevronDown className="icon-size-l text-disabled" />
        )}
      </button>

      {open && <div className="mt-400">{children}</div>}
    </div>
  );
}
