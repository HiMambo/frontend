"use client";

import React from "react";
import { Minus, Plus } from "lucide-react";

interface BrandNumberInputProps {
  formLabel?: string;
  formLabelClassName?: string;
  width?: string;
  className?: string;
  value: number;
  onChange: (value: number) => void;
  numberOfDigits?: number;
  min?: number;
  max?: number;
}

export const BrandNumberInput: React.FC<BrandNumberInputProps> = ({
  formLabel,
  formLabelClassName = "body-s text-tertiary",
  width = "w-auto",
  className = "",
  value,
  onChange,
  numberOfDigits = 2,
  min,
  max,
}) => {
  const canIncrement = max === undefined || value < max;
  const canDecrement = min === undefined || value > min;

  const handleIncrement = () => {
    if (canIncrement) {
      onChange(value + 1);
    }
  };

  const handleDecrement = () => {
    if (canDecrement) {
      onChange(value - 1);
    }
  };

  return (
    <div className={`flex flex-col gap-300 self-start ${width} ${className}`}>
      {/* Label */}
      {formLabel && <label className={formLabelClassName}>{formLabel}</label>}

      {/* Input Row */}
      <div
        className={`
          px-300 text-primary gap-300 bg-white 
          flex flex-row items-center
          h-[var(--height-input)] rounded-300 
        `}
      >
        {/* Minus button */}
        <button
          type="button"
          onClick={handleDecrement}
          className={`icon-s ${canDecrement ? "cursor-pointer" : "text-disabled cursor-not-allowed"}`}
        >
          <Minus className="icon-size-s" />
        </button>

        {/* Number Display */}
        <div
          className="text-center body-xl tabular-nums px-200"
          style={{ minWidth: `${numberOfDigits}ch` }}
        >
          {value}
        </div>

        {/* Plus button */}
        <button
          type="button"
          onClick={handleIncrement}
          className={`icon-size-s ${canIncrement ? "cursor-pointer" : "text-disabled cursor-not-allowed"}`}
        >
          <Plus className="icon-size-s" />
        </button>
      </div>
    </div>
  );
};
