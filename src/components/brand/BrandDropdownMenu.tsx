"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp, Check } from "lucide-react";

interface BrandDropdownMenuProps {
  formLabel?: string;
  items: string[];
  formLabelClassName?: string;
  width?: string;
  className?: string;
  placeholder?: string;
  value: string | string[];
  onChange: (value: string | string[]) => void;
  multiSelect?: boolean;
}

export const BrandDropdownMenu: React.FC<BrandDropdownMenuProps> = ({
  formLabel,
  items,
  formLabelClassName = "body-s text-tertiary",
  width = "w-full",
  className = "",
  placeholder = "",
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

  return (
    <div
      ref={dropdownRef}
      className={`flex flex-col gap-[var(--spacing-300)] relative ${width} ${className}`}
    >
      {/* Label */}
      {formLabel && <label className={formLabelClassName}>{formLabel}</label>}

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
          <span
            className={`truncate ${
              displayValue ? "text-tertiary" : "text-disabled"
            }`}
          >
            {displayValue || placeholder}
          </span>

          {isOpen ? (
            <ChevronUp className="icon-size-s text-disabled" />
          ) : (
            <ChevronDown className="icon-size-s text-disabled" />
          )}
        </div>

        {/* Dropdown menu */}
        {isOpen && (
          <div
            className="
              absolute z-10 mt-200 w-full bg-white 
              rounded-300 px-400 overflow-hidden shadow-elevation-1
            "
          >
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
                    ${
                      selected
                        ? "text-primary"
                        : "text-tertiary"
                    }
                    ${!isLast ? "border-b border-[var(--neutral-200)]" : ""}
                  `}
                >
                  <span>{item}</span>
                  {selected && <Check className="icon-size-s text-primary" />}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
