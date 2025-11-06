"use client";

import React from "react";
import { Timer } from "lucide-react";
import { BrandInputForm } from "./BrandInputForm";
import { BrandDropdownMenu } from "./BrandDropdownMenu";

interface BrandDurationInputProps {
  formLabel?: string;
  formLabelClassName?: string;
  width?: string;
  className?: string;
  value: {
    number: string | number;
    units: string;
  };
  onChange: (value: { number: string; units: string }) => void;
  items: string[];
  errorNumber?: string;
  errorUnits?: string;
}

export const BrandDurationInput: React.FC<BrandDurationInputProps> = ({
  formLabel,
  formLabelClassName = "body-s text-tertiary",
  width = "w-full",
  className = "",
  value,
  onChange,
  items,
  errorNumber,
  errorUnits,
}) => {
  const numberStr = value.number.toString();

  const handleNumberChange = (input: string) => {
    // Allow empty string
    if (input === "") {
      onChange({ number: "", units: value.units });
      return;
    }

    // Allow valid numeric input (with optional decimals)
    const numericRegex = /^\d*\.?\d*$/;
    if (numericRegex.test(input)) {
      onChange({ number: input, units: value.units });
    }
  };

  return (
    <div className={`flex flex-col gap-[var(--spacing-300)] ${width} ${className}`}>
      {/* Optional label */}
      {formLabel && <label className={formLabelClassName}>{formLabel}</label>}

      {/* Input + Dropdown row */}
      <div className="flex flex-row gap-[var(--spacing-600)] w-full">
        <BrandInputForm
          width="flex-1"
          formLabel=""
          icon={Timer}
          value={numberStr}
          onChange={(val) => handleNumberChange(val)}
          error={errorNumber}
          showErrorMessage={false}
        />

        <BrandDropdownMenu
          width="flex-1"
          value={value.units}
          onChange={(val) => onChange({ number: numberStr, units: val as string })}
          placeholder="Time Frame"
          items={items}
          error={errorUnits}
          showErrorMessage={false}
        />
      </div>

      {/* Error message */}
      <div className="flex flex-col gap-100">
        {errorNumber && <p className="body-s text-destructive">{errorNumber}</p>}
        {errorUnits && <p className="body-s text-destructive">{errorUnits}</p>}
      </div>
    </div>
  );
};
