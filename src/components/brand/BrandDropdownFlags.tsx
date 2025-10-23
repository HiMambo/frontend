"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp, Check } from "lucide-react";
import { getCountryFlag } from "@/lib/countries";
import Image from "next/image";

interface BrandDropdownFlagsProps {
  formLabel: string;
  items: string[]; // country names
  formLabelClassName?: string;
  width?: string;
  className?: string;
  value: string | string[];
  onChange: (value: string | string[]) => void;
  multiSelect?: boolean;
}

export const BrandDropdownFlags: React.FC<BrandDropdownFlagsProps> = ({
  formLabel,
  items,
  formLabelClassName = "body-s text-disabled",
  width = "w-full",
  className = "",
  value,
  onChange,
  multiSelect = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (item: string) => {
    if (multiSelect) {
      const currentValues = Array.isArray(value) ? value : [];
      const updated = currentValues.includes(item)
        ? currentValues.filter((v) => v !== item)
        : [...currentValues, item];
      onChange(updated);
    } else {
      onChange(item);
      setIsOpen(false);
    }
  };

  const isSelected = (item: string) =>
    multiSelect ? Array.isArray(value) && value.includes(item) : value === item;

  const displayValue = multiSelect
    ? Array.isArray(value) && value.length > 0
      ? value.join(", ")
      : ""
    : (value as string);

  const renderFlag = (countryName?: string) => {
    const flagSrc = getCountryFlag(countryName);
    if (!flagSrc) return null;
    return (
      <div className="icon-size-s relative shrink-0 mr-[var(--spacing-250)]">
        <Image src={flagSrc} alt={`${countryName} flag`} fill className="object-cover" />
      </div>
    );
  };

  return (
    <div
      ref={dropdownRef}
      className={`flex flex-col gap-[var(--spacing-300)] relative ${width} ${className}`}
    >
      {/* Label */}
      <label className={formLabelClassName}>{formLabel}</label>

      {/* Dropdown input */}
      <div
        className="relative cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div
          className={`
            w-full bg-white body-s text-tertiary 
            h-[var(--height-input)] px-600 py-400
            rounded-300 flex items-center justify-between 
            focus:outline-none
          `}
        >
          <div className="flex items-center truncate">
            {multiSelect && Array.isArray(value)
            ? value.map((v) => (
                <React.Fragment key={v}>
                    {renderFlag(v)}
                </React.Fragment>
                ))
            : renderFlag(value as string)}
            <span className={`truncate ${displayValue ? "text-tertiary" : "text-disabled"}`}>
              {displayValue || "Select..."}
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
          <div className="absolute z-10 mt-200 w-full bg-white rounded-300 px-400 overflow-y-auto max-h-[300px]">
            {items.map((item, index) => {
              const selected = isSelected(item);
              const isLast = index === items.length - 1;
              return (
                <div
                  key={item}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelect(item);
                  }}
                  className={`
                    flex justify-between items-center body-s
                    py-[var(--spacing-300)] cursor-pointer transition-colors hover:bg-[var(--neutral-50)]
                    ${selected ? "text-primary" : "text-tertiary"}
                    ${!isLast ? "border-b border-[var(--neutral-200)]" : ""}
                  `}
                >
                  <div className="flex items-center">
                    {renderFlag(item)}
                    <span>{item}</span>
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
