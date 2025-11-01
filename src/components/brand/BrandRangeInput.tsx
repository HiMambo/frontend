"use client";

import React, { useMemo } from "react";
import { BrandInputForm } from "./BrandInputForm";
import { BrandDropdownMenu } from "./BrandDropdownMenu";

interface BrandRangeInputProps {
  formLabel?: string;
  formLabelClassName?: string;
  width?: string;
  className?: string;
  value: {
    min: string | number;
    max: string | number;
    unit: string;
  };
  onChange: (value: { min: string; max: string; unit: string }) => void;
  items: string[];
  error?: string;
}

export const BrandRangeInput: React.FC<BrandRangeInputProps> = ({
  formLabel,
  formLabelClassName = "body-s text-tertiary",
  width = "w-full",
  className = "",
  value,
  onChange,
  items,
  error,
}) => {
  // Convert to strings for consistency
  const minStr = value.min.toString();
  const maxStr = value.max.toString();

  const handleNumberChange = (key: "min" | "max", input: string) => {
    // Allow empty string
    if (input === "") {
      onChange({ 
        min: key === "min" ? "" : minStr,
        max: key === "max" ? "" : maxStr,
        unit: value.unit 
      });
      return;
    }

    // Allow valid numeric input including decimals
    // Matches: 5, 5., 5.5, .5, etc.
    const numericRegex = /^\d*\.?\d*$/;
    if (numericRegex.test(input)) {
      onChange({ 
        min: key === "min" ? input : minStr,
        max: key === "max" ? input : maxStr,
        unit: value.unit 
      });
    }
  };

  // Compute net earnings safely
  const netEarnings = useMemo(() => {
    const min = parseFloat(minStr);
    const max = parseFloat(maxStr);
    
    if (isNaN(min) || isNaN(max) || min === 0 && max === 0) {
      return null;
    }

    const netMin = (min * 0.8).toFixed(2);
    const netMax = (max * 0.8).toFixed(2);
    return `${netMin} – ${netMax}`;
  }, [minStr, maxStr]);

  return (
    <div className={`flex flex-col gap-[var(--spacing-300)] ${width} ${className}`}>
      {formLabel && <label className={formLabelClassName}>{formLabel}</label>}
      
      <div className="flex flex-row items-center gap-[var(--spacing-300)] w-full">
        <BrandInputForm
          width="flex-1"
          formLabel=""
          value={minStr}
          onChange={(val) => handleNumberChange("min", val)}
          placeholder="Min"
        />
        <span className="body-s text-tertiary">-</span>
        <BrandInputForm
          width="flex-1"
          formLabel=""
          value={maxStr}
          onChange={(val) => handleNumberChange("max", val)}
          placeholder="Max"
        />
        <BrandDropdownMenu
          formLabel=""
          items={items}
          value={value.unit}
          onChange={(val) => onChange({ min: minStr, max: maxStr, unit: val as string })}
          width="flex-1"
          placeholder="Currency"
        />
      </div>

      {/* Error message from parent validation */}
      {error ? (
        <span className="body-s text-destructive">{error}</span>
      ) : (
        <span className="body-s text-tertiary">
          {netEarnings && value.unit
            ? `You earn ${netEarnings} ${value.unit} after HiMambo's 20% fee`
            : ""}
        </span>
      )}
    </div>
  );
};