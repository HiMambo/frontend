"use client";

import { useEffect, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";

interface BrandSymbolInputProps {
  symbols: Array<{ id: string; icon: LucideIcon }>;
  value: { symbolId: string; input: string };
  onChange: (value: { symbolId: string; input: string }) => void;
  className?: string;
  placeholder?: string;
  width?: string;
}

export const BrandSymbolInput: React.FC<BrandSymbolInputProps> = ({
  symbols,
  value,
  onChange,
  className = "",
  placeholder = "",
  width = "w-full",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  /* ───────── handle outside click ───────── */
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ───────── helpers ───────── */
  const handleSymbolSelect = (symbolId: string) => {
    onChange({ ...value, symbolId });
    setIsOpen(false);
  };

  const handleInputChange = (input: string) => {
    onChange({ ...value, input });
  };

  const selectedSymbol = symbols.find((s) => s.id === value.symbolId);
  const SelectedIcon = selectedSymbol?.icon; 

  return (
    <div className={`flex gap-300 ${width} ${className}`}>
      {/* Symbol Dropdown */}
      <div ref={dropdownRef} className="relative">
        <div
          className="bg-white h-[var(--height-input)] w-auto px-400 rounded-300 flex items-center justify-center cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          {SelectedIcon ? (
            <SelectedIcon className="icon-size-s text-tertiary" />
          ) : (
            <div className="icon-size-s text-disabled" />
          )}
        </div>

        {/* Dropdown Grid */}
        {isOpen && (
          <div className="absolute z-10 mt-200 bg-white rounded-300 shadow-elevation-1 w-max">
            <div className="grid grid-cols-4">
              {symbols.map((symbol) => {
                const isSelected = symbol.id === value.symbolId;
                const Icon = symbol.icon;
                return (
                  <div
                    key={symbol.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSymbolSelect(symbol.id);
                    }}
                    className={`
                      icon-size-l rounded-300 cursor-pointer transition-colors
                      hover:bg-[var(--neutral-50)] flex items-center justify-center
                      ${isSelected ? "text-primary bg-[var(--neutral-50)]/70" : "text-tertiary"}
                    `}
                  >
                    <Icon className="icon-size-s" />
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Input Field */}
      <div className="flex-1">
        <input
          type="text"
          value={value.input}
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-white body-m text-tertiary h-[var(--height-input)] px-600 py-400 rounded-300 focus:outline-none"
        />
      </div>
    </div>
  );
};
