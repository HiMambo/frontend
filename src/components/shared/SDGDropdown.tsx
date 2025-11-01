"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp, Check } from "lucide-react";
import { SDG_LABELS } from "../ExperienceCard/SDGIcons";

interface SDGDropdownProps {
  formLabel?: string;
  formLabelClassName?: string;
  width?: string;
  className?: string;
  value: string[]; // multiple SDGs allowed
  onChange: (value: string[]) => void;
}

export const SDGDropdown: React.FC<SDGDropdownProps> = ({
  formLabel,
  formLabelClassName = "body-s text-tertiary",
  width = "w-full",
  className = "",
  value,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (sdgValue: string) => {
    const updated = value.includes(sdgValue)
      ? value.filter((v) => v !== sdgValue)
      : [...value, sdgValue];
    onChange(updated);
  };

  const isSelected = (sdgValue: string) => value.includes(sdgValue);

  const displayValue =
    value.length > 0
      ? value
          .map((v) => SDG_LABELS.find((sdg) => sdg.value === v)?.label.split(":")[0])
          .join(", ")
      : "";

  return (
    <div
      ref={dropdownRef}
      className={`flex flex-col gap-[var(--spacing-300)] relative ${width} ${className}`}
    >
      {/* Label */}
      {formLabel && <label className={formLabelClassName}>{formLabel}</label>}

      {/* Dropdown input */}
      <div className="relative cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <div
          className={`
            w-full bg-white body-s text-tertiary 
            h-[var(--height-input)] px-600 py-400
            rounded-300 flex items-center justify-between 
            focus:outline-none
          `}
        >
          <div className="flex items-center gap-250 overflow-hidden">
            <span className={`truncate ${displayValue ? "text-tertiary" : "text-disabled"}`}>
              {displayValue || "Select Sustainable Development Goals"}
            </span>
          </div>

          {isOpen ? (
            <ChevronUp className="icon-size-s text-disabled" />
          ) : (
            <ChevronDown className="icon-size-s text-disabled" />
          )}
        </div>

        {/* Dropdown menu */}
        {isOpen && (
          <div className="absolute z-10 mt-200 w-full bg-white rounded-300 px-400 overflow-y-auto max-h-[300px] shadow-elevation-1">
            {SDG_LABELS.map((sdg, index) => {
              const selected = isSelected(sdg.value);
              const isLast = index === SDG_LABELS.length - 1;
              const imagePath = `/assets/sdg/E-WEB-Goal-${sdg.value.padStart(2, "0")}.png`;

              return (
                <div
                  key={sdg.value}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelect(sdg.value);
                  }}
                  className={`
                    flex justify-between items-center body-s
                    py-[var(--spacing-300)] cursor-pointer transition-colors hover:bg-[var(--neutral-50)]
                    ${selected ? "text-primary" : "text-tertiary"}
                    ${!isLast ? "border-b border-[var(--neutral-200)]" : ""}
                  `}
                >
                  <div className="flex items-center gap-[var(--spacing-250)]">
                    <div className="icon-size-s relative shrink-0">
                      <Image
                        src={imagePath}
                        alt={sdg.label}
                        fill
                        className="object-cover rounded-[2px]"
                      />
                    </div>
                    <span>{sdg.label}</span>
                  </div>
                  {selected && <Check className="icon-size-s text-primary stroke-[1.5]" />}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
